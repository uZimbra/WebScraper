const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

module.exports = async function (req, res) {
  const browser = await puppeteer.launch({

    headless: true
  });

  const page = await browser.newPage();

  await page.goto('https://economia.uol.com.br/cotacoes/');

  const content = await page.content();

  const $ = cheerio.load(content);

  const dolar = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number($('.bra').text().substr(0, 5).replace(',', '.')));
  const peso = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number($('.bra').text().substr(5, 5).replace(',', '.')));
  const euro = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number($('.bra').text().substr(10, 5).replace(',', '.')));
  const bitcoin = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number($('.value.usa').text().replace('.', '').replace(',', '.')));

  browser.close();

  res.send({ 
    dolar: dolar, 
    peso: peso,
    euro: euro,
    bitcoin: bitcoin 
  })
}