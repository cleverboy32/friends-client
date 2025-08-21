import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Map from '../../components/Map';

interface ActivityDetail {
    id: string;
    title: string;
    content: string;
    description: string;
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
    requirements: string[];
    tags: string[];
}

const ActivityDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // 模拟活动详情数据
    const activityDetail: ActivityDetail = {
        id: id || '1',
        title: '林绿环保主题活动',
        content: '绿色环保主题活动，一起为地球贡献力量',
        description:
            '这是一个关于环保的主题活动，我们将组织参与者进行垃圾分类、植树造林、环保宣传等活动。通过实际行动来保护我们的环境，让地球变得更加美好。活动包括：1. 垃圾分类知识讲座 2. 社区清洁行动 3. 植树造林活动 4. 环保宣传推广',
        time: '2024-01-15 14:00',
        location: '朝阳公园',
        publisher: '环保协会',
        reward: '78积分',
        participants: 78,
        maxParticipants: 100,
        category: '环保',
        distance: 1.2,
        coordinates: [116.397428, 39.90923],
        image: 'https://via.placeholder.com/400x250/4ade80/ffffff?text=林绿环保活动',
        requirements: [
            '年龄18岁以上',
            '身体健康',
            '有环保意识',
            '能参与户外活动',
        ],
        tags: ['环保', '户外', '公益', '教育'],
    };

    const handleJoinActivity = () => {
        // 这里可以添加参加活动的逻辑
        console.log('参加活动:', activityDetail.id);
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 头部 */}
            <div className="bg-white shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleBack}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                        <h1 className="text-xl font-bold text-gray-800">
                            活动详情
                        </h1>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-6">
                {/* 活动图片 */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                    <div
                        className="w-full h-64 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${activityDetail.image})`,
                        }}
                    />
                </div>

                {/* 活动基本信息 */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                {activityDetail.title}
                            </h2>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                    {activityDetail.category}
                                </span>
                                <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                                    {activityDetail.reward}
                                </span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">
                                {activityDetail.participants}/
                                {activityDetail.maxParticipants}
                            </div>
                            <div className="text-sm text-gray-500">
                                参与人数
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <div>
                                <div className="text-sm text-gray-500">
                                    活动时间
                                </div>
                                <div className="font-medium">
                                    {activityDetail.time}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                            <div>
                                <div className="text-sm text-gray-500">
                                    活动地点
                                </div>
                                <div className="font-medium">
                                    {activityDetail.location}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            <div>
                                <div className="text-sm text-gray-500">
                                    发布者
                                </div>
                                <div className="font-medium">
                                    {activityDetail.publisher}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                />
                            </svg>
                            <div>
                                <div className="text-sm text-gray-500">
                                    距离
                                </div>
                                <div className="font-medium">
                                    {activityDetail.distance}km
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 活动标签 */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {activityDetail.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* 参加按钮 */}
                    <button
                        onClick={handleJoinActivity}
                        disabled={
                            activityDetail.participants >=
                            activityDetail.maxParticipants
                        }
                        className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                            activityDetail.participants >=
                            activityDetail.maxParticipants
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                    >
                        {activityDetail.participants >=
                        activityDetail.maxParticipants
                            ? '活动已满员'
                            : '立即参加'}
                    </button>
                </div>

                {/* 活动详情 */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        活动详情
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        {activityDetail.description}
                    </p>

                    <h4 className="font-medium text-gray-800 mb-3">参与要求</h4>
                    <ul className="space-y-2 mb-6">
                        {activityDetail.requirements.map(
                            (requirement, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-2 text-gray-700"
                                >
                                    <svg
                                        className="w-4 h-4 text-green-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    {requirement}
                                </li>
                            ),
                        )}
                    </ul>
                </div>

                {/* 地图 */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        活动地点
                    </h3>
                    <Map
                        width="100%"
                        height="300px"
                        center={activityDetail.coordinates}
                        zoom={15}
                        markers={[
                            {
                                id: activityDetail.id,
                                position: activityDetail.coordinates,
                                title: activityDetail.title,
                                content: activityDetail.location,
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default ActivityDetailPage;
