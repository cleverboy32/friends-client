import React, { useRef } from 'react';
import type { Location } from '@/types/activity';
import type { AMap as AMapType } from '@amap/amap-jsapi-types';
import Input from '../Input';
import Modal from '../Modal';
import Map, { type MapRef } from '../Map';
import Button from '../button';

interface LocationPickerProps {
    visible: boolean;
    value?: Location | null;
    onChange?: (location: Location) => void;
    onClose: () => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ value, onChange, onClose, visible }) => {
    const mapRef = useRef<MapRef>(null);
    const poiRef = useRef<AMapType.AutoCompleteResult['poi'] | null>(null);

    const handleSelectLocation = (poi: AMapType.AutoCompleteResult['poi']) => {
        poiRef.current = poi;
    };

    const handleConfirm = () => {
        if (poiRef.current) {
            const poi = poiRef.current;
            onChange?.({
                id: poi.id,
                latitude: poi.location.lat,
                longitude: poi.location.lng,
                address: poi.address,
                city: poi.city,
                name: poi.name,
            });
        }
    };

    return (
        <Modal
            className="h-[600px] w-[60vw]"
            visible={visible}
            onClose={onClose}>
            <div className="flex flex-col h-full relative">
                <Map
                    ref={mapRef}
                    mapConfig={{
                        zoom: 13,
                        viewMode: '2D',
                    }}
                    autoCompleteOptions={{
                        input: 'search-location',
                    }}
                    height="100%"
                    controlBar={false}
                    toolBar={false}
                    onSelectLocation={handleSelectLocation}
                />
                <div className="flex-1 absolute left-10  top-10 mb-2 w-[500px]">
                    <Input
                        id="search-location"
                        type="text"
                        placeholder="输入地址"
                    />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white">
                    <Button
                        onClick={handleConfirm}
                        theme="theme"
                        className="w-full">
                        确定
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default LocationPicker;
