import React from "react";
import { Alert, CardGroup } from "react-bootstrap";
import { NewsService } from "../services/newsServices";
import BookmarkCard from "./BookmarkCard";


class ReadBookmark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      
    };
    this.newsService = new NewsService();
  }

  componentDidMount() {

    this.newsService
      .ReadBookmarkarticle()
      .then((data) => {
        this.setState({
          articles: data,
        });
      });
  }

  render() {
    const { articles } = this.state;
    return (
      <div>

        <div className="row">
          {articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <BookmarkCard title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.imageUrl} newsUrl={element.newsUrl} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>
          })}
        </div>

      </div>
    );
  }
}
export default ReadBookmark;