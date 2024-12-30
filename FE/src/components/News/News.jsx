import React from "react";
import "./News.scss";
import { Link } from "react-router-dom";

function News({ item }) {
  return (
    <div className="news-card">
      <Link to={`/news/${item.id}`} className="imgContainer">
        <img src={item.imageurl[0]} alt={item.title} />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/news/${item.id}`}>{item.title}</Link>
        </h2>

        <p className="summary">{item.content[0]}</p>

        <p className="date">
          Published: {new Date(item.dateCreated).toLocaleDateString()}
        </p>

        <div className="actions">
          <Link to={`/news/${item.id}`} className="read-more">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default News;
