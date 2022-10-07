import { Link, Outlet } from "react-router-dom";
import Transition from "../../img/transition.jpg";
import { useContext } from "react";
import { jwt } from "../../identity";
import { TokenContext } from "../../App";
import Footer from "../../Footer";
import AdminHeader from "./AdminHeader";
import Welcome from "../../Welcome";

const Home = () => {
  const [token, setToken] = useContext(TokenContext);

  return (
    <div className="pl-72">
      <div>
        <AdminHeader />
      </div>
      <div>
        <div>
          <img
            src={Transition}
            className="object-contain mt-20 mr-40 w-7/12 float-right"
          />
        </div>
        <div>
          <Welcome />
        </div>
        <div>
          <h3 className="ml-7 mt- font-semibold text-2xl">
            You are logged in as an {jwt(token).roles}
          </h3>
        </div>
        <div className="ml-7 mt-52 text-xl font-semibold">
          <Link
            className="border-[2px] bg-yellow-400 hover:bg-yellow-300 p-5"
            to={"/admin/licence/issue"}
          >
            Click here to issue a new licence
          </Link>
        </div>
        <div>
          <Footer />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Home;
