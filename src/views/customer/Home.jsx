import { Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import LearnersTwo from "../../img/learnerstwo.jpg";
import { TokenContext } from "../../App";
import Footer from "../../Footer";
import Header from "./CustomerHeader";
import Welcome from "../../Welcome";

const Home = () => {
  const navigate = useNavigate();
  const [token, setToken] = useContext(TokenContext);

  return (
    <div className="pl-72">
      <div>
        <Header />
      </div>
      <div>
        <div>
          <img
            src={LearnersTwo}
            className="object-contain mt-20 mr-40 w-7/12 float-right"
          />
        </div>
        <div>
          <Welcome />
        </div>
        <div>
          <p className="ml-7 mt-32 font-semibold text-2xl">
            Click
            <a
              className="page-link mx-2"
              href="https://www.nsw.gov.au/driving-boating-and-transport/driver-and-rider-licences
            /proof-of-identity/proving-your-identity"
              target="blank"
            >
              here
            </a>
            to find more information about identification requirements.
          </p>
        </div>
      </div>
      <div>
        <Footer />
      </div>
      <Outlet />
    </div>
  );
};
export default Home;
