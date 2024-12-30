import React from "react";
import "./News.scss";
import { Link } from "react-router-dom";

function News({ news }) {
  console.log("News Item:", news);
  if (!news) {
    return <div>News item is missing</div>;
  }

  return (
    <div className="news-card">
      <Link to={`/news/${news.id}`} className="imgContainer">
        <img src={news.imageurl[0]} alt={news.title} />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/news/${news.id}`}>{news.title}</Link>
        </h2>

        <p className="summary">{news.content[0]}</p>

        <p className="date">
          Published: {new Date(news.dateCreated).toLocaleDateString()}
        </p>

        <div className="actions">
          <Link to={`/news/${news.id}`} className="read-more">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default News;
