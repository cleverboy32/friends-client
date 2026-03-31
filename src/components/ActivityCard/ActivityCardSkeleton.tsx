import React from 'react';

const ActivityCardSkeleton: React.FC = () => {
    return (
        <div className="relative break-inside-avoid box-border overflow-hidden rounded-lg border border-gray-200/60 animate-pulse">
            {/* Image Placeholder */}
            <div className="w-full h-48 bg-gray-200"></div>

            {/* Content Info Placeholder */}
            <div className="p-3 bg-white">
                {/* Title Placeholder */}
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>

                {/* Location Placeholder */}
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>

                {/* Bottom Bar: Publisher & Actions Placeholder */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {/* Avatar Placeholder */}
                        <div className="w-6 h-6 rounded-full bg-gray-200"></div>

                        {/* Publisher Name Placeholder */}
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </div>

                    {/* Action Icon Placeholder */}
                    <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default ActivityCardSkeleton;
