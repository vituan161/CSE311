import SearchBar from "../../components/SearchBar/SearchBar";
import "./homePage.scss";

function HomePage() {
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1>Let's find a home that perfect for you</h1>
          <p>
            Discover your ideal home with our trusted platform. Explore diverse
            properties, reliable listings, expert advice, and seamless support.
            Your dream property is just a click away!
          </p>
          <SearchBar />
        </div>
      </div>
      <div className="imgContainer">
        <img src="./bg1.svg" alt="" loading="lazy" />
      </div>
    </div>
  );
}

export default HomePage;
