import api from "./api.js";

export async function getAccounts() {
    const response = await api.get("/accounts");
    return response.data;
}

export async function getAccountById(accountNumber) {
    const response = await api.get(`/accounts/${accountNumber}`);
    return response.data;
}

export async function getAccountTransactions(accountNumber) {
    const response = await api.get(`/transactions?account_number=${accountNumber}`);
    return response.data;
}

export async function createAccount(data) {
    const response = await api.post("/accounts", data);
    return response.data;
}

export async function updateAccountName(accountNumber, name) {
    const response = await api.patch(`/accounts/${accountNumber}/name`, { name });
    return response.data;
}

export async function updateAccountLimits(accountNumber, limits) {
    const response = await api.patch(`/accounts/${accountNumber}/limit`, limits);
    return response.data;
}