export const API_URL = "http://localhost:8080";

export function GET_TRANSFERENCIAS(idConta, dataInicio, dataFim, nomeOperador) {

    return {
        url: API_URL + `/transferencias?` +
        (idConta ? `idConta=${idConta}&` : '') +
        (dataInicio ? `dataInicio=${dataInicio}&` : '') +
        (dataFim ? `dataFim=${dataFim}&`: '') +
        (nomeOperador ? `nomeOperador=${nomeOperador}&`: ''),

        options: {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
        }
    }
}

export function GET_SALDOS(idConta, dataInicio, dataFim, nomeOperador) {

    return {
        url: API_URL + `/transferencias/saldos?` +
        (idConta ? `idConta=${idConta}&` : '') +
        (dataInicio ? `dataInicio=${dataInicio}&` : '') +
        (dataFim ? `dataFim=${dataFim}&`: '') +
        (nomeOperador ? `nomeOperador=${nomeOperador}&`: ''),

        options: {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
        }
    }
}

export function GET_PAGINAS(url, page, size){
    return {
        url: url + (page ? `page=${page}&` : '') +
        (size ? `size=${size}` : ''),
        options: {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
        }
    }
}

export function POST_AUTHENTICATE(body){
    return {
        url: API_URL + "/authenticate",
        options: {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        },
    }
}