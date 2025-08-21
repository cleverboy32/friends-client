import React from 'react';
import './index.scss';

export type ButtonTheme = 'primary' | 'secondary' | 'warning';

interface CommonButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    theme?: ButtonTheme;
}

const Button: React.FC<CommonButtonProps> = ({
    children,
    theme = 'primary',
    className = '',
    ...rest
}) => {
    return (
        <button
            className={`common-btn common-btn--${theme} ${className}`.trim()}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
