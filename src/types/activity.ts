export interface Activity {
    id: number;
    title: string;
    description: string;
    location: string;
    startTime: string;
    endTime: string;
    maxParticipants: number;
    currentParticipants: number;
    type: string;
    status: 'pending' | 'ongoing' | 'completed' | 'cancelled';
    creatorId: number;
    creator: {
        id: number;
        username: string;
        avatar?: string;
    };
    images: string[];
    allowCoShooting: boolean;
    allowTextCopy: boolean;
    visibility: 'public' | 'private';
    publishTime?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateActivityParams {
    title: string;
    description: string;
    location?: string;
    startTime?: string;
    endTime?: string;
    maxParticipants?: number;
    type: string;
    images: string[];
    allowCoShooting: boolean;
    allowTextCopy: boolean;
    visibility: 'public' | 'private';
    publishTime?: string;
}

export interface UpdateActivityParams extends Partial<CreateActivityParams> {
    status?: 'pending' | 'ongoing' | 'completed' | 'cancelled';
}

export interface ActivityQueryParams {
    page?: number;
    pageSize?: number;
    type?: string;
    status?: 'pending' | 'ongoing' | 'completed' | 'cancelled';
    creatorId?: number;
}
