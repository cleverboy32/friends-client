const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL;

let ws: WebSocket | null = null;
let messageHandlers: ((message: string) => void)[] = [];
let reconnectTimer: number | null = null;
const RECONNECT_INTERVAL = 5000; // 5秒后重连

async function connectWebSocket(): Promise<void> {
    if (ws && ws.readyState === WebSocket.OPEN) {
        console.log('WebSocket already connected.');
        return;
    }

    if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
    }

    console.log('Attempting to connect WebSocket...');

    const token = localStorage.getItem('x-token');
    // a simple trick to pass token without custom header
    const url = token ? `${WEBSOCKET_URL}?token=${token}` : WEBSOCKET_URL;
    ws = new WebSocket(url);

    ws.onopen = () => {
        console.log('WebSocket Opened');
    };

    ws.onmessage = (event) => {
        console.log('WebSocket Received:', event.data);
        messageHandlers.forEach((handler) => handler(event.data as string));
    };

    ws.onclose = (closeEvent) => {
        console.log('WebSocket Closed:', closeEvent);
        ws = null;
        scheduleReconnect();
    };

    ws.onerror = (error) => {
        console.error('WebSocket Error:', error);
        ws = null;
        // The onclose event will be called next, which will schedule a reconnect.
    };
}

function scheduleReconnect(): void {
    if (reconnectTimer) {
        return;
    }
    reconnectTimer = window.setTimeout(() => {
        console.log('Reconnecting WebSocket...');
        connectWebSocket();
    }, RECONNECT_INTERVAL);
}

export function sendMessage(message: string, successCallback?: () => void): void {
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(message);
        successCallback?.();
        console.log('WebSocket Sent:', message);
    } else {
        console.warn('WebSocket is not connected. Message not sent:', message);
        connectWebSocket(); // Attempt to reconnect
    }
}

export function onReceiveMessage(handler: (message: string) => void): () => void {
    messageHandlers.push(handler);
    return () => {
        messageHandlers = messageHandlers.filter((h) => h !== handler);
    };
}

// Expose the connect function to be called manually, e.g., after user login.
export { connectWebSocket };
