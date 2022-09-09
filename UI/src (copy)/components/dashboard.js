import React, { useState } from "react";
import { CardGroup } from "react-bootstrap";
import Card from "./card";
import { NewsService } from "../services/newsServices";
import pagination from "./pagination"


class dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
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

  render() {
    return (
      <div style={{ display: 'block', padding: 30 }}>
        <CardGroup>
          {this.state.articles.map((article, i) => (
            <Card key={i} {...article}></Card>
          ))}
        </CardGroup>
       
      </div>
    );
  }
}
export default dashboard;
