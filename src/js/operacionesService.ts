import type { responseInterface } from "./interfaces";

const messageResponse = (message:string , conjunto: any[] = [], flag: string = ''): responseInterface => {
    if (flag) {
        return {
            message: message,
            response: flag,
        }
    }
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

const interseccion = (conjuntoA: any[] = [], conjuntoB: any[] = []): responseInterface => {
    const array = conjuntoA.filter(item => conjuntoB.includes(item));
    console.log('interseccion');
    console.log(array);
    const response = messageResponse('union', array);

    return response;
};

const complemento = (universo: any[] = [], conjuntoA: any[] = []): responseInterface => {
    const array = universo.filter(item => !conjuntoA.includes(item));
    const response = messageResponse('complemento', array);

    return response;
};

const diferenciaAbsoluta = (conjuntoA: any[] = [], conjuntoB: any[] = []): responseInterface => {
    const array = conjuntoA.filter(item => !conjuntoB.includes(item));
    const response = messageResponse('diferencia absoluta', array);

    return response;
};

const diferenciaSimetrica = (conjuntoA: any[] = [], conjuntoB: any[] = []): responseInterface => {
    const array = [
        ...conjuntoA.filter(item => !conjuntoB.includes(item)),
        ...conjuntoB.filter(item => !conjuntoA.includes(item))
    ];
    const response = messageResponse('diferencia simetrica', array);

    return response;
};

const potenciacion = (conjuntoA: string[] = [], potencia: number[]): responseInterface => {
    const string = conjuntoA[0] || '';
    const numero = potencia[0] || 0;
    const repeat = string.repeat(numero);

    const response = messageResponse('potencia', [], repeat);

    return response;
};

const inversa = (conjuntoA: string[] = [], potencia: number[]): responseInterface => {
    const string = conjuntoA[0] || '';
    const reverse = string.split("").reverse().join("");

    const response = messageResponse('potencia', [], reverse);

    return response;
};

const concatenacion = (conjuntoA: any[] = [], conjuntoB: any[] = []): responseInterface =>  {
    const array = conjuntoA
        .concat(conjuntoB)
        // elimina duplicados
        .filter((item, index, self) => self.indexOf(item) === index);

    const response = messageResponse('concatenacion', array);

    return response;
};
function potenciaLenguajeService(lenguaje: string[], i: number): string[] {
  if (i === 0) return ["∅"]; // L^0 = {ε}
  if (i === 1) return lenguaje;

  let resultado: string[] = lenguaje;
  for (let k = 1; k < i; k++) {
    const nuevo: string[] = [];
    for (const palabra of resultado) {
      for (const simbolo of lenguaje) {
        nuevo.push(palabra + simbolo);
      }
    }
    resultado = nuevo;
  }
  return resultado;
}

const potenciaLenguaje = (lenguaje: string[], i: number): responseInterface =>  {
const resultado = potenciaLenguajeService(lenguaje, i);

const response = messageResponse('potencia', resultado);
  return response;
}
function resta(L1: string[], L2: string[]): responseInterface {
    const filtro = L1.filter(palabra => !L2.includes(palabra));
    const response = messageResponse('resta', filtro);
  return response;
}
const clausuraKleene = (lenguaje: string[], i: number): responseInterface =>  {
    const resultado = [];
    for (let k = 0; k <= 3; k++) {
        resultado.push(potenciaLenguajeService(lenguaje, k));
    }
    resultado.push("...");
    const response = messageResponse('potencia', resultado);
  return response;
}
const clausuraPositiva = (lenguaje: string[]): responseInterface =>  {
    const resultado = [];
    for (let k = 1; k <= 3; k++) {
        resultado.push(potenciaLenguajeService(lenguaje, k));
    }
    resultado.push("...");
    
    const response = messageResponse('potencia', resultado);
  return response;
}


export default {
    union: union,
    pertenencia: pertenencia,
    complemento: complemento,
    interseccion: interseccion,
    diferenciaAbsoluta: diferenciaAbsoluta,
    diferenciaSimetrica: diferenciaSimetrica,
    concatenacion: concatenacion,
    potenciacion: potenciacion,
    inversa: inversa,
    potenciaLenguaje: potenciaLenguaje,
    resta: resta,
    clausuraKleene: clausuraKleene,
    clausuraPositiva: clausuraPositiva
}