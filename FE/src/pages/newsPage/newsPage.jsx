import React, { useState, useEffect } from "react";
import "./newsPage.scss";
import News from "../../components/News/News";
import axios from "axios";

function NewsPage() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("https://localhost:7215/api/News");
        const validNews = response.data.filter((news) => news && news.id);
        setNewsList(validNews);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };

    fetchNews();
  }, []);

  console.log("News List:", newsList);

  return (
    <div className="newsPage">
      <div className="header">
        <h1>Latest News</h1>
        <p>Stay updated with the latest happenings</p>
      </div>
      <div className="newsList">
        {newsList.map((news) => (
          <News key={news.id} news={news} />
        ))}
      </div>
    </div>
  );
}

export default NewsPage;
