export class NewsService {
  apikey = "b98354244ef44ff38143cd6dc5e1df8b";
  api = "https://newsapi.org/v2";
  top_enpoint = "/top-headlines";

  getDashboardArticles = async (country,page) => {
    const url = `${this.api}${this.top_enpoint}?country=${country}&apikey=${this.apikey}&page=${page+1}`;

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

  getArticlesBySource = async (domain) => {
    //const url = `${this.api}${this.top_enpoint}?country=in&category=${source}&apiKey=${this.apikey}`;
      const url=`https://newsapi.org/v2/everything?domains=${domain}&apiKey=${this.apikey}`
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


  handledNextClick = async (country)=>{
    console.log("Next")
    const url = `${this.api}${this.top_enpoint}?country=${country}&apikey=${this.apikey}&page=${this.state.page+1}`;
    let response = await fetch(url);
    let json = await response.json();
    console.log(json)
    this.setState({
      page:this.state.page+1,
    })

    }

    handledPreviousClick = async(country)=>{
      console.log("previous")
      const url = `${this.api}${this.top_enpoint}?country=${country}&apikey=${this.apikey}&page=1`;
      let response = await fetch(url);
      let json = await response.json();
      console.log(json)
      
    }
  
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
