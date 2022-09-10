import React, { useState } from "react";
import { CardGroup } from "react-bootstrap";
import Card from "./card";
import { NewsService } from "../services/newsServices";
import axios from "axios";
import Pagination from "react-js-pagination";


class dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      activePage: 1,
      
    };
    this.newsService = new NewsService();
  }

  componentDidMount() {
    this.newsService.getDashboardArticles("in").then((data) => {
      this.setState({
        articles: data.articles,
      });
      console.log(data.articles);
    });
  }

  handlePageChange = pageNumber => {
    console.log(`active page is ${pageNumber}`);
    // console.log(`active page is ${data.totalResults}`);
    // axios
    //   .get(
    //     `https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&_limit=20`
    //   )
    //   .then(res => {
    //     this.setState({
    //       data: res.data
    //     });
    //   });
    this.newsService.getAllArticle("in",pageNumber).then((data) => {
      this.setState({
        articles: data.articles,
      });
      console.log(data.articles);
    });

    this.setState({ activePage: pageNumber });
  };

  render() {
    return (
      <div style={{ display: 'block', padding: 30 }}>
        <CardGroup>
          {this.state.articles.map((article, i) => (
            <Card key={i} {...article}></Card>
          ))}
        </CardGroup>
        <Pagination
          totalItemsCount={450}
          onChange={this.handlePageChange}
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          pageRangeDisplayed={5}
        />
      </div>
    );
  }
}
export default dashboard;
