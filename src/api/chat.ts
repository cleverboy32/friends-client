import { post } from '@/utils/request';
import type { Chat, Message, ChatMessagePayload } from '@/types/chat';

/**
 * Fetches the list of chats with unread messages for the current user.
 */
export const getUnreadChatList = (userId: number) => {
    return post<{
        list: Chat[];
        total: number;
    }>('/chat/unread', { userId: String(userId) });
};

/**
 * Fetches the message history for a specific chat.
 */
export const getChatMessages = (payload: ChatMessagePayload) => {
    return post<{
        chat: Message[];
        total: number;
    }>('/chat/messages', payload);
};
