import operacionesService from "./operacionesService";
import responses from "./responses";
import type { dataInterface } from "./interfaces";

export default (
    data: dataInterface[],
    estado: number,
    operacion: number,
    conjuntoA: string = "",
    conjuntoB: string = ""
): string => {
    const arrayConjuntoA = conjuntoA.split(",").map((item) => item.trim());
    const arrayConjuntoB = conjuntoB.split(",").map((item) => item.trim());
    const operacionKey = data[estado].operaciones[
        operacion
    ] as keyof typeof operacionesService;
    const rawResponse = operacionesService[operacionKey](
        arrayConjuntoA,
        arrayConjuntoB
    );

    const response = responses(rawResponse.message, rawResponse.response);
    return response;
};
