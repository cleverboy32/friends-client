import React, { useState } from 'react';
import {
    ArrowLeftIcon,
    HeartIcon,
    BookmarkIcon,
    ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline';
import { MapPinIcon, UserGroupIcon } from '@heroicons/react/24/solid';
import Upload from '@/components/Upload';
import type { UploadFile } from '@/components/Upload';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Tab from '@/components/Tab';
import Select from '@/components/Select';
import Switch from '@/components/Switch';
import Button from '@/components/button';
import DatePicker from '@/components/DatePicker';

const PostActivity: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTab, setSelectedTab] = useState('topic');
    const [allowCoShooting, setAllowCoShooting] = useState(true);
    const [allowTextCopy, setAllowTextCopy] = useState(true);
    const [driveTraffic, setDriveTraffic] = useState(false);
    const [publishTime, setPublishTime] = useState('immediate');
    const [previewTab, setPreviewTab] = useState('note');
    const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);

    // 处理文件上传
    const handleFileChange = (files: UploadFile[]) => {
        setUploadedFiles(files);
        console.log('文件已更新:', files);
    };

    // 处理文件删除
    const handleFileRemove = (file: UploadFile) => {
        console.log('文件已删除:', file);
    };

    // 清空所有文件
    const handleClearAll = () => {
        setUploadedFiles([]);
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
    const handlePublish = () => {
        if (uploadedFiles.length === 0) {
            alert('请至少上传一张图片');
            return;
        }

        if (!title.trim()) {
            alert('请填写标题');
            return;
        }

        // 这里可以添加实际的发布逻辑
        console.log('发布内容:', {
            title,
            description,
            images: uploadedFiles,
            allowCoShooting,
            allowTextCopy,
            driveTraffic,
            publishTime,
        });

        alert('发布成功！');
    };

    const activityTopics = [
        { id: 1, name: '夏天用游泳开场', type: 'activity' },
        { id: 2, name: '21天新鲜事vlog', type: 'activity' },
        { id: 3, name: '按下快门前的30s', type: 'activity' },
    ];

    const tabs = [
        {
            id: 'topic',
            label: '#话题',
            content: (
                <div className="bg-white rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-medium">活动话题</h2>
                        <button className="text-blue-500 text-sm">更多</button>
                    </div>

                    <div className="space-y-3">
                        {activityTopics.map((topic) => (
                            <div
                                key={topic.id}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                                <div className="flex items-center">
                                    <span className="text-blue-500 font-medium">
                                        #{topic.name}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button className="text-blue-500 text-sm">
                                        添加话题
                                    </button>
                                    <button className="text-gray-500 text-sm">
                                        活动详情
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ),
        },
        { id: 'user', label: '@用户', content: <div>用户内容</div> },
        { id: 'emoji', label: '😄 表情', content: <div>表情内容</div> },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className="flex-1 p-6">
                <div className="flex items-center mb-6">
                    <button className="p-2 hover:bg-gray-100 rounded-lg mr-3">
                        <ArrowLeftIcon className="w-5 h-5" />
                    </button>
                    <h2 className="text-xl font-semibold">发布任务</h2>
                </div>

                <div className="bg-white rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-medium"></h2>
                        {uploadedFiles.length > 0 && (
                            <button
                                className="text-primary text-sm hover:text-dark-primary cursor-pointer"
                                onClick={handleClearAll}
                            >
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
                    <h2 className="text-lg font-medium mb-4">任务内容</h2>

                    <div className="mb-4">
                        <Input
                            type="text"
                            placeholder="填写标题会有更多赞哦~"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={20}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none"
                        />
                        <div className="text-right text-sm text-gray-500 mt-1">
                            {title.length}/20
                        </div>
                    </div>

                    {/* 描述输入 */}
                    <div className="mb-4">
                        <Textarea
                            placeholder="输入正文描述,真诚有价值的分享予人温暖"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none resize-none"
                            rows={4}
                            maxLength={1000}
                        />
                        <div className="text-right text-sm text-gray-500 mt-1">
                            {description.length}/1000
                        </div>
                    </div>

                    <Tab
                        tabs={tabs}
                        selected={selectedTab}
                        onChange={(tab) => setSelectedTab(tab.id)}
                    />
                </div>

                {/* 其他选项 */}
                <div className="bg-white rounded-lg p-4 mb-6 flex">
                    <div className="flex">
                        <div className="flex items-center mr-10">
                            <p className="text-gray-700 flex items-center mr-2">
                                添加地点
                            </p>
                            <MapPinIcon className="w-5 h-5  text-theme cursor-pointer" />
                        </div>

                        <div className="flex items-center">
                            <p className="text-gray-700 flex items-center mr-2">
                                关联群聊
                            </p>
                            <UserGroupIcon className="w-5 h-5 text-theme cursor-pointer" />
                        </div>
                    </div>
                </div>

                {/* 更多设置 */}
                <div className="bg-white rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-medium">更多设置</h2>
                        <button className="text-dark-primary text-sm">
                            收起
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-700">内容类型声明</span>
                            <Select
                                options={[
                                    { label: '活动', value: 'activity' },
                                    { label: '笔记', value: 'note' },
                                ]}
                                onChange={() => {}}
                                value="activity"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-gray-700">可见范围</span>
                            <Select
                                options={[
                                    { label: '公开可见', value: 'public' },
                                    { label: '仅自己可见', value: 'private' },
                                ]}
                                onChange={() => {}}
                                value="public"
                            />
                        </div>

                        <Switch
                            label="允许合拍"
                            checked={allowCoShooting}
                            onChange={setAllowCoShooting}
                            size="medium"
                        />

                        <Switch
                            label="允许正文复制"
                            checked={allowTextCopy}
                            onChange={setAllowTextCopy}
                            size="medium"
                        />

                        <Switch
                            label="立即发布"
                            checked={allowTextCopy}
                            onChange={setAllowTextCopy}
                            size="medium"
                        />

                        <Switch
                            label="定时发布"
                            checked={allowTextCopy}
                            onChange={setAllowTextCopy}
                            size="medium"
                        />

                        <div className="flex items-center justify-between">
                            <span className="text-gray-700">发布时间</span>
                            <DatePicker />
                        </div>
                    </div>
                </div>

                {/* 发布按钮 */}
                <Button
                    onClick={handlePublish}
                    disabled={uploadedFiles.length === 0 || !title.trim()}
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                        uploadedFiles.length > 0 && title.trim()
                            ? 'bg-theme text-white hover:bg-dark-theme'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    {publishTime === 'immediate' ? '立即发布' : '定时发布'}
                </Button>
            </div>

            {/* 右侧预览区域 */}
            <div className="w-96 bg-white border-l border-gray-200 p-4">
                {/* 预览选项卡 */}
                <div className="flex border-b border-gray-200 mb-4">
                    <button
                        className={`px-4 py-2 text-sm font-medium ${
                            previewTab === 'note'
                                ? 'text-blue-500 border-b-2 border-blue-500'
                                : 'text-gray-500'
                        }`}
                        onClick={() => setPreviewTab('note')}
                    >
                        笔记预览
                    </button>
                </div>

                {/* 移动端预览 */}
                <div className="bg-gray-100 rounded-3xl p-2">
                    <div className="bg-white rounded-2xl overflow-hidden">
                        {/* 状态栏 */}
                        <div className="flex items-center justify-between px-4 py-2 bg-white">
                            <span className="text-sm font-medium">9:41</span>
                            <div className="flex items-center space-x-1">
                                <div className="w-4 h-4 bg-gray-800 rounded-sm"></div>
                                <div className="w-4 h-4 bg-gray-800 rounded-sm"></div>
                            </div>
                        </div>

                        {/* 导航栏 */}
                        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
                            <div className="flex items-center space-x-2">
                                <button className="p-1">
                                    <ArrowLeftIcon className="w-5 h-5" />
                                </button>
                                <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full"></div>
                                <span className="font-medium">Lily</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="px-3 py-1 bg-red-500 text-white rounded-full text-sm">
                                    关注
                                </button>
                                <button className="p-1">
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* 内容区域 */}
                        <div className="bg-white">
                            {/* 图片 */}
                            <div className="relative">
                                {uploadedFiles.length > 0 ? (
                                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                                        <img
                                            src={uploadedFiles[0].url}
                                            alt={uploadedFiles[0].name}
                                            className="w-full h-full object-cover"
                                        />
                                        {uploadedFiles.length > 1 && (
                                            <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                                                1/{uploadedFiles.length}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="w-full h-48 bg-gradient-to-br from-green-200 to-yellow-200 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-green-400 rounded-full mr-2 inline-block"></div>
                                            <div className="w-16 h-16 bg-yellow-400 rounded-full inline-block"></div>
                                            <p className="text-gray-500 mt-2">
                                                暂无图片
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* 文本内容 */}
                            <div className="p-4">
                                <h3 className="font-medium mb-2">
                                    {title || '纳米AI搜索'}
                                </h3>
                                <p className="text-gray-600 text-sm mb-2">
                                    {description || '编辑于刚刚'}
                                </p>

                                {/* 分页指示器 */}
                                {uploadedFiles.length > 1 && (
                                    <div className="flex justify-center space-x-1 mb-3">
                                        {uploadedFiles.map((_, index) => (
                                            <div
                                                key={index}
                                                className={`w-2 h-2 rounded-full ${
                                                    index === 0
                                                        ? 'bg-theme'
                                                        : 'bg-gray-300'
                                                }`}
                                            ></div>
                                        ))}
                                    </div>
                                )}

                                {/* 用户信息 */}
                                <div className="flex items-center space-x-2">
                                    <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full"></div>
                                    <span className="text-sm text-gray-500">
                                        说点什么,让TA也认识看笔记的你
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 底部交互栏 */}
                        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-100">
                            <Input
                                type="text"
                                placeholder="说点什么..."
                                className="flex-1 p-2 border border-gray-200 rounded-full text-sm focus:outline-none"
                            />
                            <div className="flex items-center space-x-4 ml-3">
                                <button className="p-1">
                                    <HeartIcon className="w-6 h-6 text-gray-400" />
                                </button>
                                <button className="p-1">
                                    <BookmarkIcon className="w-6 h-6 text-gray-400" />
                                </button>
                                <button className="p-1">
                                    <ChatBubbleLeftIcon className="w-6 h-6 text-gray-400" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostActivity;
