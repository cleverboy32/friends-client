# Upload 组件

一个功能完整的图片上传组件，支持拖拽上传、点击上传、预览、删除等功能。

## 功能特性

- ✅ 支持拖拽上传
- ✅ 支持点击上传
- ✅ 图片预览
- ✅ 文件删除
- ✅ 文件类型验证
- ✅ 文件大小限制
- ✅ 最大上传数量限制
- ✅ 上传前回调验证
- ✅ 响应式布局
- ✅ TypeScript 支持

## 基本用法

```tsx
import Upload from '@/components/Upload';

function MyComponent() {
    const handleFileChange = (files) => {
        console.log('文件已更新:', files);
    };

    return <Upload onChange={handleFileChange} maxCount={5} maxSize={5} />;
}
```

## API

### UploadProps

| 参数         | 说明               | 类型                                          | 默认值       |
| ------------ | ------------------ | --------------------------------------------- | ------------ |
| maxCount     | 最大上传数量       | `number`                                      | `18`         |
| maxSize      | 最大文件大小 (MB)  | `number`                                      | `10`         |
| accept       | 支持的文件类型     | `string`                                      | `'image/*'`  |
| multiple     | 是否支持多选       | `boolean`                                     | `true`       |
| drag         | 是否支持拖拽上传   | `boolean`                                     | `true`       |
| beforeUpload | 上传前的回调       | `(file: File) => boolean \| Promise<boolean>` | -            |
| onChange     | 文件改变时的回调   | `(files: UploadFile[]) => void`               | -            |
| onRemove     | 删除文件时的回调   | `(file: UploadFile) => void`                  | -            |
| buttonText   | 自定义上传按钮文本 | `string`                                      | `'添加图片'` |
| disabled     | 是否禁用           | `boolean`                                     | `false`      |
| className    | 自定义样式类名     | `string`                                      | -            |

### UploadFile

| 属性 | 说明            | 类型     |
| ---- | --------------- | -------- |
| id   | 文件唯一标识    | `string` |
| file | 原始文件对象    | `File`   |
| url  | 文件预览URL     | `string` |
| name | 文件名          | `string` |
| size | 文件大小 (字节) | `number` |
| type | 文件类型        | `string` |

## 使用示例

### 基础用法

```tsx
<Upload onChange={(files) => console.log(files)} maxCount={5} maxSize={5} />
```

### 自定义配置

```tsx
<Upload
    onChange={handleFileChange}
    onRemove={handleFileRemove}
    maxCount={10}
    maxSize={2}
    accept="image/jpeg,image/png"
    buttonText="上传照片"
    beforeUpload={(file) => {
        // 自定义验证逻辑
        return file.size < 1024 * 1024; // 小于1MB
    }}
/>
```

### 禁用状态

```tsx
<Upload disabled={true} buttonText="已禁用" />
```

### 完整示例

```tsx
import React, { useState } from 'react';
import Upload, { UploadFile } from '@/components/Upload';

const MyComponent: React.FC = () => {
    const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);

    const handleFileChange = (files: UploadFile[]) => {
        setUploadedFiles(files);
    };

    const handleFileRemove = (file: UploadFile) => {
        console.log('删除文件:', file.name);
    };

    const beforeUpload = (file: File): boolean => {
        // 验证文件
        if (file.size > 5 * 1024 * 1024) {
            alert('文件大小不能超过5MB');
            return false;
        }
        return true;
    };

    return (
        <div>
            <Upload
                onChange={handleFileChange}
                onRemove={handleFileRemove}
                beforeUpload={beforeUpload}
                maxCount={5}
                maxSize={5}
                accept="image/*"
                buttonText="选择图片"
            />

            {uploadedFiles.length > 0 && (
                <div>
                    <h3>已上传文件:</h3>
                    <ul>
                        {uploadedFiles.map((file) => (
                            <li key={file.id}>{file.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
```

## 注意事项

1. 组件会自动处理文件URL的创建和释放，无需手动管理
2. 文件验证失败时会显示alert提示，可以根据需要自定义提示方式
3. 组件使用Tailwind CSS样式，确保项目中已正确配置
4. 支持的文件类型通过`accept`属性控制，默认为`image/*`
5. 拖拽上传功能可以通过`drag`属性禁用

## 样式定制

组件使用Tailwind CSS类名，可以通过以下方式自定义样式：

```tsx
<Upload
    className="my-custom-upload"
    // 其他属性...
/>
```

然后在CSS中定义：

```css
.my-custom-upload .upload-area {
    border-color: #your-color;
}

.my-custom-upload .file-preview {
    border-radius: 8px;
}
```
