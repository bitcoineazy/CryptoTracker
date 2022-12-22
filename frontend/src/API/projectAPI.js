export default class projectAPI {
  constructor() {
    this.rootUrl = 'http://143.244.205.59/api/';
  }

  async getToken(username, password) {
    console.log("getToken - start")
    console.log(username, password)
    let rez = await fetch(this.rootUrl + "api-token-auth/",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
          },
          body: JSON.stringify({
            username,
            password
          })
        })
    if (rez.ok) {
      rez = await rez.json();
      console.log("getToken - end")
      return rez.token;
    } else {
      alert("Не удалось получить доступ: api-token-auth/")
      console.log(rez.status + " " + await rez.json())
      return null;
    }
  }

  async getPortfolios(token) {
    console.log("getPortfolios - start");
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };

    let res = await fetch(this.rootUrl + "portfolio/get_portfolio_by_user/", requestOptions)
    if (res.ok) {
      res = await res.json();
      console.log(res);
      console.log("getPortfolios - end");
      return res;
    } else {
      alert("Не удалось получить доступ к: portfolio/get_portfolio_by_user/")
      console.log(res.status + " " + await res.json())
      return null;
    }
  }

  async getPortfolio(token, name) {
    console.log("getPortfolio - start");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);

    const formData = new FormData();
    formData.append("name", name);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formData,
      redirect: 'follow'
    };

    let res = await fetch(this.rootUrl + "portfolio/get_portfolio/", requestOptions)
    if (res.ok) {
      res = await res.json();
      console.log(res);
      console.log("getPortfolio - end");
      return res;
    } else {
      alert("Не удалось получить доступ к: portfolio/get_portfolio/")
      console.log(res.status + " " + await res.json())
      return null;
    }
  }

  async getAssetsByCoinID(coin_id_list) {
    console.log("getAssetsByCoinID - start");
    let assets = {}
    for (let coinIdListElement of coin_id_list) {
      if (!(coinIdListElement in assets)) {
        const formData1 = new FormData();
        formData1.append("coin_id", coinIdListElement);

        const requestOptions = {
          method: 'POST',
          body: formData1,
          redirect: 'follow'
        };
        let asset_data = await fetch(this.rootUrl + "assets/by_coin_id/", requestOptions)
        assets[coinIdListElement] = await asset_data.json()
      }
    }
    console.log(assets);
    console.log("getAssetsByCoinID - end");
    return assets;
  }

  getGraph(token, name) {

  }

  async addUser(email, password) {
    let formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);
    formData.append("email", email);

    let requestOptions = {
      method: 'POST',
      body: formData,
      redirect: 'follow'
    };
    console.log("addUser - start");
    let res = await fetch( this.rootUrl + "users/create/", requestOptions);
    if (res.status === 200) {
      let token = await res.json()
      token = token.token
      console.log(token);
      await this.addPortfolio(token, "Портфель");
      return token;
    }
    if (res.status === 404) {
      alert("User already exist");
    }
  }

  async addPortfolio(token, name) {
    console.log("addPortfolio - start");
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);

    let formData = new FormData();
    formData.append("name", name);

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formData,
      redirect: 'follow'
    };

    let res = await fetch(this.rootUrl + "portfolio/add_portfolio/", requestOptions)
    console.log("addPortfolio - send data");
    return res
  }

  async addAsset(token, name, coin_id, data, amount, price) {
    console.log("addAsset - start");
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);

    let formData = new FormData();
    formData.append("name", name);
    formData.append("assets", coin_id);
    formData.append("add_date", data);
    formData.append("amount", amount);
    formData.append("price", price);

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formData,
      redirect: 'follow'
    };

    fetch(this.rootUrl + "portfolio/update_portfolio/", requestOptions)
    console.log("addAsset - send data");
  }

  result2content(portfolio, assets) {
    console.log("result2content - start");
    let content = [];
    let coin_id;
    let price;
    let symbol;
    let img;
    let price_change_24h;
    let price_change_percentage_24h;
    for (const row in portfolio) {
      coin_id = portfolio[row].asset;
      price = assets[coin_id]['current_price'];
      symbol = assets[coin_id].symbol;
      img = assets[coin_id].image;
      price_change_24h = assets[coin_id].price_change_24h;
      price_change_percentage_24h = assets[coin_id].price_change_percentage_24h;
      content.push(
          {
            name: assets[coin_id].name,
            count: parseFloat(portfolio[row].amount).toFixed(2),
            buy_price: parseFloat(price).toFixed(2),
            assets: [parseFloat(price * portfolio[row].amount).toFixed(2), symbol.toUpperCase()],
            price: parseFloat(portfolio[row].price).toFixed(2),
            up_down: [parseFloat(price_change_24h).toFixed(4), parseFloat(price_change_percentage_24h).toFixed(4)],
            img: img
          }
      );
    }
    console.log(content);
    console.log("result2content - end");
    return content;
  }
}
