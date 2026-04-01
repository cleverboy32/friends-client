import React, { useEffect, useRef, useImperativeHandle, useCallback, memo } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';
import type { AutoCompleteOptions, AutoCompletePoi, AutoCompleteResult } from '@/types/map';

export interface Marker {
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
    mapConfig?: AMap.MapOptions;
    onMarkerClick?: (marker: Marker) => void;
    autoCompleteOptions?: AutoCompleteOptions;
    controlBar?: boolean;
    toolBar?: boolean;
    onSelectLocation?: (location: AutoCompletePoi) => void;
    className?: string;
}

export interface MapRef {
    getMap: () => AMap.Map | null;
    setCenter: (center: [number, number]) => void;
    addMarker: (marker: Marker) => void;
    clearMarkers: () => void;
}

const DEFAULT_CENTER: [number, number] = [116.397428, 39.90923]; // 北京天安门
const DEFAULT_ZOOM = 11;



const defaultMapConfig: AMap.MapOptions = {
    features: ['bg', 'road', 'building', 'point'],
    viewMode: '3D',
    rotateEnable: true,
    pitchEnable: true,
    zoom: 15,
    zooms: [2, 20],
    pitch: 90,
    backgroundColor: '#E6EEDE',
};

const Map = memo(
    React.forwardRef<MapRef, MapProps>(
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
                className = '',
            },
            ref,
        ) => {
            const mapRef = useRef<HTMLDivElement>(null);
            const mapInstance = useRef<AMap.Map | null>(null);
            const markersRef = useRef<AMap.Marker[]>([]);

            // 使用 useCallback 包装 handleAddMark 函数，避免每次渲染都创建新函数
            const handleAddMark = useCallback(
                (marker: Marker, AMap: typeof window.AMap) => {
                    if (!mapInstance.current) return;

                    const iconSize = marker.iconSize || [25, 34];
                    const markerConfig: AMap.MarkerOptions = {
                        position: marker.position,
                        title: marker.title,
                    };

                    try {
                        markerConfig.icon = new AMap.Icon({
                            size: new AMap.Size(iconSize[0], iconSize[1]),
                            image:
                                marker.icon ||
                                'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
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
                            mapInstance.current &&
                            infoWindow.open(mapInstance.current, marker.position);
                            if (onMarkerClick) {
                                onMarkerClick(marker);
                            }
                        });

                        markerInstance.setMap(mapInstance.current);
                        markersRef.current.push(markerInstance);
                    } catch (error) {
                        console.error('添加标记点失败:', error);
                    }
                },
                [onMarkerClick],
            );

            useImperativeHandle(
                ref,
                () => ({
                    getMap: () => mapInstance.current,
                    setCenter: (nextCenter: [number, number]) => {
                        mapInstance.current?.setCenter(nextCenter);
                    },
                    addMarker: (marker: Marker) => {
                        if (!mapInstance.current) return;
                        const AMap: typeof window.AMap = window.AMap;
                        if (!AMap) return;
                        handleAddMark(marker, AMap);
                    },
                    clearMarkers: () => {
                        markersRef.current.forEach((m) => m.setMap(null));
                        markersRef.current = [];
                    },
                }),
                [handleAddMark],
            );




            useEffect(() => {
                window._AMapSecurityConfig = {
                    securityJsCode: '3c2f9662fa4d401b7d05beeba9c8bd81',
                };
                AMapLoader.load({
                    key: 'd593dbd68c6bc68ce3d98a560adb0873',
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
                            const config: AMap.MapOptions = {
                                center,
                                ...defaultMapConfig,
                                ...mapConfig,
                                mapStyle: mapStyle.mapStyle,
                            };

                            const map = new AMap.Map(mapRef.current, config);
                            mapInstance.current = map;

                            const addControlBar = () => {
                                if (!controlBar) return;
                                const controlBarInstance = new AMap.ControlBar({
                                    position: { right: '10px', top: '10px' },
                                });
                                controlBarInstance.addTo(mapInstance.current);
                            };

                            const addToolBar = () => {
                                if (!toolBar) return;
                                const toolBarInstance = new AMap.ToolBar({
                                    position: { right: '40px', top: '110px' },
                                });
                                toolBarInstance.addTo(mapInstance.current);
                            };

                            const addAutoComplete = () => {
                                if (!autoCompleteOptions) return;
                                try {
                                    const autoComplete = new AMap.AutoComplete({
                                        input: autoCompleteOptions.input,
                                        city: autoCompleteOptions.city || '全国',
                                        citylimit: autoCompleteOptions.citylimit || false,
                                    });

                                    autoComplete.on('select', (result: AutoCompleteResult) => {
                                        if (result.poi && result.poi.location) {
                                            const selectedCenter: [number, number] = [result.poi.location.lng, result.poi.location.lat];
                                            setTimeout(() => {
                                                try {
                                                    markersRef.current.forEach((marker) => marker.setMap(null));
                                                    markersRef.current = [];
                                                    handleAddMark({ position: [result.poi.location.lng, result.poi.location.lat], title: result.poi.name, id: String(result.poi.id) }, AMap);
                                                    mapInstance.current?.setCenter(selectedCenter);
                                                    mapInstance.current?.setZoom(15);
                                                } catch (error) {
                                                    console.error('地图操作执行失败:', error);
                                                }
                                            }, 100);
                                            onSelectLocation?.(result.poi);
                                        } else {
                                            const placeSearch = new AMap.PlaceSearch({ map: mapInstance.current });
                                            placeSearch.setCity(result.poi.adcode);
                                            placeSearch.search(result.poi.name);
                                            placeSearch.on('complete', (e: any) => {
                                                if (e.info !== 'OK') return;
                                                const poi = e.poiList.pois[0];
                                                setTimeout(() => {
                                                    mapInstance.current?.setCenter([poi.location.lng, poi.location.lat]);
                                                    handleAddMark({ position: [poi.location.lng, poi.location.lat], title: poi.name, id: String(poi.id) }, AMap);
                                                }, 100);
                                                onSelectLocation?.(poi as AutoCompletePoi);
                                            });
                                        }
                                    });
                                    autoComplete.on('error', (error: AMap.Event) => {
                                        console.error('自动完成搜索错误:', error);
                                    });
                                } catch (error) {
                                    console.error('自动完成功能初始化失败:', error);
                                }
                            };

                            addControlBar();
                            addToolBar();
                            markers.forEach((marker) => handleAddMark(marker, AMap));
                            addAutoComplete();
                        }
                    })
                    .catch((e: Error) => {
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
            }, [center, zoom, markers, mapStyle, controlBar, toolBar, autoCompleteOptions, onSelectLocation, handleAddMark, mapConfig]);

            return (
                <div
                    id={id}
                    ref={mapRef}
                    style={{ width, height }}
                    className={className}
                />
            );
        },
    ),
);

export default Map;

