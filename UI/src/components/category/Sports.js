import React, { useState } from "react";
import { CardGroup } from "react-bootstrap";
import Card from "../Card";
import { NewsService } from "../newsServices";
import axios from "axios";
import Pagination from "react-js-pagination";




class sports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      activePage: 1,
      totalResults:0,
      
    };
    this.newsService = new NewsService();
  }

  componentDidMount() {
    this.newsService.getArticlesByCategory("sports").then((data) => {
      this.setState({
        articles: data.articles,
        totalResults:data.totalResults,
      });
      console.log(`Data: ${data.articles}`);
      console.log(`TotalPage count: ${data.totalResults}`)
    });
  }

  handlePageChange = pageNumber => {
    console.log(`active page is ${pageNumber}`);
    
    this.newsService.getArticlesByCategory("sports",pageNumber).then((data) => {
      this.setState({
        articles: data.articles,
        totalResults:data.totalResults,
      });
      console.log(data.articles);
    });

    this.setState({ activePage: pageNumber });
  };

  render() {
    const { totalResults,articles } = this.state;
    return (<div className="container">
                         
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
export default sports;
