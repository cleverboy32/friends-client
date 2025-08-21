import React, { useEffect, useRef } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';
import '@amap/amap-jsapi-types';

interface Marker {
    id: string;
    position: [number, number]; // [lng, lat]
    title: string;
    content?: string;
    icon?: string; // 自定义图标URL
    iconSize?: [number, number]; // 图标大小 [width, height]
}

interface MapStyle {
    mapStyle?: string; // 地图样式，可以是内置样式或自定义样式URL
    backgroundColor?: string; // 地图背景色
    features?: string[]; // 显示的地图要素
}

interface MapProps {
    id?: string;
    width?: string;
    height?: string;
    center?: [number, number]; // [lng, lat]
    zoom?: number;
    markers?: Marker[];
    mapStyle?: MapStyle;
    onMarkerClick?: (marker: Marker) => void;
}

const DEFAULT_CENTER: [number, number] = [116.397428, 39.90923]; // 北京天安门
const DEFAULT_ZOOM = 11;

// 内置地图样式
export const MAP_STYLES = {
    NORMAL: 'amap://styles/normal', // 标准样式
    DARK: 'amap://styles/dark', // 深色样式
    LIGHT: 'amap://styles/light', // 浅色样式
    WHITESMOKE: 'amap://styles/whitesmoke', // 白烟样式
    FRESH: 'amap://styles/fresh', // 清新样式
    GREY: 'amap://styles/grey', // 灰色样式
    GRAFFITI: 'amap://styles/graffiti', // 涂鸦样式
    MACARON: 'amap://styles/macaron', // 马卡龙样式
    BLUEBERRY: 'amap://styles/blueberry', // 蓝莓样式
    MIDNIGHT: 'amap://styles/midnight', // 午夜样式
    PINK: 'amap://styles/pink', // 粉色样式
    DAWN: 'amap://styles/dawn', // 黎明样式
    SUNSET: 'amap://styles/sunset', // 日落样式
    WARM: 'amap://styles/warm', // 温暖样式
};

const Map: React.FC<MapProps> = ({
    id = 'amap-container',
    width = '100%',
    height = '400px',
    center = DEFAULT_CENTER,
    zoom = DEFAULT_ZOOM,
    markers = [],
    mapStyle = {},
    onMarkerClick,
}) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<any>(null);
    const markersRef = useRef<any[]>([]);

    useEffect(() => {
        // window._AMapSecurityConfig = {
        //   securityJsCode: "「你申请的安全密钥」",
        // };

        let map: any;
        AMapLoader.load({
            key: 'c722ac8175eb8dcd045aa2a821c3e203',
            version: '2.0',
            plugins: [
                'AMap.Marker',
                'AMap.InfoWindow',
                'AMap.ControlBar',
                'AMap.ToolBar',
            ],
        })
            .then((AMap) => {
                if (mapRef.current) {
                    // 构建地图配置
                    const mapConfig: AMap.MapOptions = {
                        center,
                        features: ['bg', 'road', 'building', 'point'],
                        viewMode: '3D',
                        rotateEnable: true,
                        pitchEnable: true,
                        zoom: 15,
                        zooms: [2, 20],
                        pitch: 90,
                        backgroundColor: '#E6EEDE',
                    };

                    map = new AMap.Map(mapRef.current, mapConfig);

                    const controlBar = new AMap.ControlBar({
                        position: {
                            right: '10px',
                            top: '10px',
                        },
                    });
                    controlBar.addTo(map);

                    const toolBar = new AMap.ToolBar({
                        position: {
                            right: '40px',
                            top: '110px',
                        },
                    });
                    toolBar.addTo(map);
                    mapInstance.current = map;

                    // 添加标记点
                    markers.forEach((marker) => {
                        let markerConfig: any = {
                            position: marker.position,
                            title: marker.title,
                        };

                        // 自定义标记点图标
                        if (marker.icon) {
                            const iconSize = marker.iconSize || [25, 34];
                            markerConfig.icon = new AMap.Icon({
                                size: new AMap.Size(iconSize[0], iconSize[1]),
                                image: marker.icon,
                                imageSize: new AMap.Size(
                                    iconSize[0],
                                    iconSize[1],
                                ),
                            });
                        } else {
                            // 默认图标
                            markerConfig.icon = new AMap.Icon({
                                size: new AMap.Size(25, 34),
                                image: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
                                imageSize: new AMap.Size(25, 34),
                            });
                        }

                        const markerInstance = new AMap.Marker(markerConfig);

                        // 创建信息窗口
                        const infoWindow = new AMap.InfoWindow({
                            content: `
                <div style="padding: 10px; max-width: 200px;">
                  <h4 style="margin: 0 0 5px 0; font-size: 14px; color: #333;">${marker.title}</h4>
                  ${marker.content ? `<p style="margin: 0; font-size: 12px; color: #666;">${marker.content}</p>` : ''}
                </div>
              `,
                            offset: new AMap.Pixel(0, -30),
                        });

                        // 点击标记点显示信息窗口
                        markerInstance.on('click', () => {
                            infoWindow.open(map, marker.position);
                            if (onMarkerClick) {
                                onMarkerClick(marker);
                            }
                        });

                        markerInstance.setMap(map);
                        markersRef.current.push(markerInstance);
                    });
                }
            })
            .catch((e) => {
                console.error('高德地图加载失败', e);
            });
        return () => {
            if (mapInstance.current) {
                // 清除所有标记点
                markersRef.current.forEach((marker) => {
                    marker.setMap(null);
                });
                markersRef.current = [];

                mapInstance.current.destroy();
                mapInstance.current = null;
            }
        };
    }, [center, zoom, markers, mapStyle, onMarkerClick]);

    return <div id={id} ref={mapRef} style={{ width, height }} />;
};

export default Map;
