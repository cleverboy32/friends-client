import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { MapPinIcon } from '@heroicons/react/24/solid';
import LocationPicker from '@/components/LocationPicker';
import Upload from '@/components/Upload';
import type { UploadFile } from '@/components/Upload';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Tab from '@/components/Tab';
import Select from '@/components/Select';
import Switch from '@/components/Switch';
import Button from '@/components/button';
import ActivityCard from '@/components/ActivityCard';
import { createActivity } from '@/api/activity';
import type { CreateActivityParams, Location } from '@/types/activity';
import useUserStore from '@/store/user';

interface ActivityForm {
    title: string;
    content: string;
    type: 'ONLINE' | 'OFFLINE';
    needPartner: boolean;
    images: UploadFile[];
    location: Location | null;
    tags: string[];
}

const PostActivity: React.FC = () => {
    const navigate = useNavigate();
    const [isPublishing, setIsPublishing] = useState(false);
    const { userInfo } = useUserStore();

    console.log(userInfo);

    // 统一的表单数据对象
    const [form, setForm] = useState<ActivityForm>({
        title: '',
        content: '',
        type: 'OFFLINE',
        needPartner: true,
        images: [],
        location: null,
        tags: [],
    });

    // 更新表单字段的通用函数
    const updateForm = (updates: Partial<ActivityForm>) => {
        setForm((prev) => ({ ...prev, ...updates }));
    };

    // 处理文件上传
    const handleFileChange = (files: UploadFile[]) => {
        updateForm({ images: files });
        console.log('文件已更新:', files);
    };

    // 处理文件删除
    const handleFileRemove = (file: UploadFile) => {
        console.log('文件已删除:', file);
    };

    // 清空所有文件
    const handleClearAll = () => {
        updateForm({ images: [] });
    };

    // 文件上传前验证
    const beforeUpload = (file: File): boolean => {
        // 检查文件类型
        if (!file.type.startsWith('image/')) {
            alert('只能上传图片文件');
            return false;
        }

        // 检查文件大小（10MB）
        if (file.size > 10 * 1024 * 1024) {
            alert('文件大小不能超过10MB');
            return false;
        }

        return true;
    };

    // 发布内容
    const handlePublish = async () => {
        // 表单验证
        // if (form.images.length === 0) {
        //     alert('请至少上传一张图片');
        //     return;
        // }

        if (!form.title.trim()) {
            alert('请填写标题');
            return;
        }

        if (!form.content.trim()) {
            alert('请填写活动内容');
            return;
        }

        if (!form.location) {
            alert('请选择活动地点');
            return;
        }

        setIsPublishing(true);

        try {
            // 准备发布数据
            const activityData: CreateActivityParams = {
                type: form.type,
                title: form.title.trim(),
                content: form.content.trim(),
                image: form.images.map((file) => file.url || file.name),
                needPartner: form.needPartner,
                location: form.location,
                tagIds: [], // 这里可以根据选择的标签转换为 ID 数组
            };

            // 调用 API 创建活动
            const response = await createActivity(activityData);

            if (response) {
                alert('活动发布成功！');
                // 跳转到活动详情页或者首页
                navigate('/discover');
            }
        } catch (error: unknown) {
            console.error('发布活动失败:', error);
            let errorMessage = '发布失败，请稍后重试';
            if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
                errorMessage = (error.response.data as { message: string }).message;
            }
            alert(errorMessage);
        } finally {
            setIsPublishing(false);
        }
    };

    // 添加地点选择功能
    const [showLocationPicker, setShowLocationPicker] = useState(false);

    const handleLocationSelect = () => {
        setShowLocationPicker(true);
    };

    const handleLocationChange = (location: Location) => {
        updateForm({ location });
    };

    // 添加标签选择功能
    const handleTagSelect = (tagName: string) => {
        if (form.tags.includes(tagName)) {
            updateForm({ tags: form.tags.filter((tag) => tag !== tagName) });
        } else if (form.tags.length < 5) {
            // 最多选择5个标签
            updateForm({ tags: [...form.tags, tagName] });
        } else {
            alert('最多只能选择5个标签');
        }
    };

    // 创建预览用的活动对象，适配 ActivityCard 组件的接口
    const previewActivity = useMemo(
        () => ({
            id: '0', // 预览用的临时 ID
            title: form.title || '活动标题预览',
            content: form.content || '这里是活动内容的预览...',
            time: new Date().toLocaleString(),
            location: form.location
                ? `${form.location.city} ${form.location.address || ''}`
                : '未选择地点',
            publisher: userInfo?.name || '当前用户',
            publisherId: userInfo?.id,
            avatar: userInfo?.avatar || '',
            category: form.tags.length > 0 ? form.tags[0] : '其他',
            image: form.images.length > 0 ? form.images[0].url || form.images[0].name : '',
        }),
        [form, userInfo],
    );

    const activityTopics = [
        { id: 1, name: '夏天用游泳开场', type: 'activity' },
        { id: 2, name: '21天新鲜事vlog', type: 'activity' },
        { id: 3, name: '按下快门前的30s', type: 'activity' },
    ];

    const _tabs = [
        {
            id: 'topic',
            label: '#话题',
            content: (
                <div className="bg-white rounded-lg mb-6 gap-3 flex-wrap flex">
                    {activityTopics.map((topic) => (
                        <div
                            key={topic.id}
                            className={`p-2 rounded-lg cursor-pointer transition-colors ${
                                form.tags.includes(topic.name)
                                    ? 'bg-theme text-white'
                                    : 'bg-gray-50 hover:bg-gray-100'
                            }`}
                            onClick={() => handleTagSelect(topic.name)}>
                            <div className="flex items-center">
                                <span
                                    className={`text-[14px] font-medium ${
                                        form.tags.includes(topic.name)
                                            ? 'text-white'
                                            : 'text-dark-theme'
                                    }`}>
                                    #{topic.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ),
        },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className="flex-1 p-6">
                <div className="flex items-center mb-6">
                    <button
                        className="p-2 hover:bg-gray-100 rounded-lg mr-3"
                        onClick={() => navigate(-1)}>
                        <ArrowLeftIcon className="w-5 h-5" />
                    </button>
                    <h2 className="text-xl font-semibold">发布活动</h2>
                </div>

                <div className="bg-white rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-medium"></h2>
                        {form.images.length > 0 && (
                            <button
                                className="text-primary text-sm hover:text-dark-primary cursor-pointer"
                                onClick={handleClearAll}>
                                清空并重新上传
                            </button>
                        )}
                    </div>

                    <Upload
                        onChange={handleFileChange}
                        onRemove={handleFileRemove}
                        beforeUpload={beforeUpload}
                        maxCount={18}
                        maxSize={10}
                        accept="image/*"
                        buttonText="添加图片"
                        className="mb-4"
                    />
                </div>

                <div className="bg-white rounded-lg p-4 mb-6">
                    <h2 className="text-lg font-medium mb-4">活动内容</h2>

                    <div className="mb-4">
                        <Input
                            type="text"
                            placeholder="填写活动标题"
                            value={form.title}
                            onChange={(e) => updateForm({ title: e.target.value })}
                            maxLength={50}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none"
                        />
                        <div className="text-right text-sm text-gray-500 mt-1">
                            {form.title.length}/50
                        </div>
                    </div>

                    {/* 内容输入 */}
                    <div className="mb-4">
                        <Textarea
                            placeholder="输入活动详细内容，让更多人了解你的活动"
                            value={form.content}
                            onChange={(e) => updateForm({ content: e.target.value })}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none resize-none"
                            rows={4}
                            maxLength={1000}
                        />
                        <div className="text-right text-sm text-gray-500 mt-1">
                            {form.content.length}/1000
                        </div>
                    </div>

                    {/* <Tab
                        tabs={tabs}
                        onChange={(tab) => setSelectedTab(tab.id)}
                    /> */}
                </div>

                {/* 地点选择 */}
                <div className="bg-white rounded-lg p-4 mb-6">
                    <h2 className="text-lg font-medium mb-4">活动地点</h2>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <MapPinIcon className="w-5 h-5 text-theme mr-2" />
                            <span className="text-gray-700">
                                {form.location
                                    ? `${form.location.city} ${form.location.address || ''}`
                                    : '请选择活动地点'}
                            </span>
                        </div>
                        <button
                            className="text-theme hover:text-dark-theme text-sm font-medium"
                            onClick={handleLocationSelect}>
                            {form.location ? '更改地点' : '选择地点'}
                        </button>
                    </div>
                </div>

                {/* 更多设置 */}
                <div className="bg-white rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-medium">活动设置</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-700">活动类型</span>
                            <Select
                                options={[
                                    { label: '线下活动', value: 'OFFLINE' },
                                    { label: '线上活动', value: 'ONLINE' },
                                ]}
                                onChange={(value) =>
                                    updateForm({
                                        type: value as 'ONLINE' | 'OFFLINE',
                                    })
                                }
                                value={form.type}
                            />
                        </div>

                        <Switch
                            label="寻找合作伙伴"
                            checked={form.needPartner}
                            onChange={(checked) => updateForm({ needPartner: checked })}
                            size="medium"
                        />

                        {form.tags.length > 0 && (
                            <div>
                                <span className="text-gray-700 text-sm mb-2 block">已选标签:</span>
                                <div className="flex flex-wrap gap-2">
                                    {form.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-theme text-white text-sm rounded-full">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* 发布按钮 */}
                <Button
                    onClick={handlePublish}
                    disabled={
                        isPublishing ||
                        form.images.length === 0 ||
                        !form.title.trim() ||
                        !form.content.trim() ||
                        !form.location
                    }
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                        !isPublishing &&
                        form.images.length > 0 &&
                        form.title.trim() &&
                        form.content.trim() &&
                        form.location
                            ? 'bg-theme text-white hover:bg-dark-theme'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}>
                    {isPublishing ? '发布中...' : '发布活动'}
                </Button>

                <LocationPicker
                    visible={showLocationPicker}
                    onChange={handleLocationChange}
                    onClose={() => setShowLocationPicker(false)}
                />
            </div>

            {/* 右侧预览区域 */}
            <div className="w-96 bg-white border-l border-gray-200 p-4">
                <div className="mb-4">
                    <Tab
                        tabs={[
                            {
                                id: 'preview',
                                label: '预览',
                                content: null,
                            },
                        ]}
                        variant="underline"
                    />
                </div>

                {/* 使用 ActivityCard 组件进行预览 */}
                <ActivityCard
                    className="w-[280px]"
                    activity={previewActivity}
                    currentUserId={userInfo?.id}
                />
            </div>
        </div>
    );
};

export default PostActivity;
