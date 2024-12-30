import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "../../components/Slider/Slider";
import "./newsSinglePage.scss";

function SingleNewsPage() {
  const { id } = useParams();
  const [news, setNews] = useState({});
  const [images, setImages] = useState([]);
  const [company, setCompany] = useState({});

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7215/api/News/${id}`
        );
        const newsData = response.data;
        setNews(newsData);
        setImages(newsData.imageurl || []);
        setCompany(newsData.company || {});
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };

    fetchNews();
  }, [id]);

  if (!news.title) return <div>Loading...</div>;

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{news.title}</h1>
                <div className="date">
                  <span>Date Published: {new Date(news.dateCreated).toLocaleDateString()}</span>
                </div>
                <div className="company">
                  <span>Published by: {company.name}</span>
                  {company.link && (
                    <a href={company.link} target="_blank" rel="noopener noreferrer">
                      Visit Company
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="bottom">
              <div className="content">
                {news.content?.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">Company Details</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Name</span>
                <p>{company.name}</p>
              </div>
            </div>
            {company.address && (
              <div className="feature">
                <img src="/utility.png" alt="" />
                <div className="featureText">
                  <span>Address</span>
                  <p>{company.address}</p>
                </div>
              </div>
            )}
            {company.contact && (
              <div className="feature">
                <img src="/utility.png" alt="" />
                <div className="featureText">
                  <span>Contact</span>
                  <p>{company.phone}</p>
                  <p>{company.email}</p>
                </div>
              </div>
            )}
          </div>
          <p className="title">Images</p>
          <div className="sizes">
            {images.map((url, index) => (
              <div className="size" key={index}>
                <img src={url} alt={`news-image-${index}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleNewsPage;
