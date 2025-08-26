import React, { useEffect, useRef, useImperativeHandle } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';
import type { AMap as AMapType } from '@amap/amap-jsapi-types';
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
    mapConfig?: AMapType.MapOptions;
    onMarkerClick?: (marker: Marker) => void;
    autoCompleteOptions?: AMapType.AutoCompleteOptions;
    controlBar?: boolean;
    toolBar?: boolean;
    onSelectLocation?: (location: AMapType.AutoCompleteResult['poi']) => void;
}

export interface MapRef {
    getMap: () => any | null;
    setCenter: (center: [number, number]) => void;
    addMarker: (marker: Marker) => void;
    clearMarkers: () => void;
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

const defaultMapConfig = {
    features: ['bg', 'road', 'building', 'point'],
    viewMode: '3D',
    rotateEnable: true,
    pitchEnable: true,
    zoom: 15,
    zooms: [2, 20],
    pitch: 90,
    backgroundColor: '#E6EEDE',
};

const Map = React.forwardRef<MapRef, MapProps>(
    (
        {
            id = 'amap-container',
            width = '100%',
            height = '400px',
            center = DEFAULT_CENTER,
            zoom = DEFAULT_ZOOM,
            markers = [],
            mapStyle = {},
            mapConfig = {},
            onMarkerClick,
            autoCompleteOptions,
            controlBar = true,
            toolBar = true,
            onSelectLocation,
        },
        ref,
    ) => {
        const mapRef = useRef<HTMLDivElement>(null);
        const mapInstance = useRef<any>(null);
        const markersRef = useRef<any[]>([]);

        useImperativeHandle(
            ref,
            () => ({
                getMap: () => mapInstance.current,
                setCenter: (nextCenter: [number, number]) => {
                    mapInstance.current?.setCenter(nextCenter);
                },
                addMarker: (marker: Marker) => {
                    if (!mapInstance.current) return;
                    const AMap = (window as any).AMap;
                    if (!AMap) return;
                    handleAddMark(marker);
                },
                clearMarkers: () => {
                    markersRef.current.forEach((m) => m.setMap(null));
                    markersRef.current = [];
                },
            }),
            [onMarkerClick],
        );

        const addControlBar = () => {
            if (!controlBar) return;
            const controlBarInstance = new AMap.ControlBar({
                position: {
                    right: '10px',
                    top: '10px',
                },
            });
            controlBarInstance.addTo(mapInstance.current);
        };

        const addToolBar = () => {
            if (!toolBar) return;
            const toolBarInstance = new AMap.ToolBar({
                position: {
                    right: '40px',
                    top: '110px',
                },
            });
            toolBarInstance.addTo(mapInstance.current);
        };

        const handleAddMark = (marker: Marker) => {
            const iconSize = marker.iconSize || [25, 34];
            let markerConfig: any = {
                position: marker.position,
                title: marker.title,
            };
            markerConfig.icon = new AMap.Icon({
                size: new AMap.Size(iconSize[0], iconSize[1]),
                image: marker.icon || 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
                imageSize: new AMap.Size(iconSize[0], iconSize[1]),
            });

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
                infoWindow.open(mapInstance.current, marker.position);
                if (onMarkerClick) {
                    onMarkerClick(marker);
                }
            });

            markerInstance.setMap(mapInstance.current);
            markersRef.current.push(markerInstance);
        };

        const addAutoComplete = () => {
            if (!autoCompleteOptions) return;
            try {
                const autoComplete = new AMap.AutoComplete({
                    input: autoCompleteOptions.input,
                    city: autoCompleteOptions.city || '全国',
                    citylimit: autoCompleteOptions.citylimit || false,
                    type: '商务写字楼|商务住宅|楼宇|门牌号|道路|地名|地址', // 指定搜索类型
                });

                // 监听选择事件
                autoComplete.on('select', (result: AMapType.AutoCompleteResult) => {
                    if (result.poi && result.poi.location) {
                        mapInstance.current.setCenter([
                            result.poi.location.lng,
                            result.poi.location.lat,
                        ]);
                        mapInstance.current.setZoom(15);
                        handleAddMark({
                            position: [result.poi.location.lng, result.poi.location.lat],
                            title: result.poi.name,
                            id: result.poi.id,
                        });
                        onSelectLocation?.(result.poi);
                    }
                });

                autoComplete.on('error', (error: any) => {
                    console.error('自动完成搜索错误:', error);
                });
            } catch (error) {
                console.error('自动完成功能初始化失败:', error);
            }
        };

        useEffect(() => {
            window._AMapSecurityConfig = {
                securityJsCode: '3a9b17994db048001d57dc1253d34472',
            };
            AMapLoader.load({
                key: 'fe7a1e66992f3e13ce9ae239887fcef5',
                version: '2.0',
                plugins: [
                    'AMap.Marker',
                    'AMap.InfoWindow',
                    'AMap.ControlBar',
                    'AMap.ToolBar',
                    'AMap.PlaceSearch',
                    'AMap.AutoComplete',
                ],
            })
                .then((AMap) => {
                    if (mapRef.current) {
                        const config: AMapType.MapOptions = {
                            center,
                            ...defaultMapConfig,
                            ...mapConfig,
                        };

                        const map = new AMap.Map(mapRef.current, config);
                        mapInstance.current = map;

                        addControlBar();
                        addToolBar();

                        markers.forEach((marker) => {
                            handleAddMark(marker);
                        });
                        addAutoComplete();
                    }
                })
                .catch((e) => {
                    console.error('高德地图加载失败', e);
                });

            return () => {
                if (mapInstance.current) {
                    markersRef.current.forEach((marker) => {
                        marker.setMap(null);
                    });
                    markersRef.current = [];
                    mapInstance.current.destroy();
                    mapInstance.current = null;
                }
            };
        }, [center, zoom, markers, mapStyle, onMarkerClick]);

        return (
            <div
                id={id}
                ref={mapRef}
                style={{ width, height }}
            />
        );
    },
);

export default Map;
