export interface dataInterface {
    nombre: string;
    operaciones: operacionesInterface[];
}
export interface operacionesInterface {
    label: string;
    value: string;
}
export interface responseInterface {
    message: string;
    response: string;
}