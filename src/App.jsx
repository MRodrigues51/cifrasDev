import { useState, useEffect, useCallback } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [data, setData] = useState('');

  const fetchData = useCallback(async () => {
    const response = await fetch(`http://localhost:5500/acessar?url=${encodeURIComponent(url)}`);
    if (!response.ok) {
      throw new Error('Erro ao carregar a página');
    }
    const result = await response.json();
    setTitle(result.title);
    setData(result.data);
  }, [url]);

  useEffect(() => {
    const fetchAndSetData = async () => {
      await fetchData();
    };
    fetchAndSetData();
  }, [fetchData]);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  return (
    <div>
      <label htmlFor="urlInput">Digite a URL que deseja acessar:</label>
      <input
        type="text"
        id="urlInput"
        value={url}
        onChange={handleUrlChange}
      />
      <button onClick={fetchData}>Acessar URL</button>
      <div>
        <h2>Título da página:</h2>
        <p>{title}</p>
      </div>
      <div>
        <h2>Cifra:</h2>
        <pre>{data}</pre>
      </div>
    </div>
  );
}

export default App;


