import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastState {
    message: string;
    type: ToastType;
    visible: boolean;
    showToast: (message: string, type?: ToastType, duration?: number) => void;
    hideToast: () => void;
}

const useToastStore = create<ToastState>((set) => ({
    message: '',
    type: 'info',
    visible: false,
    showToast: (message, type = 'info', duration = 3000) => {
        set({ message, type, visible: true });
        setTimeout(() => {
            set({ visible: false });
        }, duration);
    },
    hideToast: () => set({ visible: false }),
}));

export default useToastStore;
