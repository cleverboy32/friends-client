import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';

interface ModalProps {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}

const Modal = ({ visible, onClose, children, className }: ModalProps) => {
    return (
        <Dialog
            open={visible}
            as="div"
            className="relative z-1000"
            onClose={close}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div
                    id="mask"
                    className="absolute inset-0 bg-black/50"
                />
                <div className="flex h-full items-center justify-center w-full relative">
                    <DialogPanel
                        transition
                        className={`w-[70vw] p-[16px] bg-white rounded-lg ${className}`}>
                        {children}
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default Modal;
