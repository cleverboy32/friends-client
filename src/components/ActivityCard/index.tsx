import React from 'react';
import { ClockIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/outline';

interface Activity {
    id: string;
    title: string;
    content: string;
    time: string;
    location: string;
    publisher: string;
    reward: string;
    participants: number;
    maxParticipants: number;
    category: string;
    distance: number;
    coordinates: [number, number];
    image: string;
}

interface ActivityCardProps {
    activity: Activity;
    onClick?: (activityId: string) => void;
    className?: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
    activity,
    onClick,
    className = '',
}) => {
    const handleClick = () => {
        if (onClick) {
            onClick(activity.id);
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden ${className}`}
        >
            {/* 活动图片 */}
            <div
                className="relative h-12 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${activity.image})`,
                }}
            >
                <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                    {activity.reward}
                </div>
            </div>

            {/* 活动信息 */}
            <div className="p-4">
                {/* 用户信息 - 移到顶部 */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        <img
                            src={`https://via.placeholder.com/32x32/4ade80/ffffff?text=${activity.publisher.charAt(0)}`}
                            alt={activity.publisher}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                        {activity.publisher}
                    </span>
                </div>

                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-1">
                    {activity.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {activity.content}
                </p>

                {/* 活动详情 */}
                <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <ClockIcon className="w-4 h-4" />
                        <span>{activity.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{activity.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <UserIcon className="w-4 h-4 text-gray-500" />
                        <div className=" text-xs px-2 py-1 rounded-full ">
                            {activity.participants}/{activity.maxParticipants}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityCard;
export type { Activity, ActivityCardProps };
