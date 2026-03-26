import api from "./api.js";

/**
 * Get all loans for the current user
 */
export async function getLoans(params = {}) {
  const response = await api.get("/loans", { params });
  return response.data;
}

/**
 * Get loan by ID
 */
export async function getLoanById(loanId) {
  const response = await api.get(`/loans/${loanId}`);
  return response.data;
}

/**
 * Submit a new loan request
 */
export async function createLoanRequest(data) {
  const response = await api.post("/loan-requests", {
    amount: data.amount,
    period: data.period,
    purpose: data.purpose || "",
  });
  return response.data;
}

/**
 * Get all loan requests (for admin)
 */
export async function getLoanRequests(params = {}) {
  const response = await api.get("/loan-requests", { params });
  return response.data;
}

/**
 * Approve a loan request (admin only)
 */
export async function approveLoanRequest(requestId) {
  const response = await api.patch(`/loan-requests/${requestId}/approve`);
  return response.data;
}

/**
 * Reject a loan request (admin only)
 */
export async function rejectLoanRequest(requestId) {
  const response = await api.patch(`/loan-requests/${requestId}/reject`);
  return response.data;
}
