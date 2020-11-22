import { SENSING_NODE_API_URL } from '../sensing-nodes/sensing-node.model';

export class MagnetometerReadings {
    id: number;
    x: number;
    y: number;
    z: number;
    rms: number;
}

export class PollutionReadings {
    id: number;
    air: number;
    sound: number;
}

export const MAGNETOMETER_READINGS_ENDPOINT = `${SENSING_NODE_API_URL}/magnetometer-readings/by-sensing-node-id`;
export const POLLUTION_READINGS_ENDPOINT = `${SENSING_NODE_API_URL}/pollution-readings/by-sensing-node-id`;