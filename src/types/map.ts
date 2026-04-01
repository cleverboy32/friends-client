export interface AutoCompleteOptions {
    input: string | HTMLElement;
    city?: string;
    citylimit?: boolean;
    type?: string;
    datatype?: string;
}

export interface AutoCompleteResult {
    poi: AutoCompletePoi;
    status: string;
    info: string;
    count: number;
}

export interface AutoCompletePoi {
    id: number;
    name: string;
    type: string;
    typecode: string;
    address: string;
    location: AutoCompleteLocation;
    adcode: string;
    adname: string;
    citycode: string;
    city: string;
    district: string;
    provincecode: string;
    provincename: string;
}

export interface AutoCompleteLocation {
    lng: number;
    lat: number;
}

export interface PlaceSearchOptions {
    map?: AMap.Map;
    city?: string;
}

export interface PlaceSearchPoiList {
    pois: PlaceSearchPoi[];
    count: number;
}

export interface PlaceSearchPoi {
    id: string;
    name: string;
    location: AutoCompleteLocation;
    address: string;
}

export interface PlaceSearchResult {
    info: string;
    poiList: PlaceSearchPoiList;
}
