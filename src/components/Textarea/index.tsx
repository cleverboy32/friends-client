import React, { forwardRef } from 'react';
import { useId } from 'react';
import { Field } from '@headlessui/react';
import './index.scss';

export type TextareaSize = 'large' | 'medium' | 'small';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    className?: string;
    size?: TextareaSize;
    layout?: 'vertical' | 'horizontal';
    labelWidth?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        { label, error, className = '', size = 'medium', layout, labelWidth = '60px', ...props },
        ref,
    ) => {
        const id = useId();
        return (
            <Field className={layout === 'vertical' ? 'flex flex-col gap-1' : 'flex items-center'}>
                {label && (
                    <label
                        htmlFor={id}
                        className="mb-1 text-sm  text-gray-700 flex items-center flex-shrink-0"
                        style={{ width: labelWidth }}>
                        {label}
                    </label>
                )}
                <textarea
                    id={id}
                    ref={ref}
                    className={`common-textarea common-textarea--${size} ${error ? 'border-red-500' : 'border-gray-200'} ${className}`.trim()}
                    {...props}
                />
                {error && <div className="mt-1 text-xs text-red-500">{error}</div>}
            </Field>
        );
    },
);

Textarea.displayName = 'Textarea';

export default Textarea;
