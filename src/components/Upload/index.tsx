import React, { useState, useRef, useCallback } from 'react';
import { PlusIcon, XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { upload } from '@/api/upload';
import './Upload.css';

export interface UploadFile {
    id: string;
    file: File;
    url: string;
    name: string;
    size: number;
    type: string;
}

export interface UploadProps {
    maxCount?: number;
    maxSize?: number;
    accept?: string;
    multiple?: boolean;
    drag?: boolean;
    beforeUpload?: (file: File) => boolean | Promise<boolean>;
    onChange?: (files: UploadFile[]) => void;
    onRemove?: (file: UploadFile) => void;
    buttonText?: string;
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode;
    showTip?: boolean;
}

const Upload: React.FC<UploadProps> = ({
    maxCount = 18,
    maxSize = 10,
    accept = 'image/*',
    multiple = true,
    drag = true,
    beforeUpload,
    onChange,
    onRemove,
    buttonText = '添加图片',
    disabled = false,
    className = '',
    children,
    showTip = true,
}) => {
    const [files, setFiles] = useState<UploadFile[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const generateId = () => Math.random().toString(36).substr(2, 9);

    const validateFile = useCallback(
        (file: File): boolean => {
            if (accept && !file.type.match(accept.replace('*', '.*'))) {
                alert(`不支持的文件类型: ${file.type}`);
                return false;
            }

            if (maxSize && file.size > maxSize * 1024 * 1024) {
                alert(`文件大小不能超过 ${maxSize}MB`);
                return false;
            }

            return true;
        },
        [accept, maxSize],
    );

    const handleFileUpload = useCallback(
        async (fileList: FileList) => {
            const newFiles: UploadFile[] = [];

            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i];

                if (!validateFile(file)) {
                    continue;
                }

                if (beforeUpload) {
                    const shouldUpload = await beforeUpload(file);
                    if (!shouldUpload) {
                        continue;
                    }
                }

                const url = URL.createObjectURL(file);
                const uploadFile: UploadFile = {
                    id: generateId(),
                    file,
                    url,
                    name: file.name,
                    size: file.size,
                    type: file.type,
                };

                newFiles.push(uploadFile);
            }

            if (maxCount === 1) {
                // 单文件模式：使用最后一个通过校验的新文件替换现有文件
                if (newFiles.length === 0) return;
                const picked = newFiles[newFiles.length - 1];

                setFiles([picked]);
                onChange?.([picked]);

                try {
                    const data = await upload(picked.file);
                    const serverUrl = data.imageUrl || data?.imageUrl || '';
                    if (serverUrl) {
                        setFiles([{ ...picked, url: serverUrl }]);
                        onChange?.([{ ...picked, url: serverUrl }]);
                        URL.revokeObjectURL(picked.url);
                    }
                } catch (err) {
                    // 上传失败，移除该文件并提示
                    setFiles([]);
                    onChange?.([]);
                    URL.revokeObjectURL(picked.url);
                    alert(`上传失败：${picked.name}`);
                }
                return;
            }

            if (files.length + newFiles.length > maxCount) {
                alert(`最多只能上传 ${maxCount} 个文件`);
                // 释放已创建但未加入状态的对象URL
                newFiles.forEach((f) => URL.revokeObjectURL(f.url));
                return;
            }

            // 先乐观更新，展示本地预览（多文件模式）
            const optimisticFiles = [...files, ...newFiles];
            setFiles(optimisticFiles);
            onChange?.(optimisticFiles);

            // 并发上传，每个成功后用服务端URL替换
            await Promise.all(
                newFiles.map(async (nf) => {
                    try {
                        const data = await upload(nf.file);
                        const serverUrl = data.imageUrl || data?.imageUrl || '';
                        if (serverUrl) {
                            // 替换对应文件的url
                            setFiles((prev) => {
                                const next = prev.map((f) =>
                                    f.id === nf.id ? { ...f, url: serverUrl } : f,
                                );
                                onChange?.(next);
                                return next;
                            });
                            URL.revokeObjectURL(nf.url);
                        }
                    } catch (err) {
                        // 上传失败，移除该文件并提示
                        setFiles((prev) => {
                            const next = prev.filter((f) => f.id !== nf.id);
                            onChange?.(next);
                            return next;
                        });
                        URL.revokeObjectURL(nf.url);
                        alert(`上传失败：${nf.name}`);
                    }
                }),
            );
        },
        [files, maxCount, validateFile, beforeUpload, onChange],
    );

    const handleFileSelect = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const fileList = event.target.files;
            if (fileList) {
                handleFileUpload(fileList);
            }
            event.target.value = '';
        },
        [handleFileUpload],
    );

    const handleDragOver = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            if (drag && !disabled) {
                setIsDragOver(true);
            }
        },
        [drag, disabled],
    );

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragOver(false);

            if (drag && !disabled) {
                const fileList = e.dataTransfer.files;
                handleFileUpload(fileList);
            }
        },
        [drag, disabled, handleFileUpload],
    );

    const handleRemove = useCallback(
        (file: UploadFile) => {
            const updatedFiles = files.filter((f) => f.id !== file.id);
            setFiles(updatedFiles);
            onChange?.(updatedFiles);
            onRemove?.(file);
            URL.revokeObjectURL(file.url);
        },
        [files, onChange, onRemove],
    );

    const handleClick = useCallback(() => {
        if (!disabled) {
            fileInputRef.current?.click();
        }
    }, [disabled]);

    const renderButton = useCallback(() => {
        return (
            <div className="flex flex-col items-center justify-center py-8">
                <PhotoIcon className="w-12 h-12 text-gray-400 mb-2" />
                <p className="text-gray-600 mb-1">点击上传图片</p>
                <p className="text-sm text-gray-500">
                    支持 {accept} 格式，最大 {maxSize}MB
                </p>
            </div>
        );
    }, [accept, maxSize]);

    const renderList = useCallback(() => {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {files.map((file) => (
                    <div
                        key={file.id}
                        className="relative group">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            <img
                                src={file.url}
                                alt={file.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRemove(file);
                            }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-dark-primary">
                            <XMarkIcon className="w-3 h-3" />
                        </button>
                    </div>
                ))}

                {files.length < maxCount && (
                    <div className="aspect-square border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center hover:border-primary transition-colors">
                        <PlusIcon className="w-6 h-6 text-gray-400" />
                        <span className="text-xs text-gray-500 mt-1">{buttonText}</span>
                    </div>
                )}
            </div>
        );
    }, [files, maxCount, buttonText, handleRemove]);

    return (
        <div className={`upload-component ${className}`}>
            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                multiple={multiple}
                onChange={handleFileSelect}
                className="hidden"
                disabled={disabled}
            />

            <div
                onClick={handleClick}
                className={`${disabled ? 'relative opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                {children ? (
                    <div>{children}</div>
                ) : (
                    <div
                        className={`
                    rounded-lg p-4 transition-colors upload-area
                    ${files.length > 0 ? 'has-files' : ''}
                    ${
                        files.length === 0
                            ? `border-2 border-dashed ${
                                  isDragOver
                                      ? 'border-primary bg-primary/10'
                                      : 'border-gray-300 hover:border-primary'
                              }`
                            : 'border-0'
                    }
                `}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}>
                        {files.length === 0 ? renderButton() : renderList()}
                    </div>
                )}
            </div>

            {files.length > 0 && showTip && (
                <div className="pl-4 text-[11px] text-gray-400">
                    已上传 {files.length}/{maxCount} 个文件
                </div>
            )}
        </div>
    );
};

export default Upload;
