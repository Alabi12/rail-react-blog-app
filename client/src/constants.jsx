// constants.jsx
export const API_URL =
  import.meta.env.MODE_ENV === "test"
    ? "http://mocked-api-url"
    : import.meta.env.VITE_API_URL;

