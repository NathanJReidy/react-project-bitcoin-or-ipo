// Create scraper or use API to auto update the companyCurrentPrice, btcCurrentPrice
/// Data source is Yahoo finance and https://au.investing.com/crypto/bitcoin/btc-usd-historical-data
// API for bitcoin current price in USD: https://api.coindesk.com/v1/bpi/currentprice.json
// API for current company price data in USD: https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=FB&apikey=HS5TVS0YI1MOIRX6

const data = [
  {
    id: 1,
    company: "Uber",
    symbol: "uber",
    image:
      "https://lh3.googleusercontent.com/proxy/P4ad23UCtuWtqNy-MB3JomYyCJrG1o_FRi5RSdSCoKjKnVJbZNGivTzZF2JUNkVMlwXosL5Unzz-mYfen76NT0nyi0kaH5NV3FlKxCh8eHl3KGlMvLE",
    ipoDate: "9 May 2019",
    ipoPrice: 42,
    btcClosingPriceOnIpoDate: 6174.53,
    defaultDate: "12 April 2021",
    defaultCompanyPrice: 59.44,
  },
  {
    id: 2,
    company: "Lyft",
    symbol: "lyft",
    image:
      "https://pbs.twimg.com/profile_images/1063591416918552576/lg72DZIS.jpg",
    ipoDate: "28 March 2019",
    ipoPrice: 72,
    btcClosingPriceOnIpoDate: 4069.11,
    defaultDate: "12 April 2021",
    defaultCompanyPrice: 59.85,
  },
  {
    id: 3,
    company: "Facebook",
    symbol: "FB",
    image: "https://image.flaticon.com/icons/png/512/124/124010.png",
    ipoDate: "18 May 2012",
    ipoPrice: 38,
    btcClosingPriceOnIpoDate: 5.1,
    defaultDate: "12 April 2021",
    defaultCompanyPrice: 311.54,
  },
  {
    id: 4,
    company: "Snap",
    symbol: "snap",
    image: "https://variety.com/wp-content/uploads/2017/11/snapchat-logo.jpg",
    ipoDate: "2 March 2017",
    ipoPrice: 24,
    btcClosingPriceOnIpoDate: 1251.01,
    defaultDate: "12 April 2021",
    defaultCompanyPrice: 62.44,
  },
  {
    id: 5,
    company: "Twitter",
    symbol: "twtr",
    image: "https://image.flaticon.com/icons/png/512/124/124021.png",
    ipoDate: "7 November 2013",
    ipoPrice: 26,
    btcClosingPriceOnIpoDate: 283.3,
    defaultDate: "12 April 2021",
    defaultCompanyPrice: 70.86,
  },
  {
    id: 6,
    company: "Airbnb",
    symbol: "abnb",
    image:
      "https://assets.entrepreneur.com/content/3x2/2000/1405612741-airbnb-why-new-logo.jpg",
    ipoDate: "10 December 2020",
    ipoPrice: 146,
    btcClosingPriceOnIpoDate: 15455.4,
    defaultDate: "12 April 2021",
    defaultCompanyPrice: 176.49,
  },
  {
    id: 7,
    company: "Doordash",
    symbol: "dash",
    image:
      "https://lh6.googleusercontent.com/proxy/4rKfQfGUng4C7ftXwrfFQcf6vRIz-xIGk2oGGxOgBoPrOjQPVp0qKJVQWU1zuoBvf95YRA87U9UtvnLGJGmA4-ue39Mu8SfJ_35P5HPuxGZNVX7AGvXBh_8VUKz3nOF1Dp18KuNPwnK07P0Wh02wu58f20-Xnt2waaPkeEPWxOZVBV1l5jS7_voF7BJ7nE66EafbyAT3iiClhGM-EmJoclURX6yPLSpihMFdQIE=s0-d",
    ipoDate: "9 December 2020",
    ipoPrice: 102,
    btcClosingPriceOnIpoDate: 15178.2,
    defaultDate: "12 April 2021",
    defaultCompanyPrice: 147.83,
  },
  {
    id: 8,
    company: "Snowflake",
    symbol: "snow",
    image:
      "data:image/jpeg;base64,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",
    ipoDate: "16 September 2020",
    ipoPrice: 120,
    btcClosingPriceOnIpoDate: 10974.91,
    defaultDate: "12 April 2021",
    defaultCompanyPrice: 233.39,
  },
  {
    id: 9,
    company: "Shopify",
    symbol: "shop",
    image:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALkAAAC5CAMAAABDc25uAAAAaVBMVEX///+Vv0dejj5rmkCix17y9+jk79G914z4+/PK36Ocw1Kvz3XX57rr89zd68Woy2q204HR465ynFa5zqvr8ebC1LabuYZplkvC2pd8o2Lh6tukv5KQsXrN3MOvx5/W4s6Gqm6rxZN2ok0Ht5IpAAAJF0lEQVR4nNWda5ucNgyFZ2e5w8CQTRPapmna//8jOwyw3GzpSDYeqk8JDzu8GPnIko25XLxa0t6j4u2taNIq8/vLh1rSPaBnS+NXA4GWlG8bK9pXMyGWdVvu3rpXY/FWFybwh8e8GowzY4M/rUzTNK/P6vFZM7t22d4eopLV6eYGqldDmiyOPrnzWQrzTeNH52OfwbuZO94JzflU8hM8SuaDrbHDRqdC/wRPFzHT1mFPhT51znxxbNM73+7RCdE7CrwcVb66VBN7c5bRTG4An26mj/3Dv8vFmSeJqrEBfEJsesdIhnvoj7fj8cT8U2EtG33gvjhWrztsMdOO6NErSLc2+kW08N1JaqbxyuDz7fL0fP9DoS0Z/XmpF2PvbKb/t4uHMj6i4vWddGzeZVSvtuJ3W3pIcpJGz9d+0dvkK/NTyIYDYzOXp/D0eNu8F6MnR8tbSU4hL+neV6abWZ52fx6qx/+V82PKqjT952so2oXFe1+ZbibeH5vurxr7aNw+7+H9+x/BgClK082MvWHyn2zQ92mw8369/haMeE25iuXpXiSnVu7W57zN5MHR0333jI2aVy2ew8O1ix15YHQTZWXw8mk08CDP2nKXbjzJw6KnexEZ9W9bphiEsMwN2d1Efv0IB25q8sTY5NNhs43k15/ByKu9l4+PodycmVUIeTh0k2NM6c8Ke+/aZvJQ6CbHWOQQg43BBiQPhG5yjHT1GBJzjyTIg6CP4791zWpwoOf4ZFNGB8mvP78+7cjR+9g/V8dGtcl2wQYnX9uXPw8gv68cY7Ah4ERMjxSQX69/+ydfZMWfZi9Dq8n9x6dBRdbOkkQMo4Lcv7sMzTs7S5ZIXBsn/+GdfBhcj1mOaRzlifyLb/BFTowEGz351bc+Dm7ePIJNw3C5kvtOUofaT+TgIyi573H73QcyRO5XFrNWp38a8m/+sMFxlC/y331hdz5bGyH/7oHaIdg4kDvLoluwcSF3KoA5BxsXcr0sZr57pJBcnSbpRq4eybWyuF1yEJ5cK4v+RVBKrpTF7Hhwjlw55iLLaoHIdbLY8hc+nFwni0pliZp7muZ5l95LfvzOketSUfFotii7Kl4H7Ft1J/s5R65LRWUZT5Tbpgopr+PIdamoYKxSWLEv8xIGDblKFnFRjFpyTLddYCQhV8kiKorsYj7K0VnyvxTk1ENeWM6NoWPqr1lyTSoKyXlzY38Hm22xmUYWETnvgKSFFFeWXCOLwMgcWl1OShRLrpFFVs4LaJ3tjfwNlvyqIGdbnHfx3ujuwpPLZZGUhN7Alc200/Hkclnk5Bxdi0X/Ck8ul0VSzPCXEJgG4MnlqSidhEZoDYfRVp5cnopSow3BEjJGoXhyuSySPQt+YYUbtvHk8godmRDAi8i5wQ9ALk5Fqevhazxpn4PIpakoGfrwdftcyQYgl1boKDWzenlct/nD2noKr2w4A8ilskgFbXPYX1fYm7TO2KAAkUtlkZBz43rgm0GLyootHwDk0lSUuKbpRQm2cfXkUlkk5NwQhdSFPIRcKIv2fKAwnK2u+iLkMlkkYt92Wd9F7ysYuSwVJeTc4Ob6WWmEXCaLRNSu92frVy4g5DJZJOTc0EH1kxsIuUwWiWG1IfQf2+ayVJQQRcPZ+qkwiFyUihKtaDg7Vk9RQ+SiVJRAMZ2unpiByCWySKUyxj/Q+gtELqnQUdHc/BdKdIhckopSSZglrdAttYTIJRU6qgVtCVHMZW56coEsUhCGGDpaJW92jFwgi1TJgig9y5sdIxfIIhUU79QfSpsdIxeMuaiLmcbns5l3cXEkx2WRTtmZylwtaXaMHJdFOjnjXtiPBcN1jBxPRekch38BGw9LIDmcijJX5otztq1/tORwKso8buCt9xuIDpLDsshNKJLCOBg48AXJYVlkrwrMbmGtDpLDqSh7wQKYUYRKGSA5morSk69PQzaQQWISSI7KIlJrQ9CBxBolB2URys0AdKAFUHJQFrGhBzDtzw8dUXJw4gKN3mxE4hdUoeSgLMKFn4bzGLbRUXJQFvHqCbeGi/V0lByTRdFK4pTWK64RUHIsFQXkfGG0xnCdHSaH3nIFF819GrUmysMc9GCQLIpLbYTGcBOiMDlUoZOvgSbQGUeHyaFUVPE6i91hnFeJjAalooo6fmHtpkxUg8mhCp0cnFgKwMQinByQRd2LITZZ90YOVOh088m2YMok4zg5kIpK5XwwWxHGeQXaZIAs6mr4Nkf35i2ALJLXym33ZSP3pi2ALJJynlxu5rKhTdGZ4ICTA6koWdDs/zw3xUWboPuKRIgsUhca9ns0FPitek6DS8hZWSTHuJOCbNmtQ11uxCwgZ2WRlPN5jiiuFn5gz+q4cpGAnE1FyWutCOPq3tMX1P7gXDIuIGdTUUrO5btoelhpORkri1QrATXctXnLoHvjZJESYPHW696qFr1xFToqicHeCZmNXdwqImdSUWqMS88nGowvREvImQodJcBSN4/5+UUJOSOLVJ+SfhAEGHVKyBlZpEoWwv15eS+XkTMVOioTkIFDawEl5IwsEnJuT/CNBmUoInJaFqlRqejrAlhqJSKnZZGsSQk+2gMuMhaRk6koV7JAvwKC1iZF5GQqyg40sI+vwKVJETk55gJKFhErjjFe3xORk7IIPWX6gz2ZMU/1QU6mouBjjlqbv4u4peRUKopXoBvDhhDsxr6O5FQqKqtAl11bJ/Gj+eM4rttOUb6WkVOyKL+2m8nICVlEBkkvJCdkMcTWRA7kxMSFrgIdjtwuiwH2DnMit8uiZiF2SHK7LB68P54zuT0VDbBfmxP5Lyt5aHApuVUWZassXkBuTUWDy7mY3JaKhthpzo3clorG+d19q+dDyckK3a0OyC8l59fQZUndHbbVrAM5urQ4S9qD+aXksrdcH/yHuY+UXLNr8THuLyZX71p8e7i/T34xudtm7h7dX+znPjZzf/Cnzvyi+vmvD59fFXF0f3hdrl9qD/zQ+/4/Pg7+nF6WVGL3Z/cRPZx6yS/pvhR5SOrZYjB62chfQz0b7/4m8ldTz9ZHL1uCuyU/D/WnWdz//dzUs/WDtxX/RP7928crvoEqtYX7v/9/qGd78v/rQv0fB4GTKsByX1AAAAAASUVORK5CYII=",
    ipoDate: "21 May 2015",
    ipoPrice: 28,
    btcClosingPriceOnIpoDate: 235.34,
    defaultDate: "12 April 2021",
    defaultCompanyPrice: 1202,
  },
  {
    id: 10,
    company: "Peloton",
    symbol: "pton",
    image:
      "data:image/png;base64,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",
    ipoDate: "26 September 2019",
    ipoPrice: 27,
    btcClosingPriceOnIpoDate: 8118.97,
    defaultDate: "12 April 2021",
    defaultCompanyPrice: 118.97,
  },
  {
    id: 11,
    company: "DocuSign",
    symbol: "docu",
    image:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAdVBMVEXh+AAAAADZ8j7n/wBBRwA7QQDg+ADy/wDl/ADc8wAiJgBncgDv/wCJlgDM3gAlKQANDgCVpABJUQA2PADa7QDg9z53gwDN3gDS7VUtMgBGTQDc9DDH2wDT6QAMDQBuegAdIQCjswAyNwC/0ACAjAD//wAoLQAmEfLmAAADr0lEQVR4nO3d63aTQBSGYQi1IXYae0hqDqa1Wr3/SxRT0yYwDJt9gN34vT91LcPjEAszs8ZstZycQctVtg3FGRS22aTIzqBiAoivAPEWIN4CxFuAeAsQbwHiLUC8BYi3APEWIN4CxFuAeAsQbwHiLUC8BYi3bCGNlb7y0uyjTCHzb7V2pdVHWULK2frmtMenqdFnGUO+57WuPijkMyC9A4QQIJwAIQQIJ0AIAcIJEEKAcAKEECCcACEECCdACAHCCRBCgHAChBAgnAAhBAgnQAh9OEhoWavtAwmFcL1XDimL20X8KnpAwvM8yCRiSDl9yDdZ9I+gQ6a3+Y9FkFyGGPLXked3WWxMyJDKkef3C9GYCCGvjr0k8ptEyN4hlcggB0d8TIiQfw6hRAR5d1SSsiGhQd4cMokEcuyI3V0kyJFjL2FeiwRy6ohIKJATh2RM+JC6o/k9IUBqDoGEDWk6GpJuSMPBv7u4kJijLumERBzsMWFCLkPMUZN0QaKOSrLj/M0yIeE6eg2n3/gOSIujkswY++yYkPLnl3bJYUzSkFZH/sLZL8i+tb52S5KQdsf1dEBIJZl3SlIQbQf/n1+CJAFRdwh+IKYlaYi+Q/KI0vk9aYUYOEQPjV13VxvEwiF7jO+4u1ogJg7hi1VaEofYOKSvuklJiEGMHOLJh5QklE3ILyOHfDooJZn9rv/Sw7ORQ2GCLiHZNEZk/Wjk0JgyTUjIiR0qc79yidyhMxsvlSg4lJYVZBINh9b6iESi4lBb6OFLdBx6K1aJZ+EhHIpLb7wx0XJoriFyJGoO1cXQ/hI9h+6qbl+JokN5ebrfN17Tob3O3mdMVB3qGwboEl2H/s4HqkTZYbCFgybRdljsRaFI1B0mm2q6JfoOm91BXRIDh9E2p7TEwmG1XyslMXGYbTxrl9g47HbQtUmMHIZbAeMSK4flnsaYxMxhujmzKbFz2J5UU5cYOoyP3DmVWDqsT3M6lpg6zI+lepfYOuzP1zpIjB0DHBT2KrF2DHHiWSVZv1g7Bjm67bKYFdaOgc6gszux7S0cpuctQLxFh5SjpQ0Z4X+i259RqQspd5tPI3VFolAhxTw+lTBA96SfpnTIzViQC0AAAQQQQAABBBBAABkaMpZD+TG+3N1djNQT6RWR/qo70ptuFe3y/E8+kK7uf5wOch4g3gLEW4B4CxBvAeItQLwFiLcA8RYg3gLEW4B4CxBvAeItQLwFiLcA8dY5QbZhvHVOvcI2Wy0nZ9By9QeGEVyZSfPTKAAAAABJRU5ErkJggg==",
    ipoDate: "27 April 2018",
    ipoPrice: 38,
    btcClosingPriceOnIpoDate: 8987.05,
    defaultDate: "12 April 2021",
    defaultCompanyPrice: 213.48,
  },
];

export default data;
