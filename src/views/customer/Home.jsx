import { Link, Outlet } from "react-router-dom";

const Home = ()=>{

    return (
        <div>
            <div ><Link to={"/customer/services"} className="alt-link">Services</Link></div>
            <Outlet />
        </div>
    )
}
export default Home; 