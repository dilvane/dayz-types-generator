import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export const useUploadFile = () => {
  const [file, setFile] = useState<any>(null);
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  const [error, setError] = useState<any>(false);

  useEffect(() => {
    if (!file) return;
    setLoading(true);
    setError(false);

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = (r) => {
      setResponse({
        size: file.size,
        name: file.name,
        mime: file.type,
        content: reader.result,
      });
      setLoading(false);
      setError(false);
    };

    reader.onerror = () => {
      setResponse(null);
      setLoading(false);
      setError(true);
    };
  }, [file]);

  const reset = () => {
    setError(false);
    setLoading(false);
  };

  const remove = (file) => {
    reset();
  };

  return {
    uploadFile: setFile,
    fileResponse: response,
    removeFile: remove,
    loading,
    error,
  };
};
