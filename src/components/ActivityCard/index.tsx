import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import useChatStore from '@/store/chat';
import useUserStore from '@/store/user';

interface Activity {
    id: string;
    title: string;
    content: string;
    time: string;
    location:
        | string
        | {
              address?: string;
              city?: string;
              longitude?: number;
              latitude?: number;
          };
    publisher: string;
    image: string;
    avatar?: string;
    category?: string;
    publisherId?: number;
}

interface ActivityCardProps {
    activity: Activity;
    onClick?: (activityId: string) => void;
    className?: string;
    currentUserId?: number;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
    activity,
    onClick,
    className = '',
    currentUserId,
}) => {
    const navigate = useNavigate();
    const { addOrUpdateChatUser } = useChatStore();
    const { userInfo } = useUserStore();

    const handleClick = () => {
        if (onClick) {
            onClick(activity.id);
        }
    };

    const handleChatClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (activity.publisherId && userInfo) {
            addOrUpdateChatUser(
                {
                    id: activity.publisherId,
                    name: activity.publisher,
                    avatar: activity.avatar || '',
                },
                userInfo.id,
            );
            navigate(`/notifications`);
        } else if (!userInfo) {
            navigate('/login');
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`relative break-inside-avoid cursor-pointer box-border overflow-hidden rounded-lg border border-[#e0e7d4]/60 ${className}`}>
            {/* Image or Fallback Placeholder */}
            {activity.image ? (
                <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-auto object-cover" // h-auto allows variable height
                />
            ) : (
                <div
                    className="flex items-center justify-center p-4"
                    style={{ minHeight: '120px' }}>
                    <div className="text-center">
                        <h3 className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#FF4D4F,#FAAD14,#52C41A,#13C2C2,#1677FF,#722ED1,#EB2F96)] font-bold text-lg">
                            {activity.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                            {activity.content}
                        </p>
                    </div>
                </div>
            )}

            {/* Content Info */}
            <div className="p-3 bg-white">
                <h3 className="font-semibold text-gray-800 mb-0.5 line-clamp-1">
                    {activity.title}
                </h3>
                <p className="text-xs text-gray-500 mb-2 truncate">
                    {typeof activity.location === 'string'
                        ? activity.location
                        : activity.location?.address || activity.location?.city || '未知地点'}
                </p>

                {/* Bottom Bar: Publisher & Actions */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {activity.avatar ? (
                            <img
                                src={activity.avatar}
                                alt={activity.publisher}
                                className="w-6 h-6 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] text-gray-500">
                                {activity.publisher.charAt(0)}
                            </div>
                        )}
                        <span className="text-sm font-medium text-gray-700 truncate max-w-[120px]">
                            {activity.publisher}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        {currentUserId !== activity.publisherId && (
                            <button
                                onClick={handleChatClick}
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                                <ChatBubbleLeftRightIcon className="w-5 h-5 text-gray-500" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityCard;
export { default as ActivityCardSkeleton } from './ActivityCardSkeleton';
export type { Activity, ActivityCardProps };
