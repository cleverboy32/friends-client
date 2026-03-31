import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getActivityList } from '@/api/activity';
import useUserStore from '@/store/user';
import ActivityCard, { type Activity } from '@/components/ActivityCard';
import Navbar from '@/components/navbar';
import Button from '@/components/button';
import EditUser from './components/editUser';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import Tab from '@/components/Tab';

const PersonPage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const { userInfo } = useUserStore();
    const [openEdit, setOpenEdit] = useState(false);

    const [activities, setActivities] = useState<Activity[]>([]);

    // 获取用户发布的活动数据
    useEffect(() => {
        const fetchUserActivities = async () => {
            if (!userId) return;

            try {
                // 获取用户发布的活动
                const response = await getActivityList({
                    authorId: parseInt(userId),
                    page: 1,
                    pageSize: 20,
                });

                const convertedActivities: Activity[] = response.items.map((item) => ({
                    id: item.id.toString(),
                    title: item.title,
                    content: item.content,
                    time: new Date(item.createdAt).toLocaleString('zh-CN'),
                    location: item.location?.address || item.location?.city || '未知地点',
                    publisher: item.author?.name || '未知用户',
                    publisherId: item.author?.id,
                    avatar: item.author?.avatar || undefined,
                    category: item.tags?.[0]?.tag?.name || '其他',
                    image:
                        item.image?.[0] ||
                        `https://via.placeholder.com/120x80/4ade80/ffffff?text=${item.title.charAt(0)}`,
                }));

                setActivities(convertedActivities);
            } catch (error) {
                console.error('获取用户活动失败:', error);
                setActivities([]);
            }
        };

        fetchUserActivities();
    }, [userId]);

    const renderEmpty = useCallback(() => {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">该用户还没有发布任何活动</p>
            </div>
        );
    }, []);

    const renderCard = useCallback(
        (activities: Activity[]) => {
            return (
                <div className="columns-3 md:columns-4 lg:columns-5 gap-6">
                    {activities.map((activity) => (
                        <ActivityCard
                            className="mb-6"
                            key={activity.id}
                            activity={activity}
                            currentUserId={userInfo?.id}
                            onClick={(id) => (window.location.href = `/activity/${id}`)}
                        />
                    ))}
                </div>
            );
        },
        [userInfo],
    );

    const tabs = [
        {
            id: 'post',
            label: '发布',
            content: renderCard(activities),
        },
        {
            id: 'join',
            label: '参与',
            content: renderEmpty(),
        },
        {
            id: 'collect',
            label: '收藏',
            content: renderEmpty(),
        },
    ];

    return (
        <div className="flex">
            <Navbar />

            <div className="flex-1 flex flex-col px-[100px]">
                <div className="flex items-start justify-center gap-8 py-[80px]">
                    <div className="flex-shrink-0 mr-[12px] ">
                        <div className="w-32 h-32  rounded-full bg-gray-100 ">
                            {userInfo?.avatar && (
                                <img
                                    src={userInfo.avatar}
                                    alt="avatar"
                                    className="w-32 h-32 rounded-full object-cover"
                                />
                            )}
                        </div>
                    </div>

                    <div className=" mr-[150px]">
                        <h2 className="font-bold mb-[12px] text-xl">
                            {userInfo?.name || `用户${userId}`}
                        </h2>
                        <p className="text-gray-800 mb-[12px] !text-xs lg:text-base">
                            {userInfo?.bio || '-'}
                        </p>
                        {userInfo?.gender && (
                            <p className="text-gray-600 mb-[12px] text-sm lg:text-base">
                                {userInfo?.gender === 'FEMALE' ? ' 👧🏻' : '👦🏻'}
                            </p>
                        )}

                        <div className="flex items-center justify-center lg:justify-start gap-4 lg:gap-6 text-gray-600 text-sm lg:text-base">
                            <span>
                                <span className="font-bold">
                                    {Math.floor(Math.random() * 50) + 10}{' '}
                                </span>
                                关注
                            </span>
                            <span>
                                <span className="font-bold">
                                    {Math.floor(Math.random() * 30) + 5}{' '}
                                </span>
                                粉丝
                            </span>
                            <span>
                                <span className="font-bold">
                                    {Math.floor(Math.random() * 100) + 20}{' '}
                                </span>
                                获赞与收藏
                            </span>
                        </div>
                    </div>

                    <Button onClick={() => setOpenEdit(true)}>编辑</Button>
                    <EllipsisHorizontalIcon className="w-6 h-6" />
                </div>

                <Tab
                    tabs={tabs}
                    variant="underline"
                />
            </div>
            <EditUser
                open={openEdit}
                onClose={() => setOpenEdit(false)}
            />
        </div>
    );
};

export default PersonPage;
