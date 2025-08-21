import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Map from '../../components/Map';
import DZSelect from '@/components/Select';
import { useOptions } from '@/hooks/useOptions';
import {
    MagnifyingGlassIcon,
    ChevronRightIcon,
    ClockIcon,
    MapPinIcon,
    UserIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';

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

const DiscoverPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchAddress, setSearchAddress] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('全部');
    const [selectedTime, setSelectedTime] = useState('全部');
    const [selectedDistance, setSelectedDistance] = useState('全部');
    const [selectedPeople, setSelectedPeople] = useState('全部');
    const [activities, setActivities] = useState<Activity[]>([]);
    const [filteredActivities, setFilteredActivities] = useState<Activity[]>(
        [],
    );

    // 模拟活动数据
    useEffect(() => {
        const mockActivities: Activity[] = [
            {
                id: '1',
                title: '林绿',
                content: '绿色环保主题活动，一起为地球贡献力量',
                time: '2024-01-15 14:00',
                location: '朝阳公园',
                publisher: '环保协会',
                reward: '78积分',
                participants: 78,
                maxParticipants: 100,
                category: '环保',
                distance: 1.2,
                coordinates: [116.397428, 39.90923],
                image: 'https://via.placeholder.com/120x80/4ade80/ffffff?text=林绿',
            },
            {
                id: '2',
                title: '活动语',
                content: '语言交流活动，提升口语表达能力',
                time: '2024-01-16 19:00',
                location: '三里屯',
                publisher: '语言俱乐部',
                reward: '100积分',
                participants: 45,
                maxParticipants: 50,
                category: '教育',
                distance: 2.5,
                coordinates: [116.407428, 39.91923],
                image: 'https://via.placeholder.com/120x80/000000/ffffff?text=活动语',
            },
            {
                id: '3',
                title: '城市人居活动',
                content: '探索城市生活，发现美好人居',
                time: '2024-01-17 10:00',
                location: '798艺术区',
                publisher: '城市探索者',
                reward: '120积分',
                participants: 120,
                maxParticipants: 150,
                category: '文化',
                distance: 3.8,
                coordinates: [116.387428, 39.89923],
                image: 'https://via.placeholder.com/120x80/4ade80/ffffff?text=人居',
            },
            {
                id: '4',
                title: '发角,入',
                content: '创意手工制作，发挥想象力',
                time: '2024-01-18 15:00',
                location: '南锣鼓巷',
                publisher: '手工达人',
                reward: '90积分',
                participants: 30,
                maxParticipants: 40,
                category: '手工',
                distance: 1.8,
                coordinates: [116.417428, 39.92923],
                image: 'https://via.placeholder.com/120x80/eab308/ffffff?text=发角',
            },
            {
                id: '5',
                title: '入库人多',
                content: '仓储管理体验，了解物流流程',
                time: '2024-01-19 09:00',
                location: '顺义物流园',
                publisher: '物流公司',
                reward: '150积分',
                participants: 200,
                maxParticipants: 300,
                category: '体验',
                distance: 15.2,
                coordinates: [116.377428, 39.88923],
                image: 'https://via.placeholder.com/120x80/eab308/ffffff?text=入库',
            },
        ];
        setActivities(mockActivities);
        setFilteredActivities(mockActivities);
    }, []);

    // 筛选活动
    useEffect(() => {
        let filtered = activities;

        if (selectedCategory !== '全部') {
            filtered = filtered.filter(
                (activity) => activity.category === selectedCategory,
            );
        }

        if (selectedTime !== '全部') {
            // 这里可以根据时间筛选逻辑进行调整
            filtered = filtered.filter((activity) => {
                const activityDate = new Date(activity.time);
                const now = new Date();
                const diffDays = Math.ceil(
                    (activityDate.getTime() - now.getTime()) /
                        (1000 * 60 * 60 * 24),
                );

                switch (selectedTime) {
                    case '今天':
                        return diffDays === 0;
                    case '明天':
                        return diffDays === 1;
                    case '本周':
                        return diffDays >= 0 && diffDays <= 7;
                    case '本月':
                        return diffDays >= 0 && diffDays <= 30;
                    default:
                        return true;
                }
            });
        }

        if (selectedDistance !== '全部') {
            const distanceMap: { [key: string]: number } = {
                '1km内': 1,
                '3km内': 3,
                '5km内': 5,
                '10km内': 10,
            };
            const maxDistance = distanceMap[selectedDistance];
            if (maxDistance) {
                filtered = filtered.filter(
                    (activity) => activity.distance <= maxDistance,
                );
            }
        }

        if (selectedPeople !== '全部') {
            const peopleMap: { [key: string]: number } = {
                '10人以下': 10,
                '10-50人': 50,
                '50-100人': 100,
                '100人以上': Infinity,
            };
            const maxPeople = peopleMap[selectedPeople];
            if (maxPeople) {
                if (selectedPeople === '100人以上') {
                    filtered = filtered.filter(
                        (activity) => activity.maxParticipants > 100,
                    );
                } else {
                    filtered = filtered.filter(
                        (activity) => activity.maxParticipants <= maxPeople,
                    );
                }
            }
        }

        setFilteredActivities(filtered);
    }, [
        activities,
        selectedCategory,
        selectedTime,
        selectedDistance,
        selectedPeople,
    ]);

    const handleActivityClick = (activityId: string) => {
        // 导航到活动详情页
        navigate(`/discover/activity/${activityId}`);
    };

    const handleMarkerClick = (marker: any) => {
        // 点击地图标记点时的处理
        console.log('点击地图标记:', marker);
    };

    // 将活动数据转换为地图标记点
    const mapMarkers = activities.map((activity) => ({
        id: activity.id,
        position: activity.coordinates,
        title: activity.title,
        content: `${activity.location} - ${activity.time}`,
    }));

    const { categoryOptions, timeOptions, distanceOptions, peopleOptions } =
        useOptions();

    return (
        <div className="bg-gray-50 p-10">
            <div className="flex mb-6 relative">
                <Map
                    width="100%"
                    height="600px"
                    center={[116.397428, 39.90923]}
                    zoom={12}
                    markers={mapMarkers}
                    onMarkerClick={handleMarkerClick}
                />
                <div className="absolute top-10 left-10">
                    <input
                        type="text"
                        placeholder="请输入地点"
                        value={searchAddress}
                        onChange={(e) => setSearchAddress(e.target.value)}
                        className="w-[400px] px-4 py-2 pr-12 bg-white rounded-lg"
                    />
                    <MagnifyingGlassIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
            </div>

            <div className="flex flex-wrap gap-10 mb-4 bg-gray-50 mt-10">
                <DZSelect
                    label="类别"
                    value={selectedCategory}
                    options={categoryOptions}
                    onChange={setSelectedCategory}
                />
                <DZSelect
                    label="时间"
                    value={selectedTime}
                    options={timeOptions}
                    onChange={setSelectedTime}
                />
                <DZSelect
                    label="距离"
                    value={selectedDistance}
                    options={distanceOptions}
                    onChange={setSelectedDistance}
                />
                <DZSelect
                    label="人数"
                    value={selectedPeople}
                    options={peopleOptions}
                    onChange={setSelectedPeople}
                />
            </div>

            {/* 活动列表区域 */}
            <div className="mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">
                        相关任务列表
                    </h2>
                    <button className="text-sm text-gray-600 hover:text-black flex items-center gap-1">
                        查看更多
                        <ChevronRightIcon className="w-4 h-4" />
                    </button>
                </div>

                {/* 活动卡片网格 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {filteredActivities.map((activity) => (
                        <div
                            key={activity.id}
                            onClick={() => handleActivityClick(activity.id)}
                            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
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
                                            {activity.participants}/
                                            {activity.maxParticipants}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredActivities.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-lg">
                            暂无符合条件的活动
                        </div>
                        <div className="text-gray-300 text-sm mt-2">
                            请尝试调整筛选条件
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiscoverPage;
