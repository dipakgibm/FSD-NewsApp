import React from "react";
import { CardGroup } from "react-bootstrap";
import  Card  from "./card";
import { NewsService }  from "../services/newsServices";

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
    this.newsServices = new NewsService();
  }

  componentDidMount() {
    this.newsServices.getArticles(this.props.category).then((data) => {
      this.setState({
        articles: data.articles,
      });
      console.log(data.articles);
    });
  }

  render() {
    return (
      <div>
        <CardGroup>
          {this.state.articles.map((article, i) => (
            <Card key={i} {...article}></Card>
          ))}
        </CardGroup>
      </div>
    );
  }
}
export default Category;