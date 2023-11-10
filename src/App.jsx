import { useState, useEffect, useCallback } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [data, setData] = useState('');
  const [artist, setArtist] = useState('');
  const [musics, setMusics] = useState('');

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

// Search artist
const searchArtistData = useCallback(async () => {
  try {
    const response = await fetch(`http://localhost:5500/searchArtist?artista=${encodeURIComponent(artist)}`);
    if (!response.ok) {
      throw new Error('Erro ao carregar a página do artista');
    }
    const result = await response.json();
    setTitle(result.title);
    setMusics(result.musics);
  } catch (error) {
    console.error('Erro ao buscar o artista:', error);
  }
}, [artist]);

  const handleArtistChange = (e) => {
    setArtist(e.target.value)
  }

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
      <p>Buscar artista</p>
      <input type="text" id="searchArtistInput" value={artist} onChange={handleArtistChange}/>
      <button onClick={searchArtistData}>Buscar Artista</button>
      <div>
        <h2>Título da página:</h2>
        <ul>
          {musics.map((music, index) => (
            <li key={index}>{music}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;


