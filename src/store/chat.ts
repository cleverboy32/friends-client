import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getUnreadChatList, getChatMessages } from '@/api/chat';
import type { Chat, Message, ChatUser, ChatMessagePayload } from '@/types/chat';
import type { User } from '@/types/user';
import {
    onReceiveMessage,
    sendMessage as sendWsMessage,
} from '@/utils/websocket';

// --- Zustand Store Definition ---
interface ChatState {
    chatList: Chat[];
    chatMessages: Record<string, Message[]>;
    isLoading: boolean;
    activeChatUser: ChatUser | null;
    connect: () => void;
    addOrUpdateChatUser: (user: ChatUser, currentUserId: number) => void;
    getChatList: (userId: number) => Promise<void>;
    getChatMessage: (params: Omit<ChatMessagePayload, 'chatId'>) => Promise<void>;
    sendMessage: (params: { toId: number, content: string }, fromUser: User) => void;
    clearUnread: (chatId: string) => void;
    deleteChat: (chatUserId: number) => void;
}
const useChatStore = create<ChatState>()(
    persist(
        (set, get) => {
            // Set up the message handler for the WebSocket
            onReceiveMessage((data: string) => {
                const message: Message = JSON.parse(data);
                const { chatId } = message;

                // Add the received message to the state
                set((state) => {
                    const existingMessages = state.chatMessages[chatId] || [];
                    const updatedMessages = [...existingMessages, message];

                    const newChatList = [...state.chatList];
                    const chatIndex = newChatList.findIndex((c) => c.chatId === chatId);

                    if (chatIndex !== -1) {
                        // If chat exists, update unread count and move to top
                        const existingChat = newChatList[chatIndex];
                        existingChat.unRead += 1;
                        newChatList.splice(chatIndex, 1);
                        newChatList.unshift(existingChat);
                    } else {
                        // If new chat, create it and add to top
                        newChatList.unshift({
                            chatUser: message.fromUser!,
                            chatId,
                            unRead: 1,
                        });
                    }

                    return {
                        chatMessages: { ...state.chatMessages, [chatId]: updatedMessages },
                        chatList: newChatList,
                    };
                });
            });

            return {
                chatList: [],
                chatMessages: {},
                isLoading: false,
                activeChatUser: null,
                addOrUpdateChatUser: (user, currentUserId) => {
                    set((state) => {
                        const existingChat = state.chatList.find(
                            (item) => item.chatUser.id === user.id,
                        );
                        if (existingChat) {
                            const otherChats = state.chatList.filter(
                                (item) => item.chatUser.id !== user.id,
                            );
                            return { chatList: [existingChat, ...otherChats], activeChatUser: user };
                        } else {
                            const newChat: Chat = {
                                chatUser: user,
                                chatId: [user.id, currentUserId].sort((a, b) => a - b).join('-'),
                                unRead: 0,
                            };
                            return { chatList: [newChat, ...state.chatList], activeChatUser: user };
                        }
                    });
                },

                getChatList: async (userId) => {
                    set({ isLoading: true });
                    try {
                        const response = await getUnreadChatList(userId);
                        const unreadChats = response.list;
                        set((state) => {
                            const oldList = state.chatList.filter(
                                (item) => item.chatId && item.chatUser?.id,
                            );
                            const oldChatsNotInUnread = oldList.filter(
                                (oldChat) =>
                                    !unreadChats.some((chat) => chat.chatId === oldChat.chatId),
                            );
                            return { chatList: [...unreadChats, ...oldChatsNotInUnread] };
                        });
                    } catch (error) {
                        console.error('Failed to fetch chat list:', error);
                    } finally {
                        set({ isLoading: false });
                    }
                },

                getChatMessage: async (params) => {
                    const chatId = [params.fromId, params.toId].sort((a, b) => a - b).join('-');
                    set({ isLoading: true });
                    try {
                        const response = await getChatMessages({ ...params, chatId });
                        set((state) => {
                            const existingMessages = state.chatMessages[chatId] || [];
                            const existingMessageIds = new Set(
                                existingMessages.map((msg) => msg.id),
                            );
                            const uniqueNewMessages = response.chat.filter(
                                (msg) => !existingMessageIds.has(msg.id),
                            );
                            const updatedMessages = [
                                ...uniqueNewMessages.reverse(),
                                ...existingMessages,
                            ];

                            return {
                                chatMessages: { ...state.chatMessages, [chatId]: updatedMessages },
                            };
                        });
                    } catch (error) {
                        console.error('Failed to fetch chat messages:', error);
                    } finally {
                        set({ isLoading: false });
                    }
                },

                sendMessage: (params, fromUser) => {
                    const { toId, content } = params;
                    const chatId = [fromUser.id, toId].sort((a, b) => a - b).join('-');

                    const tempId = Date.now();
                    const message: Message = {
                        id: tempId,
                        chatId,
                        fromId: fromUser.id,
                        toId,
                        content,
                        createdAt: new Date().toISOString(),
                        fromUser: { id: fromUser.id, name: fromUser.name, avatar: fromUser.avatar },
                        toUser: get().chatList.find((c) => c.chatUser.id === toId)?.chatUser,
                    };

                    // Optimistic update
                    set((state) => {
                        const existingMessages = state.chatMessages[chatId] || [];
                        const updatedMessages = [...existingMessages, message];
                        return {
                            chatMessages: { ...state.chatMessages, [chatId]: updatedMessages },
                        };
                    });

                    // Send via WebSocket
                    sendWsMessage(JSON.stringify({ toId, content }));
                },

                clearUnread: (chatId: string) => {
                    set((state) => ({
                        chatList: state.chatList.map((chat) =>
                            chat.chatId === chatId ? { ...chat, unRead: 0 } : chat,
                        ),
                    }));
                },

                deleteChat: (chatUserId: number) => {
                    set((state) => {
                        const chatToDelete = state.chatList.find(
                            (chat) => chat.chatUser.id === chatUserId,
                        );
                        if (!chatToDelete) return state;

                        const newChatList = state.chatList.filter(
                            (chat) => chat.chatUser.id !== chatUserId,
                        );
                        const newChatMessages = { ...state.chatMessages };
                        delete newChatMessages[chatToDelete.chatId];

                        return {
                            chatList: newChatList,
                            chatMessages: newChatMessages,
                        };
                    });
                },
            };
        },
        {
            name: 'chat-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ chatList: state.chatList }),
        },
    ),
);

export default useChatStore;
