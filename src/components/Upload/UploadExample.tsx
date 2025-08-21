import React, { useState } from 'react';
import Upload, { UploadFile } from './index';

const UploadExample: React.FC = () => {
    const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);

    const handleFileChange = (files: UploadFile[]) => {
        setUploadedFiles(files);
        console.log('文件已更新:', files);
    };

    const handleFileRemove = (file: UploadFile) => {
        console.log('文件已删除:', file);
    };

    const beforeUpload = (file: File): boolean => {
        // 可以在这里进行文件验证
        console.log('准备上传文件:', file.name);
        return true;
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Upload 组件示例</h1>

            <div className="space-y-6">
                {/* 基础用法 */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">基础用法</h2>
                    <Upload
                        onChange={handleFileChange}
                        onRemove={handleFileRemove}
                        maxCount={5}
                        maxSize={5}
                    />
                </div>

                {/* 自定义配置 */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">自定义配置</h2>
                    <Upload
                        onChange={handleFileChange}
                        onRemove={handleFileRemove}
                        maxCount={10}
                        maxSize={2}
                        accept="image/jpeg,image/png"
                        buttonText="上传照片"
                        beforeUpload={beforeUpload}
                        className="custom-upload"
                    />
                </div>

                {/* 禁用状态 */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">禁用状态</h2>
                    <Upload disabled={true} buttonText="已禁用" />
                </div>

                {/* 已上传文件列表 */}
                {uploadedFiles.length > 0 && (
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4">
                            已上传文件列表
                        </h2>
                        <div className="space-y-2">
                            {uploadedFiles.map((file) => (
                                <div
                                    key={file.id}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded"
                                >
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={file.url}
                                            alt={file.name}
                                            className="w-10 h-10 object-cover rounded"
                                        />
                                        <div>
                                            <p className="font-medium">
                                                {file.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {(
                                                    file.size /
                                                    1024 /
                                                    1024
                                                ).toFixed(2)}{' '}
                                                MB
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {file.type}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadExample;
