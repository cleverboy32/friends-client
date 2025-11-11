import React from 'react';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import { ClockIcon, MapPinIcon } from '@heroicons/react/24/solid';

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
    avatar?: string;
    jionPeople?: number;
}

interface ActivityCardProps {
    activity: Activity;
    onClick?: (activityId: string) => void;
    className?: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onClick, className = '' }) => {
    const handleClick = () => {
        if (onClick) {
            onClick(activity.id);
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`relative cursor-pointer w-[250px] overflow-hidden ${className}`}>
            <div
                className={`relative bg-white rounded-lg border border-light-bg-theme/60 ${
                    activity.image ? 'bg-center bg-no-repeat bg-cover' : ''
                }`}
                style={activity.image ? { backgroundImage: `url(${activity.image})` } : undefined}>
                <div className=" flex items-center justify-center min-h-[200px] ">
                    {!activity.image && (
                        <div className="text-[18px] ">
                            <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#FF4D4F,#FAAD14,#52C41A,#13C2C2,#1677FF,#722ED1,#EB2F96)]">
                                {activity.title}
                            </span>
                            <p className="text-sm text-gray-500 mt-[10px]">{activity.content}</p>
                        </div>
                    )}
                </div>

                <div className="space-y-2 text-sm text-gray-200 p-[12px] bg-black/15">
                    <div className="bg-primary text-white text-xs px-2 py-1 rounded-full font-medium inline-block">
                        {activity.reward}
                    </div>
                    <div className="flex items-center gap-2">
                        <ClockIcon className="w-[20px] h-[20px] text-primary" />
                        <span>{activity.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPinIcon className="w-[20px] h-[20px] text-primary" />
                        <span>{activity.location}</span>
                    </div>
                </div>
            </div>

            <div className="p-[12px] ">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-1">{activity.title}</h3>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img
                            src={activity.avatar}
                            alt={activity.publisher}
                            className="w-[24px] h-[24px] rounded-full object-cover"
                        />
                        <span className="text-sm font-medium text-gray-700">
                            {activity.publisher}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-500">
                        <UserGroupIcon className="w-[18px] h-[18px] " />
                        <span className="text-sm font-medium ">{activity.jionPeople ?? 0}</span>
                    </div>
                </div>
                {/* <p className="text-sm text-gray-600 mb-3 line-clamp-2">{activity.content}</p> */}
            </div>
        </div>
    );
};

export default ActivityCard;
export type { Activity, ActivityCardProps };
