/**
 * Represents the complete state of an API response, including data, loading state,
 * and error information. This is particularly useful for UI state management.
 *
 * @property {number} status - HTTP status code of the response (e.g., 200, 404)
 * @property {string} statusText - HTTP status text (e.g., "OK", "Not Found")
 * @property {T | null} data - The successfully fetched and preprocessed data payload, otherwise null
 * @property {unknown} error - Error object if the request failed, null otherwise
 * @property {boolean} loading - Indicates whether the request is in progress
 */
export type ApiResponse<T> = {
  status: number;
  statusText: string;
  data: T | null;
  error: any;
  loading: boolean;
  executeGetRequest: () => Promise<void>
};
