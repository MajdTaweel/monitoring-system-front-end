import { LatLngBoundsExpression } from 'leaflet';
import { environment } from 'src/environments/environment';

export class SensingNode {
    constructor(
        public id: number,
        public sensingNodeType: SensingNodeType,
        public status: Status,
        public latitude: number,
        public longitude: number,
        public battery: number,
        public availability: Availability,
    ) { }
}

export class MagnetometerReadings {
    constructor(
        public id: number,
        public x: number,
        public y: number,
        public z: number,
        public rms: number,
    ) { }
}

export class PollutionReadings {
    constructor(
        public id: number,
        public air: number,
        public sound: number,
    ) { }
}

export enum SensingNodeType {
    MAGNETOMETER = 'MAGNETOMETER',
    POLLUTION = 'POLLUTION'
}

export enum Status {
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}

export enum Availability {
    AVAILABLE = 'AVAILABLE',
    UNAVAILABLE = 'UNAVAILABLE'
}

export class SensingNodesStats {
    magnetometerNum: number;
    pollutionNum: number;
    magnetometerActiveNum: number;
    pollutionActiveNum: number;
}

const SENSING_NODE_API_URL = `${environment.baseUrl}/services/sensingnode/api`;

export const SENSING_NODES_ENDPOINT = `${SENSING_NODE_API_URL}/sensing-nodes`;

export const DEFAULT_LATITUDE = 31.9014;
export const DEFAULT_LONGITUDE = 35.1999;
export const DEFAULT_BOUNDS: LatLngBoundsExpression = [[33.291527, 34.217670], [29.481688, 35.578352]];