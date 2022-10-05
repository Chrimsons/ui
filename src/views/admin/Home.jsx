import { Link, Outlet, useNavigate } from "react-router-dom";
import ProfilePicture from "../../img/snswhomepage.JPG";
import UserInfo from "../UserInfo";


const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ margin: "auto" }} className="pl-72">
        <div className="home-bar">
          <Link className="home-link" to="/">
            MyServiceNSW Account
          </Link>
        </div>
        <div>
          <img
            onClick={() => navigate("/")}
            className="w-left cursor-pointer object-contain w-[200px] "
            src={ProfilePicture}
          />
          <UserInfo />
        </div>
      <div>
        <Link to={"/admin"} className="h-lnk">
          Home
        </Link>
        <Link to={"/admin/licence/issue"} className="h-lnk">
          Issue Licence
        </Link>
      </div>
      <Outlet />
    </div>
  );
};
export default Home;
