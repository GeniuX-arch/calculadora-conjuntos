import type { responseInterface } from "./interfaces";

const messageResponse = (message:string , conjunto: any[] = []): responseInterface => {
    const string = conjunto.join(", ");
    const response = string ===   "" ? "∅" : `{ ${string} }`;

    return {
        message: message,
        response: response,
    }
}

const pertenencia = (conjuntoA: any[] = [], conjuntoB: any[] = []): responseInterface =>  {
    const bandera = conjuntoA.every(elemento => conjuntoB.includes(elemento));
    const message = bandera ? "pertenencia": "no_pertenencia";
    const response = messageResponse (message);

    return response
};

const union = (conjuntoA: any[] = [], conjuntoB: any[] = []): responseInterface =>  {
    const array = conjuntoA.concat(conjuntoB).filter((item, index, self) => self.indexOf(item) ===  index);
    const response = messageResponse ('union', array);

    return response
};

export default {
    union: union,
    pertenencia: pertenencia,
}