import { useState, useCallback } from 'react';
import { useApi } from './useApi';

export const useKnowledge = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const api = useApi();

  const showError = (msg) => {
    setError(msg);
    if (msg) {
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getItems();
      setItems(data);
      setError(null);
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addKnowledge = async (sourceType, content, url) => {
    setLoading(true);
    try {
      await api.ingest({ source_type: sourceType, content, url });
      await fetchItems();
      setError(null);
    } catch (err) {
      showError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const askQuestion = async (question) => {
    setLoading(true);
    try {
      const result = await api.query(question);
      setError(null);
      return result;
    } catch (err) {
      showError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { items, loading, error, fetchItems, addKnowledge, askQuestion };
};
