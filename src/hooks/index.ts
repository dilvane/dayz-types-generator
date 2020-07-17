import { useState } from "react";

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

export const useUploadFile = ({ path = "" }) => {
  const [file, setFile] = useState<any>(null);
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  const [error, setError] = useState<any>(false);

  useEffect(() => {
    if (!file) return;
    setLoading(true);
    setError(false);

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("path", path);
    formData.append("files", file, file.name);
    xhr.open("POST", `${API}/upload/`);
    setError(true);
    xhr.send(formData);

    xhr.onload = () => {
      if (xhr.status === 200) {
        const { id, name, url, size, mime, formats } = JSON.parse(
          xhr.responseText
        )[0];

        if (formats) {
          Object.entries(formats).forEach(([key]) => {
            formats[key].url = `${uploadPrefix}${formats[key].url}`;
          });
        }

        setResponse({
          id,
          name,
          size,
          mime,
          url: `${uploadPrefix}${url}`,
          formats,
        });
      } else {
        setResponse(null);
        setError(true);
      }
      setLoading(false);
    };

    xhr.onerror = () => {
      setError("Erro ao enviar o ficheiro");
      setLoading(false);
    };
  }, [file]);

  const reset = () => {
    setError(false);
    setLoading(false);
  };

  const remove = (file) => {
    reset();
    removeFile(file);
  };

  return {
    uploadFile: setFile,
    fileResponse: response,
    removeFile: remove,
    loading,
    error,
  };
};
