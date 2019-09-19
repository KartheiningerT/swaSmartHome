export interface IData {
    dates: ConsumptionDate[];
}

interface ConsumptionDate {
    date: string;
    consumptions: Consumption[];
}

interface Consumption {
     time: string;
     watt: number;
}
