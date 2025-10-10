import React from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline';

interface Option {
    label: string;
    value: string | number;
}

interface SelectProps {
    label?: string;
    value?: string;
    options: Option[];
    onChange: (value: string) => void;
    className?: string;
}

const DZSelect: React.FC<SelectProps> = ({ label, value, options, onChange, className = '' }) => {
    const selectedOption = options.find((option) => option.value === value);

    return (
        <div className={`relative ${className}`}>
            <Listbox
                value={value}
                onChange={onChange}>
                <ListboxButton className="relative w-full px-4 py-2 !pr-[100px]  text-left !bg-white rounded-sm shadow-sm outline-none">
                    <span className="block truncate">
                        {label ? `${label}:` : ''} {selectedOption?.label || '请选择'}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <ChevronDownIcon className="w-5 h-5 text-primary ui-open:rotate-180 transition-transform" />
                    </span>
                </ListboxButton>

                <ListboxOptions className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 outline-none ">
                    {options.map((option, optionIdx) => (
                        <ListboxOption
                            key={optionIdx}
                            value={option.value}
                            className={({ active, selected }) =>
                                `relative cursor-default select-none py-2 pl-3 pr-9 ${
                                    active ? 'bg-light-primary' : 'text-gray-900'
                                } ${selected ? 'font-semibold' : 'font-normal'}`
                            }>
                            {({ selected }) => (
                                <>
                                    <span
                                        className={`block truncate ${selected ? 'font-semibold text-primary' : 'font-normal'}`}>
                                        {option.label}
                                    </span>
                                    {selected && (
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary ">
                                            <CheckIcon className="w-5 h-5" />
                                        </span>
                                    )}
                                </>
                            )}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Listbox>
        </div>
    );
};

export default DZSelect;
