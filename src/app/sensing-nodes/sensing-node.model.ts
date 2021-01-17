import { LatLngBoundsExpression } from 'leaflet';
import { environment } from 'src/environments/environment';

export class SensingNode {
    id: number;
    sensingNodeType: SensingNodeType;
    status: Status;
    battery: number;
    availability: boolean;
    latitude?: number;
    longitude?: number;
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
export const DEFAULT_BOUNDS: LatLngBoundsExpression = [[32.398454, 35.070573], [31.832988, 35.504083]];
