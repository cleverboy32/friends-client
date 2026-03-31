import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getActivityDetail } from '@/api/activity';
import type { Activity } from '@/types/activity';
import Navbar from '@/components/navbar';
import {

    MapPinIcon,
    ClockIcon,
    UsersIcon,
    ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

import useChatStore from '@/store/chat';
import useUserStore from '@/store/user';

const ActivityDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [activity, setActivity] = useState<Activity | null>(null);
    const [loading, setLoading] = useState(true);
    const { addOrUpdateChatUser } = useChatStore();
    const { userInfo } = useUserStore();

    useEffect(() => {
        if (!id) {
            console.error('Activity ID is missing');
            navigate('/discover');
            return;
        }
        fetchActivityDetail(id);
    }, [id, navigate]);

    const handleGoToChat = () => {
        if (activity?.author && userInfo) {
            addOrUpdateChatUser(
                {
                    id: activity.author.id,
                    name: activity.author.name,
                    avatar: activity.author.avatar,
                },
                userInfo.id,
            );
            navigate(`/notifications`);
        }
    };

    const fetchActivityDetail = async (activityId: string) => {
        try {
            setLoading(true);
            const data = await getActivityDetail(activityId);
            setActivity(data);
        } catch (error) {
            console.error('Failed to fetch activity details:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    if (!activity) {
        return <div className="flex items-center justify-center h-screen">Activity not found.</div>;
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <Navbar />
            <div className="flex-1 overflow-y-auto">
                <div className="p-4 md:p-8 max-w-6xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                            {/* Left Column: Image Area */}
                            <div className="md:w-1/2 p-4 flex justify-center items-center">
                                {activity.image && activity.image.length > 0 ? (
                                    <img
                                        src={activity.image[0]}
                                        alt={activity.title}
                                        className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center w-full h-full rounded-lg border min-h-[150px] p-4 bg-gray-50">
                                        <div className="text-center">
                                            <h2 className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#FF4D4F,#FAAD14,#52C41A,#13C2C2,#1677FF,#722ED1,#EB2F96)] font-bold text-xl">
                                                {activity.title}
                                            </h2>
                                            <p className="text-md text-gray-500 mt-2 line-clamp-3">
                                                {activity.content}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Right Column: Content Area */}
                            <div className="md:w-1/2 p-4 md:p-6 flex flex-col justify-center">
                                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                    {activity.title}
                                </h2>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap mb-4">
                                    {activity.content}
                                </p>

                                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={
                                                activity.author?.avatar ||
                                                'https://via.placeholder.com/40'
                                            }
                                            alt={activity.author?.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="font-medium text-gray-800">
                                                {activity.author?.name || '未知用户'}
                                            </p>
                                        </div>
                                    </div>
                                    {userInfo?.id !== activity.author?.id && (
                                        <button
                                            onClick={handleGoToChat}
                                            className="p-2 rounded-full hover:bg-gray-100">
                                            <ChatBubbleLeftRightIcon className="w-6 h-6 text-gray-500" />
                                        </button>
                                    )}{' '}
                                </div>

                                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                                    {activity.location && (
                                        <div className="flex items-start gap-3 mb-2">
                                            <MapPinIcon className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="text-xs text-gray-500">活动地点</p>
                                                <p className="text-sm text-gray-800">
                                                    {activity.location.address ||
                                                        activity.location.city}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex items-start gap-3 mb-2">
                                        <ClockIcon className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-xs text-gray-500">发布时间</p>
                                            <p className="text-sm text-gray-800">
                                                {new Date(activity.createdAt).toLocaleString(
                                                    'zh-CN',
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    {activity.needPartner && (
                                        <div className="flex items-start gap-3">
                                            <UsersIcon className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="text-xs text-gray-500">需要伙伴</p>
                                                <p className="text-sm text-gray-800">是</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {activity.tags && activity.tags.length > 0 && (
                                    <div className="mb-4">
                                        <h4 className="text-xs text-gray-500 mb-2">标签</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {activity.tags.map((tagObj, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-700">
                                                    {tagObj.tag.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityDetailPage;
