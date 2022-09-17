import React from "react";
import { Button, Card as BootCard } from "react-bootstrap";
import authService from "../services/auth.service";
import { NewsService } from "../services/newsServices";

const Card = ({ title, description, imageUrl, newsUrl, author, date, source }) => {
  const handleAddToReadLater = () => {
    const newsServices = new NewsService();
    const username=authService.getCurrentUser();
    newsServices
      .addToReadLater({ title, description, imageUrl, newsUrl, author, date, source,username })
      .then((data) => {
        
        if (!data) {
          alert("error");
        } else {
          alert(`${data.title.slice(0, 30).concat("...")} added to read later`);
        }
      });
  };

  return (
    <div className="my-3">
      <div className="card" style={{width:"23em",height:"39em"}}>
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          right: '0'
        }
        }
        >
          <span className="badge rounded-pill bg-danger"> {source} </span>
        </div>
        <img src={!imageUrl ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg" : imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title" style={{fontSize:"1.2em"}}>{title}  </h5>
          <p className="card-text" style={{fontSize:"0.9em"}}>{description}</p>
          <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on  {new Date(date).toGMTString()}</small></p>
          <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More </a><a>&emsp;&emsp;</a>
          <a className="btn btn-sm btn-dark" onClick={handleAddToReadLater}>Bookmark</a>
        </div>
      </div>
    </div>
  )

};
export default Card;