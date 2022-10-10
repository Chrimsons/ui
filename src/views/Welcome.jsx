import { useContext } from "react";
import { TokenContext } from "../App";
import { isInRole, jwt } from "../identity";

export default function Welcome() {
  const [token, setToken] = useContext(TokenContext);

  return (
    <div className="welcome">
      {token && isInRole(token, "admin") && (
        <div>
          <h3>{"{ "}You are logged in as an {jwt(token).roles}{" }"}</h3>
        </div>
      )}
      <h2>
        Welcome,
        <span>{jwt(token).firstname}</span>
      </h2>
    </div>
  );
}
