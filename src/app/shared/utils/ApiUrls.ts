import { environment } from "src/environments/environment";

export const BASE_URL = environment.API_BASE_URL;
export const ALL_CLIENTS_URL = `${BASE_URL}/clients/all`;
export const SINGLE_CLIENT_URL = `${BASE_URL}/clients/`;
export const ALL_FACTURES_URL = `${BASE_URL}/factures/all`;
export const ALL_FACTURES_BY_CLIENT_URL = `${BASE_URL}/factures/client/`;
export const SINGLE_FACTURE_URL = `${BASE_URL}/factures/`;
export const LOGIN_URL = `${BASE_URL}/auth/authenticate`;
export const SEND_EMAIL_URL = `${BASE_URL}/email/send`;
export const IS_AUTHENTICATED_URL = `${BASE_URL}/auth/me`;
export const LOGOUT_URL = `${BASE_URL}/auth/logout`;
export const CLIENT_STATISTICS_BY_ROLE_URL = `${BASE_URL}/clients/statistics/role`;
export const CLIENT_STATISTICS_BY_CYCLE_URL = `${BASE_URL}/clients/statistics/cycle`;
export const FACTURE_STATISTICS_URL = `${BASE_URL}/factures/statistics`;
