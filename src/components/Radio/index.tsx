import React from 'react';
import './index.scss';

export interface RadioOption {
    label: string;
    value: string | number;
    disabled?: boolean;
}

export interface RadioProps {
    options: RadioOption[];
    value?: string | number;
    onChange?: (value: string | number) => void;
    name?: string;
    disabled?: boolean;
    className?: string;
    size?: 'small' | 'medium' | 'large';
}

const Radio: React.FC<RadioProps> = ({
    options,
    value,
    onChange,
    name = 'radio-group',
    disabled = false,
    className = '',
    size = 'medium',
}) => {
    const handleChange = (optionValue: string | number) => {
        if (!disabled && onChange) {
            onChange(optionValue);
        }
    };

    return (
        <div className={`radio-group radio-group--${size} ${className}`.trim()}>
            {options.map((option, index) => (
                <label
                    key={option.value}
                    className={`radio-item ${
                        option.disabled || disabled
                            ? 'radio-item--disabled'
                            : ''
                    }`}
                >
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        onChange={() => handleChange(option.value)}
                        disabled={option.disabled || disabled}
                        className="radio-input"
                    />
                    <span className="radio-custom"></span>
                    <span className="radio-label">{option.label}</span>
                </label>
            ))}
        </div>
    );
};

export default Radio;
