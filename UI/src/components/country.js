import React, { useState } from "react";
import { CardGroup } from "react-bootstrap";
import Card from "./card";
import { NewsService } from "../services/newsServices";
import axios from "axios";
import Pagination from "react-js-pagination";




class Country extends React.Component {
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
    this.newsService.getAllArticle(this.props.countries).then((data) => {
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
    
    this.newsService.getAllArticle(this.props.countries,pageNumber).then((data) => {
      this.setState({
        articles: data.articles,
        totalResults:data.totalResults,
      });
      console.log(data.articles);
    });

    this.setState({ activePage: pageNumber });
  };

  render() {
    const{totalResults}=this.state;
    return (
      <div style={{ display: 'block', padding: 30 }}>
        <CardGroup>
          {this.state.articles.map((article, i) => (
            <Card key={i} {...article}></Card>
          ))}
        </CardGroup>
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
export default Country;
