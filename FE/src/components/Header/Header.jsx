import { useState } from "react";
import Logo from "../Logo/logo";
import "./Header.scss";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const user = false;
  const location = useLocation();
  const isProfilePage = location.pathname.includes("/profile");
  const classNameLeft = `left ${isProfilePage ? "profile-page-left" : ""}`;
  const classNameRight = `right ${isProfilePage ? "profile-page-right" : ""}`;
  return (
    <nav>
      <div className={classNameLeft}>
        <Link to={"/"} className="logo">
          <Logo />
        </Link>

        <Link to={"/sell"}>Sell</Link>
        <Link to={"/rent"}>Rent</Link>
        <Link to={"/project"}>Project</Link>
        <a href="">Agents</a>
        <a href="">About Us</a>
      </div>
      <div className={classNameRight}>
        {user ? (
          <div className="user">
            <img
              src="https://scontent.fsgn15-1.fna.fbcdn.net/v/t1.6435-1/100623009_614214899302021_9077219818804871168_n.jpg?stp=dst-jpg_s200x200&_nc_cat=111&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=6n_EFNYJCnYQ7kNvgERHhH9&_nc_zt=24&_nc_ht=scontent.fsgn15-1.fna&_nc_gid=AnK8d6fR0yB5NA2tJ30KD6A&oh=00_AYAUuNudJ6S8h5NxR0oOAqujAF4x2qnCZl2-aZiFLgLPBA&oe=676AA3C4"
              alt=""
            />
            <span>Thuan Huynh</span>
            <Link to={"/profile"} className="profile-btn">
              Profile
            </Link>
          </div>
        ) : (
          <>
            <Link to={"/signup"} className="signup">
              Sign up
            </Link>
            <Link to={"/login"} className="login">
              {" "}
              Login
            </Link>
          </>
        )}

        <div className="menu-icon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpenMenu((prev) => !prev)}
          />
        </div>
        <div className={openMenu ? "menu active" : "menu"}>
          <a href="">Sell</a>
          <a href="">Rent</a>
          <a href="">Project</a>
          <a href="">Agents</a>
          <a href="">About Us</a>
          <Link to={"/signup"}>Sign up</Link>
          <Link to={"/login"}> Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
