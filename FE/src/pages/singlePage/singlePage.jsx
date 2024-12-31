import React, { useEffect, useState } from "react";
import "./singlePage.scss";
import Slider from "../../components/Slider/Slider";
import Map from "../../components/Map/Map";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function SinglePage() {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [images, setImages] = useState([]);
  const [design, setDesign] = useState([]);
  const [price, setPrice] = useState();
  const [postForMap, setPostForMap] = useState([]);
  const [error, setError] = useState(false);
  const [profile, setProfile] = useState({});
  const token = useSelector((state) => state.token);
  const navigateTo = useNavigate();
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
      setPostForMap([response.data]);
      setProfile(response.data.seller.user.profile);
    } catch (error) {
      console.error("Get post failed:", error);

      setError(true);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const goToOtherProfile = (id) => {
    navigateTo("/otherProfile", { state: id });
  };

  if (error) {
    return (
      <div className="not-found">
        <h1>404</h1>
        <p>The post you are looking for was not found.</p>
      </div>
    );
  }
  if (!post) {
    return <div>Loading.....</div>;
  }

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={images} />

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
              <div
                className="user"
                onClick={() => goToOtherProfile(profile.id)}
              >
                {profile.imageURL && profile.imageURL[0] ? (
                  <img
                    src={`https://localhost:7215/Resources/${profile.imageURL[0]}`}
                    alt=""
                  />
                ) : (
                  "N/A"
                )}
                <span>{profile.lastName + " " + profile.firstName}</span>
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
            {design.map((design, index) => (
              <div className="size" key={index}>
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
            <Map items={postForMap} />
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
