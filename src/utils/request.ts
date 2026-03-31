import axios, {
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
    type InternalAxiosRequestConfig,
    type AxiosError,
} from 'axios';

// 接口返回数据的通用格式
interface ResponseData<T = any> {
    code: number;
    data: T;
    message: string;
}

// 创建一个简单的消息提示函数
const showErrorMessage = (message: string) => {
    // 可以根据项目需求自定义错误提示方式
    console.error(message);
};

// 创建axios实例
const request: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api', // 设置baseURL
    timeout: 10000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // 允许跨域请求携带 cookie
});

// 请求拦截器
request.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error: Error) => {
        return Promise.reject(error);
    },
);

// 响应拦截器
request.interceptors.response.use(
    (response: AxiosResponse<ResponseData>) => {
        // 保存 token，兼容 Capacitor / 移动端等 Cookie 无法正常使用的场景
        const token = response.headers['x-token'];
        if (token) {
            localStorage.setItem('token', token);
        }

        const res = response.data;

        if (res.code !== 200) {
            showErrorMessage(res.message || '请求失败');
            return Promise.reject(new Error(res.message || '请求失败'));
        }

        console.log(res.data);

        return res.data;
    },
    (error: AxiosError<ResponseData>) => {
        if (error.status === 401) {
            window.location.href = '/login';
        } else if (error.response?.data) {
            showErrorMessage(error.response.data.message || '请求失败');
        } else if (error.request) {
            // 请求已发出但没有收到响应
            showErrorMessage('网络异常，请检查网络连接');
        } else {
            // 请求配置发生的错误
            showErrorMessage('请求失败，请稍后重试');
        }
        return Promise.reject(error);
    },
);

// 封装GET请求
export function get<T = any>(url: string, params?: any, config?: AxiosRequestConfig) {
    return request.get<any, T>(url, { params, ...config });
}

// 封装POST请求
export function post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return request.post<any, T>(url, data, config);
}

// 封装PUT请求
export function put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return request.put<any, T>(url, data, config);
}

// 封装DELETE请求
export function del<T = any>(url: string, config?: AxiosRequestConfig) {
    return request.delete<any, T>(url, config);
}

// 导出request实例
export default request;
