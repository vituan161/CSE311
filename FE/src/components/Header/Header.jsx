import { useState } from "react";
import Logo from "../Logo/logo";
import "./Header.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../lib/utilities";

function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const user = localStorage.getItem("user");
  const location = useLocation();
  const isProfilePage = location.pathname.includes("/profile");
  const isAdminPage = location.pathname.includes("/admin");
  const classNameLeft = `left ${
    isProfilePage || isAdminPage ? "profile-page-left" : ""
  }`;
  const classNameRight = `right ${
    isProfilePage || isAdminPage ? "profile-page-right" : ""
  }`;
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  return (
    <nav>
      <div className={classNameLeft}>
        <Link to={"/"} className="logo">
          <Logo />
        </Link>

        <Link to={"/sell"}>Sell</Link>
        <Link to={"/rent"}>Rent</Link>
        <Link to={"/project"}>Project</Link>
        <Link to={"/company"}>Company</Link>
        <Link to={"/news"}>News</Link>
      </div>
      <div className={classNameRight}>
        {user ? (
          <div className="user">
            <img
              src={`https://localhost:7215/Resources/` + profile.ImageURL[0]}
              alt=""
            />
            <span>{profile.LastName + " " + profile.FirstName} </span>
            <Link to={"/profile"} className="profile-btn">
              Profile
            </Link>
            <button
              onClick={() => {
                logout(dispatch);
                navigateTo("/login");
              }}
            >
              Logout
            </button>
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
