import { post } from '@/utils/request';
import type {
    Activity,
    CreateActivityParams,
    UpdateActivityParams,
    ActivityQueryParams,
} from '@/types/activity';

// 创建活动
export const createActivity = (data: CreateActivityParams) => {
    return post<Activity>('/activity/post', data);
};

// 获取活动列表
export const getActivityList = (params: ActivityQueryParams = {}) => {
    return post<{
        items: Activity[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    }>('/activity/list', params);
};

// 获取活动详情
export const getActivityDetail = (activityId: number | string) => {
    return post<Activity>(`/activity/detail`, { id: String(activityId) });
};

// 更新活动信息
export const updateActivity = (activityId: number | string, data: UpdateActivityParams) => {
    const { ...restData } = data;
    return post<Activity>(`/activity/update`, {  ...restData, id: String(activityId) });
};

// 删除活动
export const deleteActivity = (activityId: number | string) => {
    return post<null>(`/activity/delete`, { id: String(activityId) });
};

// 获取我创建的活动
export const getMyCreatedActivities = (params: ActivityQueryParams = {}) => {
    return post<{
        items: Activity[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    }>('/activity/list', { ...params, authorId: localStorage.getItem('userId') }); // Fallback if server doesn't have specific route
};

// 获取我参加的活动 (目前 server 未实现专门的接口，留存或等后续实现)
export const getMyJoinedActivities = (params: ActivityQueryParams = {}) => {
    return post<{
        items: Activity[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    }>('/activity/list', params); // 需要 server 支持查已加入
};
