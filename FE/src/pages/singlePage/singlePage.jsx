import React, { useEffect, useState } from "react";
import "./singlePage.scss";
import Slider from "../../components/Slider/Slider";
import Map from "../../components/Map/Map";
import { singlePostDataList, userData } from "../../lib/dummydata";
import { useParams } from "react-router-dom";

function SinglePage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  useEffect(() => {
    const foundPost = singlePostDataList.find(
      (item) => item.id.toString() === id
    );
    setPost(foundPost);
  }, [id]);
  if (!post) return <div>What are you finding for ??? 404 not found</div>;
  console.log(post.title);
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="./pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">{post.price}$</div>
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
                <span>Utilities</span>
                <p>Renter is responsible</p>
              </div>
            </div>
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                <p>Renter is responsible</p>
              </div>
            </div>
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                <p>Renter is responsible</p>
              </div>
            </div>
          </div>
          <p className="title">Room Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.size + " sqft"}</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>
                {post.bedRooms} {post.bedRooms > 1 ? "bedrooms" : "bedroom"}
              </span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>
                {post.bathroom} {post.bathroom > 1 ? "bathrooms" : "bathroom"}
              </span>
            </div>
          </div>

          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>{post.school}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.restaurant}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.bus}</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
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
