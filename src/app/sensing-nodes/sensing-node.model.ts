export class SensingNode {
    constructor(
        private id: number,
        private sensingNodeType: string,
        private status: string,
        private latitude: number,
        private longitude: number,
        private battery: number,
    ) { }
}