import React, { forwardRef } from 'react';
import { useId } from 'react';
import { Field } from '@headlessui/react';
import './index.scss';

export type InputTheme = 'primary' | 'secondary' | 'warning';
export type InputSize = 'large' | 'medium' | 'small';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    error?: string;
    className?: string;
    size?: InputSize;
    layout?: 'vertical' | 'horizontal';
    labelWidth?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        { label, error, className = '', size = 'medium', layout, labelWidth = '60px', ...props },
        ref,
    ) => {
        const id = useId();
        return (
            <Field
                className={
                    layout === 'vertical' ? 'flex flex-col gap-1' : 'flex items-center flex-1'
                }>
                {label && (
                    <label
                        htmlFor={id}
                        className="mb-1 text-sm font-medium text-gray-700 flex items-center flex-shrink-0"
                        style={{ width: labelWidth }}>
                        {label}
                    </label>
                )}
                <input
                    id={id}
                    ref={ref}
                    className={`common-input common-input--${size} ${error ? 'border-red-500' : 'border-gray-200'} ${className}`.trim()}
                    {...props}
                />
                {error && <div className="mt-1 text-xs text-red-500">{error}</div>}
            </Field>
        );
    },
);

Input.displayName = 'Input';

export default Input;
