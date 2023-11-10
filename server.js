import express from 'express';
import puppeteer from 'puppeteer';
import cors from 'cors';

const app = express();

app.use(cors());


app.get('/acessar', async (req, res) => {
  const { url } = req.query;
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  try {
    await page.goto(url);
    const pageTitle = await page.title();
    console.log('titulo:', pageTitle);
    const data = await page.evaluate(() => {
      // Seletor CSS para o elemento que você deseja copiar
      const element = document.querySelector('.cifra_cnt');
      return element ? element.textContent : 'Elemento não encontrado'; // Retorna o conteúdo de texto do elemento
    });

    console.log('Dados copiados:', data);

    await browser.close();
    res.json({ title: pageTitle, data: data });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar a página' });

  }
});

app.get('/searchArtist', async (req, res) => {
  const { artista } = req.query;
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  try {
    const url = `https://www.cifraclub.com.br/${artista}`;
    await page.goto(url);
    
    const pageTitle = await page.title();
    console.log('Título:', pageTitle);

    // Adicione aqui a lógica para extrair os dados do artista
    const dataArtist = await page.evaluate(() => {
      // Seletor CSS para o elemento que você deseja copiar
      const element = document.querySelectorAll('.song-verified--inline');

       // Extrair o texto de cada elemento e armazenar em um array
       const dataArray = [];
       element.forEach(element => {
         dataArray.push(element.textContent);
       });
 
       return dataArray; // Retorna o array de textos dos elementos            
    });
    console.log(dataArtist)
    await browser.close();

    res.json({ title: pageTitle, data: 'Dados do artista', musics: dataArtist });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar a página do artista' });
  }
});

const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
