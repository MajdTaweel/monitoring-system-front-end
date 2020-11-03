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