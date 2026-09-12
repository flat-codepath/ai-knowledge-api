const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const useApi = () => {
  const fetchAPI = async (endpoint, options = {}) => {
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });
      if (!response.ok) {
        let errMsg = `API error: ${response.status}`;
        try {
          const errData = await response.json();
          if (errData && errData.detail) {
            errMsg = errData.detail;
          }
        } catch (e) {
          // Ignore JSON parse errors for non-JSON responses
        }
        throw new Error(errMsg);
      }
      return await response.json();
    } catch (error) {
      console.error("API Fetch Error:", error);
      throw error;
    }
  };

  const ingest = (data) => fetchAPI('/chat/ingest', { method: 'POST', body: JSON.stringify(data) });
  const getItems = () => fetchAPI('/chat/items');
  const query = (question) => fetchAPI('/chat/query', { method: 'POST', body: JSON.stringify({ question }) });

  return { ingest, getItems, query };
};
