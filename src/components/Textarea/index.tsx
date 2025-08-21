import React, { forwardRef } from 'react';
import { useId } from 'react';
import { Field } from '@headlessui/react';
import './index.scss';

export type TextareaSize = 'large' | 'medium' | 'small';

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    className?: string;
    size?: TextareaSize;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, className = '', size = 'medium', ...props }, ref) => {
        const id = useId();
        return (
            <Field>
                {label && (
                    <label
                        htmlFor={id}
                        className="block mb-1 text-sm font-medium text-gray-700"
                    >
                        {label}
                    </label>
                )}
                <textarea
                    id={id}
                    ref={ref}
                    className={`common-textarea common-textarea--${size} ${error ? 'border-red-500' : 'border-gray-200'} ${className}`.trim()}
                    {...props}
                />
                {error && (
                    <div className="mt-1 text-xs text-red-500">{error}</div>
                )}
            </Field>
        );
    },
);

Textarea.displayName = 'Textarea';

export default Textarea;
