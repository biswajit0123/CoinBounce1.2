import axios from "axios";

const KEY = "5a8688be4fd54774a46d352caaa70e6b";
// const ankey = process.env.key;
// console.log(ankey);  why it is undefined

const nextkey = `https://newsapi.org/v2/everything?q=business AND blockchain&sortBy=publishedAt&language=en&apiKey=${KEY}`;
const cryptoApi =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en";

export const getNews = async () => {
  let response;
  try {
    response = await axios.get(nextkey);
    response = response.data.articles.slice(0, 15);
  } catch (error) {
    console.log(error);
  }
  return response;
};

export const getCrypto = async () => {
  let response;
  try {
    response = await axios.get(cryptoApi);
    response = response.data;
  } catch (error) {
    console.log(error);
  }
  return response;
};
