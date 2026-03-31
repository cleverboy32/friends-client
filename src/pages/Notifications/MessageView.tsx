import React, { useEffect, useState, useMemo, useRef } from 'react';
import useChatStore from '@/store/chat';
import useUserStore from '@/store/user';
import Input from '@/components/Input';
import Button from '@/components/button';
import { PaperAirplaneIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import type { ChatUser } from '@/types/chat';

// Time formatting utility
const formatTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

interface MessageViewProps {
    toId: string;
}

const MessageView: React.FC<MessageViewProps> = ({ toId }) => {
    const { chatList, chatMessages, sendMessage, getChatMessage, clearUnread } =
        useChatStore();
    const { userInfo } = useUserStore();

    const [inputValue, setInputValue] = useState('');
    const [toUser, setToUser] = useState<ChatUser | undefined>();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const chatId = useMemo(() => {
        if (!toUser?.id || !userInfo?.id) return '';
        return [userInfo.id, toUser.id].sort((a, b) => a - b).join('-');
    }, [toUser, userInfo]);

    const messages = useMemo(() => {
        return chatId && chatMessages[chatId] ? chatMessages[chatId] : [];
    }, [chatMessages, chatId]);

    useEffect(() => {
        // Find the user we are chatting with from the chat list
        const recipientId = Number(toId);
        if (!recipientId) {
            setToUser(undefined);
            return;
        }
        const chat = chatList.find((c) => c.chatUser.id === recipientId);
        if (chat) {
            setToUser(chat.chatUser);
        } else if (recipientId) {
            // If user is not in the chat list, we might need to fetch their info
            // For now, we'll just set a placeholder.
            // A better solution would be to fetch user info by ID.
            setToUser({ id: recipientId, name: `User ${recipientId}`, avatar: null });
        }
    }, [toId, chatList]);

    useEffect(() => {
        // Fetch initial messages
        if (toUser?.id && userInfo?.id) {
            getChatMessage({
                toId: toUser.id,
                fromId: userInfo.id,
                page: 1,
                pageSize: 50,
            });
        }
    }, [toUser, userInfo, getChatMessage]);

    useEffect(() => {
        // Clear unread messages and scroll to bottom
        if (chatId) {
            clearUnread(chatId);
        }
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatId, messages, clearUnread]);

    const handleSendMessage = () => {
        if (inputValue.trim() && userInfo && toUser?.id) {
            sendMessage({ toId: toUser.id, content: inputValue.trim() }, userInfo);
            setInputValue('');
        }
    };

    const defaultAvatar = 'https://via.placeholder.com/40';

    if (!toId) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center h-full bg-gray-50">
                <div className="text-center text-gray-400">
                    <ChatBubbleOvalLeftEllipsisIcon className="w-24 h-24 mx-auto text-gray-300" />
                    <h2 className="mt-2 text-xl font-medium text-gray-500">选择一个聊天</h2>
                    <p className="mt-1 text-sm text-gray-400">
                        从左侧选择一个现有的对话，或者开始一个新的对话。
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full">
            <header className="flex items-center p-4 border-b border-gray-200">
                <h1 className="!text-lg font-bold ml-4">{toUser?.name || 'Chat'}</h1>
            </header>

            <div className="flex-1 overflow-y-auto p-4">
                {messages.map((message, index) => {
                    const showTime =
                        index === 0 ||
                        new Date(message.createdAt).getTime() -
                            new Date(messages[index - 1].createdAt).getTime() >
                            60000;

                    return (
                        <React.Fragment key={message.id}>
                            {showTime && (
                                <div className="text-center text-gray-500 text-xs my-2">
                                    {formatTime(new Date(message.createdAt))}
                                </div>
                            )}
                            <div
                                className={`flex items-end gap-2 my-2 ${message.fromId === userInfo?.id ? 'justify-end' : 'justify-start'}`}>
                                {message.fromId !== userInfo?.id && (
                                    <img
                                        src={toUser?.avatar || defaultAvatar}
                                        className="w-8 h-8 rounded-full"
                                    />
                                )}
                                <div
                                    className={`px-4 py-2 rounded-xl max-w-xs md:max-w-md break-words ${
                                        message.fromId === userInfo?.id
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {message.content}
                                </div>
                                {message.fromId === userInfo?.id && (
                                    <img
                                        src={userInfo?.avatar || defaultAvatar}
                                        className="w-8 h-8 rounded-full"
                                    />
                                )}
                            </div>
                        </React.Fragment>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 pb-50 border-t border-gray-200 flex items-center gap-2">
                <Input
                    className="flex-1"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="输入消息..."
                />
                <Button
                    onClick={handleSendMessage}
                    className="p-2">
                    <PaperAirplaneIcon className="w-6 h-6" />
                </Button>
            </div>
        </div>
    );
};

export default MessageView;
