import React from "react";
import { CardGroup } from "react-bootstrap";
import  Card  from "./Card";
import { NewsService } from "./newsServices";
import axios from "axios";
import Pagination from "react-js-pagination";

class SearchByContent extends React.Component {
  apikey = "89009dda8a5449ecbe90dc7a25510b8a"
  api = "https://newsapi.org/v2";
  top_enpoint = "/top-headlines";
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      error: false,
      articles: [],
      activePage: 1,
      totalResults: 0,
    };
    this.newsServices = new NewsService();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  
  getInfo = (page) => {
    axios.get(`${this.api}/everything?q=${this.state.query}&apiKey=${this.apikey}&language=en&page=${page}&pageSize=6`)
      .then(({ data }) => {
        this.setState({
          articles: data.articles,     
          totalResults: data.totalResults,                     
        })
        console.log(`Data: ${data.articles}`);
        console.log(`TotalPage count: ${data.totalResults}`)
      })
      .catch(() => this.setState({ error: true }))
  }


  handlePageChange = pageNumber => {
    console.log(`active page is ${pageNumber}`);

    axios.get(`${this.api}/everything?q=${this.state.query}&apiKey=${this.apikey}&language=en&page=${pageNumber}&pageSize=6`)
      .then(({ data }) => {
        this.setState({
          articles: data.articles,     
          totalResults: data.totalResults,                     
        })
        console.log(`Data: ${data.articles}`);
        console.log(`TotalPage count: ${data.totalResults}`)
      })
      .catch(() => this.setState({ error: true }))

    this.setState({ activePage: pageNumber });
  };


  handleInputChange = () => {
    this.setState({
      query: this.search.value+' '
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo()
        }
      } else if (!this.state.query) {
        }
    })
  }
  handleSubmit(event) {

    this.setState({
      query: this.search.value+' '
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo()
        }
      } else if (!this.state.query) {
        }
      })
    event.preventDefault();
  }
  
  render() {
    const { totalResults,articles } = this.state;
    return (
      <div>
         <form onSubmit={this.handleSubmit}>
        <input
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
         <input type="submit" value="Search" />
        
      </form>
      <div className="row">
        {articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
                <Card title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>
        })}
    </div>

        <div className="paginations">
          <Pagination
            totalItemsCount={totalResults}
            onChange={this.handlePageChange}
            activePage={this.state.activePage}
            itemsCountPerPage={6}
            pageRangeDisplayed={6}
            itemClass="page-item"
            linkClass="page-link"
          />
      </div>
      </div>
    );
  }
}
export default SearchByContent;
