import React from "react";
import { CardGroup } from "react-bootstrap";
import Card from "./card";
import { NewsService } from "../services/newsServices";

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

   handledPreviousClick = async()=>{
    console.log("previous button clicked")

  }

  handledNextClick = async ()=>{

    this.newsService.getDashboardArticles("in",this.state.page+1).then((data) => {
      this.setState({
        page:this.state.page +1,
        articles: data.articles,
      }

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
export default dashboard;