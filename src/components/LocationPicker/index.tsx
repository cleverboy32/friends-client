import React, { useRef } from 'react';
import type { Location } from '@/types/activity';
import type { AMap as AMapType } from '@amap/amap-jsapi-types';
import Input from '../Input';
import Modal from '../Modal';
import Map, { type MapRef } from '../Map';

interface LocationPickerProps {
    visible: boolean;
    value?: Location | null;
    onChange?: (location: Location) => void;
    onClose: () => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ value, onChange, onClose, visible }) => {
    const mapRef = useRef<MapRef>(null);

    const handleSelectLocation = (location: AMapType.AutoCompleteResult['poi']) => {
        onChange?.({
            id: location.id,
            latitude: location.location.lat,
            longitude: location.location.lng,
            address: location.address,
            city: location.city,
        });
    };

    return (
        <Modal
            className="h-[500px]"
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
            </div>
        </Modal>
    );
};

export default LocationPicker;
