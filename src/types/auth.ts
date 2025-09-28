/* eslint-disable @typescript-eslint/no-explicit-any */
// Standardized authentication response types

export interface AuthSuccessResponse {
  success: true;
  message?: string;
  data?: any;
}

export interface AuthErrorResponse {
  success: false;
  error: string;
  code?: string;
  details?: any;
}

export type AuthResponse = AuthSuccessResponse | AuthErrorResponse;

// Error codes for consistent error handling
export enum AuthErrorCode {
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  LOGIN_FAILED = "LOGIN_FAILED",
  CREDENTIALS_ERROR = "CREDENTIALS_ERROR",
  UNEXPECTED_ERROR = "UNEXPECTED_ERROR",
  GOOGLE_AUTH_FAILED = "GOOGLE_AUTH_FAILED",
  GOOGLE_CREDENTIALS_ERROR = "GOOGLE_CREDENTIALS_ERROR",
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
  TIMEOUT_ERROR = "TIMEOUT_ERROR",
  GOOGLE_ERROR = "GOOGLE_ERROR",
  MISSING_CODE = "MISSING_CODE",
  SESSION_ERROR = "SESSION_ERROR",
}

// Authentication status types
export enum AuthStatus {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
