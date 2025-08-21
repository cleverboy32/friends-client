import React, { useState } from 'react';
import Radio, { RadioOption } from './index';

const RadioExample: React.FC = () => {
    const [selectedValue, setSelectedValue] = useState<string>('option1');
    const [selectedSize, setSelectedSize] = useState<string>('medium');

    const options: RadioOption[] = [
        { label: '选项 1', value: 'option1' },
        { label: '选项 2', value: 'option2' },
        { label: '选项 3', value: 'option3' },
        { label: '禁用选项', value: 'option4', disabled: true },
    ];

    const sizeOptions: RadioOption[] = [
        { label: '小尺寸', value: 'small' },
        { label: '中等尺寸', value: 'medium' },
        { label: '大尺寸', value: 'large' },
    ];

    return (
        <div style={{ padding: '2rem', maxWidth: '600px' }}>
            <h2 style={{ marginBottom: '1rem', color: '#374151' }}>
                Radio 组件示例
            </h2>

            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '0.5rem', color: '#6b7280' }}>
                    基础用法
                </h3>
                <Radio
                    options={options}
                    value={selectedValue}
                    onChange={setSelectedValue}
                    name="basic-radio"
                />
                <p
                    style={{
                        marginTop: '0.5rem',
                        fontSize: '0.875rem',
                        color: '#6b7280',
                    }}
                >
                    当前选中值: {selectedValue}
                </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '0.5rem', color: '#6b7280' }}>
                    不同尺寸
                </h3>
                <Radio
                    options={sizeOptions}
                    value={selectedSize}
                    onChange={setSelectedSize}
                    name="size-radio"
                    size={selectedSize as 'small' | 'medium' | 'large'}
                />
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '0.5rem', color: '#6b7280' }}>
                    禁用状态
                </h3>
                <Radio
                    options={options}
                    value={selectedValue}
                    onChange={setSelectedValue}
                    name="disabled-radio"
                    disabled={true}
                />
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '0.5rem', color: '#6b7280' }}>
                    自定义样式
                </h3>
                <Radio
                    options={options}
                    value={selectedValue}
                    onChange={setSelectedValue}
                    name="custom-radio"
                    className="custom-radio-group"
                />
            </div>
        </div>
    );
};

export default RadioExample;
