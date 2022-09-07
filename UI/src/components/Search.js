import React from "react";
import { CardGroup } from "react-bootstrap";
import  Card  from "./card";
import { NewsService } from "../services/newsServices";
import axios from 'axios'

class Search extends React.Component {
  apikey = "89009dda8a5449ecbe90dc7a25510b8a"
  api = "https://newsapi.org/v2";
  top_enpoint = "/top-headlines";
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      error: false,
      articles: [],
    };
    this.newsServices = new NewsService();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  getInfo = () => {
    axios.get(`${this.api}/everything?q=${this.state.query}&apiKey=${this.apikey}&language=en`)
      .then(({ data }) => {
        this.setState({
          articles: data.articles                            
        })
        console.log(data.articles);
      })
      .catch(() => this.setState({ error: true }))
  }

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
        <CardGroup>
          {this.state.articles.map((article, i) => (
            <Card key={i} {...article}></Card>
          ))}
        </CardGroup>
      </div>
    );
  }
}
export default Search;