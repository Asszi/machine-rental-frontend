export interface Rental {
    id: number;
    companyId: number;
    machineId: number;
    rentalStart: string;
    rentalEnd?: string;
}
