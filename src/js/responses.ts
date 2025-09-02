export default (key: string, response: string = ""): string => {
    if (key === "pertenencia" && response === "no_pertenencia") {
        const responses = {
            pertenencia: "El grupo A pertenece al grupo B",
            no_pertenencia: "El grupo A no pertenece al grupo B",
        };
        const keyResponses = key as keyof typeof responses;
        return responses[keyResponses] || "";
    }
    return "La operación " + key + " de los grupos A y B es " + response;
};
