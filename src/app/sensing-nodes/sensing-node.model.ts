import { LatLngBoundsExpression } from 'leaflet';
import { environment } from 'src/environments/environment';

export class SensingNode {
    id: number;
    sensingNodeType: SensingNodeType;
    status: Status;
    latitude: number;
    longitude: number;
    battery: number;
    availability: boolean;
}

export enum SensingNodeType {
    MAGNETOMETER = 'MAGNETOMETER',
    POLLUTION = 'POLLUTION'
}

export enum Status {
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}

export class SensingNodesStats {
    magnetometerNum: number;
    pollutionNum: number;
    magnetometerActiveNum: number;
    pollutionActiveNum: number;
}

export const SENSING_NODE_API_URL = `${environment.baseUrl}/services/sensingnode/api`;

export const SENSING_NODES_ENDPOINT = `${SENSING_NODE_API_URL}/sensing-nodes`;

export const DEFAULT_LATITUDE = 31.9014;
export const DEFAULT_LONGITUDE = 35.1999;
export const DEFAULT_BOUNDS: LatLngBoundsExpression = [[33.291527, 34.217670], [29.481688, 35.578352]];