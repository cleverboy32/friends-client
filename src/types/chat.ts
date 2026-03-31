export interface ChatUser {
    id: number;
    name: string;
    avatar: string | null;
}

export interface Message {
    id: number;
    chatId: string;
    fromId: number;
    toId: number;
    content: string;
    createdAt: string;
    fromUser?: ChatUser;
    toUser?: ChatUser;
}

export interface Chat {
    chatUser: ChatUser;
    unRead: number;
    chatId: string;
}

export interface ChatMessagePayload {
    chatId: string;
    fromId: number;
    toId: number;
    page: number;
    pageSize: number;
}
