import api from "./api.js";

export async function getExchangeRates() {
    const response = await api.get("/exchange-rates");
    return response.data;
}

export async function performExchange(fromCurrency, toCurrency, amount) {
    const response = await api.post("/transactions/transfer", {
        from_currency: fromCurrency,
        to_currency: toCurrency,
        amount,
    });
    return response.data;
}

export async function getExchanges() {
    const response = await api.get("/exchanges");
    return response.data;
}

export async function updateExchangeStatus(exchangeId, isOpen) {
    const response = await api.put(`/exchanges/${exchangeId}`, { isOpen });
    return response.data;
}
