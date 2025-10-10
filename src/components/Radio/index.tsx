import React from 'react';

interface RadioOption {
    label: string;
    value: string | number;
}

interface RadioGroupProps {
    label?: string;
    labelWidth?: string;
    value?: string | number;
    options: RadioOption[];
    onChange: (value: string | number) => void;
    className?: string;
    variant?: 'default' | 'segmented'; // 新增variant属性
}

const RadioGroup: React.FC<RadioGroupProps> = ({
    label,
    labelWidth = '60px',
    value,
    options,
    onChange,
    className = '',
    variant = 'default', // 默认为原来的圆形样式
}) => {
    if (variant === 'segmented') {
        return (
            <div className={`flex ${className}`}>
                {label && (
                    <label
                        className="font-medium text-dark-theme mr-[24px]"
                        style={{ width: labelWidth }}>
                        {label}
                    </label>
                )}
                <div className="flex border-gray-200  overflow-hidden border rounded-md border-light-theme">
                    {options.map((option) => {
                        const isChecked = value === option.value || (option.value === '' && !value);
                        return (
                            <label
                                key={option.value}
                                className={`flex-1 cursor-pointer transition-colors ${
                                    isChecked ? 'bg-theme text-white' : 'bg-white'
                                }`}>
                                <input
                                    type="radio"
                                    value={option.value}
                                    checked={isChecked}
                                    onChange={(e) => onChange(e.target.value)}
                                    className="sr-only"
                                />
                                <div className="px-[24px] py-2  font-medium text-center whitespace-nowrap">
                                    {option.label}
                                </div>
                            </label>
                        );
                    })}
                </div>
            </div>
        );
    }

    // 原来的圆形单选按钮样式
    return (
        <div className={`flex ${className}`}>
            {label && (
                <label
                    className="flex-shrink-0 text-sm"
                    style={{ width: labelWidth }}>
                    {label}
                </label>
            )}
            <div className="flex flex-wrap gap-4">
                {options.map((option) => {
                    const isChecked = value === option.value || (option.value === '' && !value);
                    return (
                        <label
                            key={option.value}
                            className="flex items-center cursor-pointer min-w-[40px]">
                            <div className="relative">
                                <input
                                    type="radio"
                                    value={option.value}
                                    checked={isChecked}
                                    onChange={(e) => onChange(e.target.value)}
                                    className="sr-only" // 完全隐藏原生input
                                />
                                <div
                                    className={`w-4 h-4 rounded-full border-2 transition-colors ${
                                        isChecked
                                            ? 'border-primary bg-white'
                                            : 'border-gray-300 bg-white'
                                    }`}>
                                    {isChecked && (
                                        <div className="w-2 h-2 rounded-full bg-primary m-0.5"></div>
                                    )}
                                </div>
                            </div>
                            <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
};

export default React.memo(RadioGroup);
export type { RadioOption, RadioGroupProps };
