export class NewsService {
  apikey = "24c1f3d708a64e70bd2050c3cd2b08be";
  api = "https://newsapi.org/v2";
  top_enpoint = "/top-headlines";

  getDashboardArticles = async (country) => {
    const url = `${this.api}${this.top_enpoint}?country=${country}&apikey=${this.apikey}&page=1&pageSize=6`;

    try {
      let response = await fetch(url);

      if (response.ok) {
        let json = await response.json();
        return json;
      }

      throw new Error(response.status);
    } catch (e) {
      console.error(e);
    }
  };
  getAllArticle = async (country,page) => {
    const url = `${this.api}${this.top_enpoint}?country=${country}&apikey=${this.apikey}&page=${page}&pageSize=6`;

    try {
      let response = await fetch(url);

      if (response.ok) {
        let json = await response.json();
        return json;
      }

      throw new Error(response.status);
    } catch (e) {
      console.error(e);
    }
  };

  getArticles = async (source) => {
    const url = `${this.api}${this.top_enpoint}?country=in&category=${source}&apiKey=${this.apikey}`;
    try {
      let response = await fetch(url);
      if (response.ok) {
        let json = await response.json();
        return json;
      }
      throw new Error(response.status);
    } catch (e) {
      console.error(e);
    }
  };

  getArticlesBySource = async (domain,page) => {
    
      const url=`https://newsapi.org/v2/everything?domains=${domain}&apiKey=${this.apikey}&page=${page}&pageSize=6`;
    try {
      let response = await fetch(url);
      if (response.ok) {
        let json = await response.json();
        return json;
      }
      throw new Error(response.status);
    } catch (e) {
      console.error(e);
    }
  };
  getArticlesByCategory = async (category,page) => {
    
    const url = `${this.api}${this.top_enpoint}?country=in&category=${category}&apiKey=${this.apikey}&page=${page}&pageSize=6`;
  try {
    let response = await fetch(url);
    if (response.ok) {
      let json = await response.json();
      return json;
    }
    throw new Error(response.status);
  } catch (e) {
    console.error(e);
  }
};

  
  addToReadLater = async (article) => {
    try {
      const url = "http://localhost:3001/articles";
      let response = await fetch(url, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(article),
      });

      if (response.ok) {
        let json = await response.json();
        return json;
      }

      throw new Error(response.status);
    } catch (e) {
      console.error(e);
    }
  };
}
