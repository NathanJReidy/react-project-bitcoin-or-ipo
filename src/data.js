// Create scraper or use API to auto update the companyCurrentPrice, btcCurrentPrice
/// Data source is Yahoo finance and https://au.investing.com/crypto/bitcoin/btc-usd-historical-data

const data = [
  {
    id: 1,
    company: "Uber",
    image:
      "https://www.flaticon.com/svg/vstatic/svg/2111/2111742.svg?token=exp=1618219927~hmac=14663d3afc7de46a4822c6c1e32f129c",
    ipoDate: "9 May 2019",
    ipoPrice: 42,
    btcClosingPriceOnIpoDate: 6174.53,
    currentDate: "12 April 2021",
    companyCurrentPrice: 59.44,
    btcCurrentPrice: 59893.45,
  },
  {
    id: 2,
    company: "Lyft",
    image:
      "https://pbs.twimg.com/profile_images/1063591416918552576/lg72DZIS.jpg",
    ipoDate: "28 March 2019",
    ipoPrice: 72,
    btcClosingPriceOnIpoDate: 4069.11,
    currentDate: "12 April 2021",
    companyCurrentPrice: 59.85,
    btcCurrentPrice: 59893.45,
  },
  {
    id: 3,
    company: "Facebook",
    image: "https://image.flaticon.com/icons/png/512/124/124010.png",
    ipoDate: "18 May 2012",
    ipoPrice: 38,
    btcClosingPriceOnIpoDate: 5.1,
    currentDate: "12 April 2021",
    companyCurrentPrice: 311.54,
    btcCurrentPrice: 59893.45,
  },
  {
    id: 4,
    company: "Snap",
    image: "https://variety.com/wp-content/uploads/2017/11/snapchat-logo.jpg",
    ipoDate: "2 March 2017",
    ipoPrice: 24,
    btcClosingPriceOnIpoDate: 1251.01,
    currentDate: "12 April 2021",
    companyCurrentPrice: 62.44,
    btcCurrentPrice: 59893.45,
  },
  {
    id: 5,
    company: "Twitter",
    image: "https://image.flaticon.com/icons/png/512/124/124021.png",
    ipoDate: "7 November 2013",
    ipoPrice: 26,
    btcClosingPriceOnIpoDate: 283.3,
    currentDate: "12 April 2021",
    companyCurrentPrice: 70.86,
    btcCurrentPrice: 59893.45,
  },
];

export default data;
