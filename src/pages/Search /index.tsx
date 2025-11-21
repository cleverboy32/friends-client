import React, { useMemo } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Map, { MAP_STYLES } from '../../components/Map';
import Input from '@/components/Input';

const SearchPage = () => {
    const mapProps = useMemo(
        () => ({
            width: '100%',
            height: '100px',
            center: [116.397428, 39.90923],
            zoom: 12,
            controlBar: false,
            toolBar: false,
            mapConfig: {
                viewMode: '2D' as const,
                pitchEnable: false,
                rotateEnable: false,
            },
            mapStyle: {
                mapStyle: MAP_STYLES.LIGHT,
            },
            autoCompleteOptions: {
                city: '北京',
                input: 'discover-address-input',
            },
        }),
        [],
    );

    return (
        <div className="flex flex-col flex-1">
            <div className="bg-gray-50 flex-1">
                <div className="flex mb-[32px] relative">
                    <Map {...mapProps} />
                    <div className="absolute top-2 left-2">
                        <Input
                            type="text"
                            id="discover-address-input"
                            placeholder="请输入地点"
                            className="!w-[300px]   bg-white rounded-lg"
                        />
                        <MagnifyingGlassIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
