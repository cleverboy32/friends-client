// 扩展 window 对象的类型定义

interface Window {
    amapInstance?: any;
    _AMapSecurityConfig?: {
        securityJsCode: string;
    };
}

declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
}
