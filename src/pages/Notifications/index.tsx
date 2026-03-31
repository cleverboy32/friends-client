import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useChatStore from '@/store/chat';
import useUserStore from '@/store/user';
import Navbar from '@/components/navbar';
import MessageView from './MessageView';

const LAST_SELECTED_CHAT_KEY = 'lastSelectedChatId';

const NotificationsPage: React.FC = () => {
    const navigate = useNavigate();
    const { chatList, getChatList, activeChatUser } = useChatStore();
    const { userInfo } = useUserStore();
    const [selectedToId, setSelectedToId] = useState<string | null>(null);

    useEffect(() => {
        if (userInfo?.id) {
            getChatList(userInfo.id);
        }
    }, [userInfo, getChatList]);

    useEffect(() => {
        if (activeChatUser) {
            const activeId = activeChatUser.id.toString();
            setSelectedToId(activeId);
            localStorage.setItem(LAST_SELECTED_CHAT_KEY, activeId);
        } else if (chatList.length > 0) {
            const savedChatId = localStorage.getItem(LAST_SELECTED_CHAT_KEY);
            const chatExists =
                savedChatId && chatList.some((c) => c.chatUser.id.toString() === savedChatId);

            if (chatExists) {
                setSelectedToId(savedChatId);
            } else {
                const firstChatId = chatList[0].chatUser.id.toString();
                setSelectedToId(firstChatId);
                localStorage.setItem(LAST_SELECTED_CHAT_KEY, firstChatId);
            }
        }
    }, [chatList, activeChatUser]);

    const handleChatClick = (toId: number) => {
        const toIdStr = toId.toString();
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
            navigate(`/message/${toId}`);
        } else {
            setSelectedToId(toIdStr);
            localStorage.setItem(LAST_SELECTED_CHAT_KEY, toIdStr);
        }
    };

    return (
        <div className="flex h-screen bg-white">
            <Navbar />
            <div className="flex-1 flex">
                {/* Left Panel: Chat List */}
                <div
                    className={`w-full md:w-1/3 lg:w-1/4 flex flex-col border-r border-gray-200 ${selectedToId !== null && window.innerWidth < 768 ? 'hidden' : 'flex'}`}>
                    <div className="flex-1 overflow-y-auto">
                        {chatList.length > 0 ? (
                            <ul>
                                {chatList.map(({ chatUser, unRead }) => (
                                    <li
                                        key={chatUser.id}
                                        className={`flex items-center p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${selectedToId === chatUser.id.toString() ? 'bg-light-bg-theme/40 border-r-4 border-blue-500' : ''}`}
                                        onClick={() => handleChatClick(chatUser.id)}>
                                        <img
                                            src={
                                                chatUser.avatar || 'https://via.placeholder.com/50'
                                            }
                                            alt={chatUser.name}
                                            className="w-12 h-12 rounded-full mr-4"
                                        />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center">
                                                <p className="font-semibold text-gray-800">
                                                    {chatUser.name}
                                                </p>
                                            </div>
                                            <div className="flex justify-between items-center mt-1">
                                                <p className="text-sm text-gray-500 truncate">
                                                    {/* Last message preview will go here */}
                                                </p>
                                                {unRead > 0 && (
                                                    <span className="bg-theme text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                        {unRead}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center text-gray-500 p-8">暂时还没有消息</div>
                        )}
                    </div>
                </div>

                {/* Right Panel: Message View */}
                <div
                    className={`flex-1 flex-col ${selectedToId === null ? 'hidden md:flex' : 'flex'}`}>
                    <MessageView
                        toId={selectedToId}
                        isComponent={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default NotificationsPage;
