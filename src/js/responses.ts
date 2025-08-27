export default (key: string, response: string = ""): string => {
    const responses = {
        pertenencia: "El grupo A pertenece al grupo B",
        no_pertenencia: "El grupo A no pertenece al grupo B",
        union: "La unión de los grupos A y B es " + response,
    };
    const keyResponses = key as keyof typeof responses;
    return responses[keyResponses] || "";
};
