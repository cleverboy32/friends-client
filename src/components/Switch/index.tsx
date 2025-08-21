import React from 'react';
import './index.scss';

export interface SwitchProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    size?: 'small' | 'medium' | 'large';
    className?: string;
    label?: string;
}

const Switch: React.FC<SwitchProps> = ({
    checked = false,
    onChange,
    disabled = false,
    size = 'medium',
    className = '',
    label,
}) => {
    const handleToggle = () => {
        if (!disabled && onChange) {
            onChange(!checked);
        }
    };

    return (
        <div className={`switch-container ${className}`.trim()}>
            {label && <span className="switch-label">{label}</span>}
            <button
                className={`switch switch--${size} ${
                    checked ? 'switch--checked' : ''
                } ${disabled ? 'switch--disabled' : ''}`}
                onClick={handleToggle}
                disabled={disabled}
                type="button"
                role="switch"
                aria-checked={checked}
            >
                <div className="switch-thumb"></div>
            </button>
        </div>
    );
};

export default Switch;
