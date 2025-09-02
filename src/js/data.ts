export default [
    {
        nombre: "alfabetos",
        operaciones: [
            { label: "Pertenencia", value: "pertenencia" },
            { label: "Unión", value: "union" },
            { label: "Intersección", value: "interseccion" },
            { label: "Complemento", value: "complemento" },
            { label: "Diferencia Absoluta", value: "diferenciaAbsoluta" },
            { label: "Diferencia Simétrica", value: "diferenciaSimetrica" },
        ],
    },
    {
        nombre: "cadenas",
        operaciones: [
            { label: "Concatenación", value: "concatenacion" },
            { label: "Potenciación", value: "potenciacion" },
            { label: "Inversa", value: "inversa" },
        ],
    },
    {
        nombre: "lenguajes",
        operaciones: [
            { label: "Concatenación", value: "concatenacion" },
            { label: "Potencia", value: "potenciaLenguaje" },
            { label: "Unión", value: "union" },
            { label: "Intersección", value: "interseccion" },
            { label: "Resta", value: "resta" },
            { label: "Clausura de Kleene", value: "clausuraKleene" },
            { label: "Clausura Positiva", value: "clausuraPositiva" },
        ],
    },
];
