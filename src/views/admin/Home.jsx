import { Link, Outlet } from "react-router-dom";


const Home = ()=>{

    return (
        <div>
            <div>
                <Link to={"/admin"} className="alt-link">Home</Link>
                <Link to={"/admin/licence/issue"} className="alt-link">Issue Licence</Link>
            </div>
            <Outlet />
        </div>
    )
}
export default Home; 