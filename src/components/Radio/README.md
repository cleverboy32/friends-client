# Radio 组件

基于 primary 颜色主题的单选组件，支持多种尺寸和状态。

## 特性

- 🎨 基于 primary 颜色主题（柠檬黄 #FFD166）
- 📏 支持三种尺寸：small、medium、large
- ♿ 支持禁用状态
- 📱 响应式设计
- 🎯 完整的 TypeScript 支持
- ♿ 无障碍访问支持

## 安装

组件已包含在项目中，直接导入即可使用：

```tsx
import Radio, { RadioOption } from '@/components/Radio';
```

## 基础用法

```tsx
import React, { useState } from 'react';
import Radio, { RadioOption } from '@/components/Radio';

const MyComponent: React.FC = () => {
    const [selectedValue, setSelectedValue] = useState<string>('option1');

    const options: RadioOption[] = [
        { label: '选项 1', value: 'option1' },
        { label: '选项 2', value: 'option2' },
        { label: '选项 3', value: 'option3' },
    ];

    return (
        <Radio
            options={options}
            value={selectedValue}
            onChange={setSelectedValue}
            name="my-radio-group"
        />
    );
};
```

## API

### RadioProps

| 属性      | 类型                                | 默认值          | 说明               |
| --------- | ----------------------------------- | --------------- | ------------------ |
| options   | `RadioOption[]`                     | -               | 选项数组（必填）   |
| value     | `string \| number`                  | -               | 当前选中的值       |
| onChange  | `(value: string \| number) => void` | -               | 值改变时的回调函数 |
| name      | `string`                            | `'radio-group'` | 表单字段名称       |
| disabled  | `boolean`                           | `false`         | 是否禁用整个组件   |
| className | `string`                            | `''`            | 自定义 CSS 类名    |
| size      | `'small' \| 'medium' \| 'large'`    | `'medium'`      | 组件尺寸           |

### RadioOption

| 属性     | 类型               | 默认值  | 说明             |
| -------- | ------------------ | ------- | ---------------- |
| label    | `string`           | -       | 选项标签（必填） |
| value    | `string \| number` | -       | 选项值（必填）   |
| disabled | `boolean`          | `false` | 是否禁用该选项   |

## 尺寸

组件支持三种尺寸：

- **small**: 14px 单选按钮，适合紧凑布局
- **medium**: 16px 单选按钮，默认尺寸
- **large**: 20px 单选按钮，适合大屏幕

```tsx
<Radio
    options={options}
    value={selectedValue}
    onChange={setSelectedValue}
    size="large"
/>
```

## 禁用状态

可以禁用整个组件或单个选项：

```tsx
// 禁用整个组件
<Radio
    options={options}
    value={selectedValue}
    onChange={setSelectedValue}
    disabled={true}
/>;

// 禁用单个选项
const options: RadioOption[] = [
    { label: '选项 1', value: 'option1' },
    { label: '禁用选项', value: 'option2', disabled: true },
];
```

## 样式定制

组件使用 CSS 变量来定义颜色，可以通过 CSS 变量覆盖：

```css
:root {
    --color-primary: #ffd166; /* 主色调 */
}
```

## 无障碍访问

组件遵循 WAI-ARIA 规范：

- 使用语义化的 HTML 结构
- 支持键盘导航
- 提供适当的焦点指示器
- 支持屏幕阅读器

## 示例

查看 `example.tsx` 文件获取完整的使用示例。
