import React, { useEffect, useState } from "react";
import "./singlePage.scss";
import Slider from "../../components/Slider/Slider";
import Map from "../../components/Map/Map";
import { useParams } from "react-router-dom";
import axios from "axios";

function SinglePage() {
  const { id } = useParams();

  const [post, setPost] = useState([]);
  const [images, setImages] = useState([]);
  const [design, setDesign] = useState([]);
  const [price, setPrice] = useState();
  // useEffect(() => {
  //   const foundPost = singlePostDataList.find(
  //     (item) => item.id.toString() === id
  //   );
  //   setPost(foundPost);
  // }, [id]);
  // if (!post) return <div>What are you finding for ??? 404 not found</div>;

  const getPost = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7215/api/RealEstates/" + id
      );
      console.log(response.data);
      setPost(response.data);
      setImages(response.data.imageurl);
      setDesign(response.data.design);
      setPrice(response.data.prices[0].priceValue);
    } catch (error) {
      console.error("Get post failed:", error);
    }
  };
  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={images.slice(1)} />

          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.name}</h1>
                <div className="address">
                  <img src="./pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">{price}$</div>
              </div>
              <div className="user">
                <img src={userData.img} alt="" />
                <span>{userData.name}</span>
              </div>
            </div>
            <div className="bottom">
              <div className="description">{post.description}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Date Created</span>
                <p>{post.dateCreated}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Legality</span>
                <p>{post.legality}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Status</span>
                <p>{post.status}</p>
              </div>
            </div>
          </div>
          <p className="title">Room Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.area}</span>
            </div>
            {design.map((design) => (
              <div className="size">
                <span>{design}</span>
              </div>
            ))}
          </div>

          {/* <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p></p>
              </div>
            </div>
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p></p>
              </div>
            </div>
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p></p>
              </div>
            </div>
          </div> */}
          <p className="title">Location</p>
          <div className="mapContainer">
            <iframe src={post.link} frameborder="0"></iframe>
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button>
              <img src="/save.png" alt="" />
              Save the Place
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
