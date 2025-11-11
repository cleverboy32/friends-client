import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Map, { MAP_STYLES } from '../../components/Map';
import NavigationTabBar from '@/components/Tag';
import Input from '@/components/Input';
import ActivityCard, { type Activity } from '@/components/ActivityCard';
import { useOptions } from '@/hooks/useOptions';
import { getActivityList } from '@/api/activity';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import type { ActivityQueryParams } from '@/types/activity';
import type { AutoComplete } from '@/types/map';
import Navbar from '@/components/navbar';

const DiscoverPage: React.FC = () => {
    const navigate = useNavigate();
    const address = useRef<AutoComplete.Poi>(null);
    const [filter, setFilter] = useState<ActivityQueryParams>({
        type: 'OFFLINE',
        distance: '1000',
        timeRange: '7',
    });
    const page = useRef(1);

    const [activities, setActivities] = useState<Activity[]>([]);

    const [loading, setLoading] = useState(false);
    const loadingRef = useRef(false);

    // 使用 useCallback 优化 filter 变化处理函数
    const handleFilterChange = useCallback(
        (key: keyof ActivityQueryParams, value: string | number) => {
            setFilter((prev) => ({ ...prev, [key]: value }));
            page.current = 1; // 重置页码
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

            // 转换API数据格式为ActivityCard组件期望的格式
            const convertedActivities: Activity[] = response.items.map((item: any) => ({
                id: item.id.toString(),
                title: item.title,
                content: item.content,
                time: new Date(item.createdAt).toLocaleString('zh-CN'),
                location: item.location?.address || '未知地点',
                publisher: '发布者', // API中没有author信息，暂时使用默认值
                reward: `${Math.floor(Math.random() * 200) + 50}积分`, // 暂时随机生成积分
                participants: Math.floor(Math.random() * 50), // 暂时随机生成参与人数
                maxParticipants: Math.floor(Math.random() * 100) + 50, // 暂时随机生成最大参与人数
                category: item.tags?.[0] || '其他',
                distance: Math.random() * 20, // 暂时随机生成距离
                coordinates: item.location
                    ? [item.location.longitude, item.location.latitude]
                    : [116.397428, 39.90923],
                image:
                    item.image?.[0] ||
                    `https://via.placeholder.com/120x80/4ade80/ffffff?text=${item.title.charAt(0)}`,
            }));

            if (page.current === 1) {
                setActivities(convertedActivities);
            } else {
                setActivities(prev => [...prev, ...convertedActivities]);
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

    // 获取活动数据
    useEffect(() => {
        fetchActivities();
    }, [filter]);

    const handleActivityClick = useCallback(
        (activityId: string) => {
            navigate(`/discover/activity/${activityId}`);
        },
        [navigate],
    );

    const handleMarkerClick = useCallback((marker: any) => {
        console.log('点击地图标记:', marker);
    }, []);

    const handleSelectLocation = useCallback((location: AutoComplete.Poi) => {
        address.current = location;
        console.log('location', location);
        page.current = 1;
        fetchActivities();
    }, []);

    // 将活动数据转换为地图标记点，使用 useMemo 避免不必要的重新计算
    const mapMarkers = useMemo(
        () =>
            activities.map((activity) => ({
                id: activity.id,
                position: activity.coordinates,
                title: activity.title,
                content: `${activity.location} - ${activity.time}`,
            })),
        [activities],
    );

    const mapProps = useMemo(
        () => ({
            width: '100%',
            height: '300px',
            center: [116.397428, 39.90923],
            zoom: 12,
            controlBar: false,
            toolBar: false,
            mapConfig: {
                viewMode: '2D' as const,
                pitchEnable: false,
                rotateEnable: false,
            },
            mapStyle: {
                mapStyle: MAP_STYLES.LIGHT,
            },
            autoCompleteOptions: {
                city: '北京',
                input: 'discover-address-input',
            },
        }),
        [],
    );

    console.log('render');

    // 使用 useMemo 缓存 useOptions 的返回值，避免每次渲染都创建新对象
    const options = useMemo(() => useOptions(), []);

    const { categoryOptions, timeOptions, distanceOptions } = options;

    return (
        <div className="flex">
            <Navbar />

            <div className="bg-gray-50 flex-1">
                <div className="flex mb-[32px] relative">
                    <Map
                        {...mapProps}
                        markers={mapMarkers}
                        onMarkerClick={handleMarkerClick}
                        onSelectLocation={handleSelectLocation}
                    />
                    <div className="absolute top-2 left-2">
                        <Input
                            type="text"
                            id="discover-address-input"
                            placeholder="请输入地点"
                            className="!w-[300px]   bg-white rounded-lg"
                        />
                        <MagnifyingGlassIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                </div>

                <div className="bg-gray-50 px-4">
                    {/* 统一的筛选标签栏 */}
                    <NavigationTabBar
                        tabs={[
                            ...categoryOptions.map(option => ({
                                id: `type-${option.value}`,
                                label: option.label,
                                category: 'type' as const,
                                value: option.value as string
                            })),
                            ...distanceOptions.map(option => ({
                                id: `distance-${option.value}`,
                                label: option.label,
                                category: 'distance' as const,
                                value: option.value.toString()
                            })),
                            ...timeOptions.map(option => ({
                                id: `time-${option.value}`,
                                label: option.label,
                                category: 'timeRange' as const,
                                value: option.value.toString()
                            }))
                        ]}
                        defaultActiveTab={(() => {
                            if (filter.type !== 'OFFLINE') return `type-${filter.type}`;
                            if (filter.distance !== '1000') return `distance-${filter.distance}`;
                            if (filter.timeRange !== '7') return `time-${filter.timeRange}`;
                            return `type-${filter.type}`;
                        })()}
                        onTabChange={(tabId) => {
                            const [category, value] = tabId.split('-');
                            if (category === 'type') {
                                handleFilterChange('type', value as 'ONLINE' | 'OFFLINE');
                            } else if (category === 'distance') {
                                handleFilterChange('distance', value);
                            } else if (category === 'time') {
                                handleFilterChange('timeRange', value);
                            }
                        }}
                        showBottomBorder={false}
                        className="bg-transparent"
                    />
                </div>

                {/* 活动列表区域 */}
                <div className="mx-auto pr-[40px] mt-[40px]">
                    <div className="flex justify-between items-center mb-[12px]">
                        <h2 className="text-xl font-bold text-gray-800">相关活动</h2>
                    </div>

                    {/* 活动卡片网格 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {activities.map((activity) => (
                            <ActivityCard
                                key={activity.id}
                                activity={activity}
                                onClick={handleActivityClick}
                            />
                        ))}
                    </div>

                    {activities.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-lg">暂无相关的活动</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default React.memo(DiscoverPage);
