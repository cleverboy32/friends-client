import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ActivityCard, { ActivityCardSkeleton, type Activity } from '@/components/ActivityCard';
import { getActivityList } from '@/api/activity';
import type { ActivityQueryParams } from '@/types/activity';
import type { AutoComplete } from '@/types/map';
import Navbar from '@/components/navbar';
import useUserStore from '@/store/user';
import Input from '@/components/Input';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const DiscoverPage: React.FC = () => {
    const navigate = useNavigate();
    const { userInfo } = useUserStore();
    const address = useRef<AutoComplete.Poi>(null);
    const [filter, setFilter] = useState<ActivityQueryParams>({});
    const page = useRef(1);

    const [activities, setActivities] = useState<Activity[]>([]);

    const [_loading, setLoading] = useState(false);
    const loadingRef = useRef(false);

    // Use useCallback to optimize filter change handler
    const handleFilterChange = useCallback(
        (key: keyof ActivityQueryParams, value: string | number | boolean | undefined) => {
            setFilter((prev) => {
                const newFilters = { ...prev };

                // If a keyword is cleared, remove it from the filter
                if (key === 'keyword' && !value) {
                    delete newFilters.keyword;
                } else {
                    // Toggle behavior for type filters, set for others
                    const newValue = prev[key] === value ? undefined : value;
                    newFilters[key] = newValue;
                }

                // If a filter is deselected (value becomes undefined), remove the key
                for (const filterKey in newFilters) {
                    if (newFilters[filterKey] === undefined) {
                        delete newFilters[filterKey];
                    }
                }

                return newFilters;
            });
            page.current = 1; // Reset page number on filter change
        },
        [],
    );

    const fetchActivities = useCallback(async () => {
        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);
        try {
            const response = await getActivityList({
                page: page.current,
                pageSize: 20,
                ...filter,
                lng: address.current?.location?.lng,
                lat: address.current?.location?.lat,
            });

            const convertedActivities: Activity[] = response.items.map((item) => ({
                id: item.id.toString(),
                title: item.title,
                content: item.content,
                time: new Date(item.createdAt).toLocaleString('zh-CN'),
                location: item.location || { address: '未知地点' },
                publisher: item.author?.name || '未知用户',
                publisherId: item.author?.id,
                avatar: item.author?.avatar || undefined,
                category: item.tags?.[0]?.tag?.name || '其他',
                image: item.image?.[0],
            }));

            if (page.current === 1) {
                setActivities(convertedActivities);
            } else {
                setActivities((prev) => [...prev, ...convertedActivities]);
            }
            page.current = response.page + 1;
        } catch (error) {
            console.error('获取活动列表失败:', error);
            if (page.current === 1) {
                setActivities([]);
            }
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    }, [filter, page]);

    useEffect(() => {
        console.log('Effect triggered with filter:', filter);
        fetchActivities();
    }, [filter]);

    const handleActivityClick = useCallback(
        (activityId: string) => {
            navigate(`/activity/${activityId}`);
        },
        [navigate],
    );

    return (
        <div className="flex h-screen">
            <Navbar />

            <div className="flex-1 flex bg-gray-50 overflow-hidden">
                {/* Main content - Activity List */}
                <div className="flex-1 p-8 overflow-y-auto">
                    {/* Activity Card Grid */}
                    {_loading ? (
                        <div className="columns-2 md:columns-3 lg:columns-4 gap-6">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <ActivityCardSkeleton key={index} />
                            ))}
                        </div>
                    ) : activities.length > 0 ? (
                        <div className="columns-2 md:columns-3 lg:columns-4 gap-6">
                            {activities.map((activity) => (
                                <ActivityCard
                                    className="mb-6 break-inside-avoid"
                                    key={activity.id}
                                    activity={activity}
                                    currentUserId={userInfo?.id}
                                    onClick={handleActivityClick}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-400 text-lg">暂无相关的活动</p>
                        </div>
                    )}
                </div>

                {/* Right Sidebar - Filters */}
                <div className="w-80 bg-white p-6 border-l border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">筛选</h3>

                    {/* Search Input */}
                    <div className="mb-6 flex w-100% items-center gap-2">
                        <Input
                            className="pr-10 !w-68"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleFilterChange('keyword', e.currentTarget.value);
                                }
                            }}
                        />
                        <MagnifyingGlassIcon className=" absolute right-10 w-5 h-5 text-gray-400" />
                    </div>

                    {/* Type Filters */}
                    <div className="flex flex-col gap-2">
                        <button
                            className={`w-full px-4 py-2 text-sm text-left font-medium rounded-lg transition-colors ${
                                filter.type === 'OFFLINE'
                                    ? 'bg-primary text-white shadow-lg'
                                    : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                            onClick={() => handleFilterChange('type', 'OFFLINE')}>
                            线下
                        </button>
                        <button
                            className={`w-full px-4 py-2 text-sm text-left font-medium rounded-lg transition-colors ${
                                filter.type === 'ONLINE'
                                    ? 'bg-primary text-white shadow-lg'
                                    : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                            onClick={() => handleFilterChange('type', 'ONLINE')}>
                            线上
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(DiscoverPage);
