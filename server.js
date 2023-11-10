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

const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
