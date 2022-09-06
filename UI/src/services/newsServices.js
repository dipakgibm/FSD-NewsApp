export class NewsService {
  apikey = "b98354244ef44ff38143cd6dc5e1df8b";
  api = "https://newsapi.org/v2";
  top_enpoint = "/top-headlines";

  getDashboardArticles = async (country) => {
    const url = `${this.api}${this.top_enpoint}?country=${country}&apikey=${this.apikey}&page=1`;

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
