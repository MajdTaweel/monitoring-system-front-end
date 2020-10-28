export class SensingNode {
    constructor(
        public id: number,
        public sensingNodeType: string,
        public status: string,
        public latitude: number,
        public longitude: number,
        public battery: number,
    ) { }
}