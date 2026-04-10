import React from 'react';
import { Transition } from '@headlessui/react';
import {
    CheckCircleIcon,
    ExclamationCircleIcon,
    InformationCircleIcon,
    XCircleIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import useToastStore from '@/store/toast';

const Toast: React.FC = () => {
    const { message, type, visible, hideToast } = useToastStore();

    const icons = {
        success: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
        error: <XCircleIcon className="h-6 w-6 text-red-500" />,
        info: <InformationCircleIcon className="h-6 w-6 text-blue-500" />,
        warning: <ExclamationCircleIcon className="h-6 w-6 text-yellow-500" />,
    };

    const bgColors = {
        success: 'bg-green-50 border-green-200',
        error: 'bg-red-50 border-red-200',
        info: 'bg-blue-50 border-blue-200',
        warning: 'bg-yellow-50 border-yellow-200',
    };

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] min-w-[300px] max-w-md">
            <Transition
                show={visible}
                enter="transition ease-out duration-300 transform"
                enterFrom="opacity-0 -translate-y-4"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-200 transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-4"
            >
                <div className={`flex items-center p-4 rounded-lg border shadow-lg ${bgColors[type]}`}>
                    <div className="flex-shrink-0">{icons[type]}</div>
                    <div className="ml-3 mr-8">
                        <p className="text-sm font-medium text-gray-900">{message}</p>
                    </div>
                    <button
                        onClick={hideToast}
                        className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 text-gray-400 hover:text-gray-900 focus:outline-none transition-colors"
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </div>
            </Transition>
        </div>
    );
};

export default Toast;
