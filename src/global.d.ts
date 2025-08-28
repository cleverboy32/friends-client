import '@amap/amap-jsapi-types';

declare global {
    interface Window {
        AMap: typeof AMap;
        _AMapSecurityConfig: {
            securityJsCode: string;
        };
    }
}

declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
}

export {};
