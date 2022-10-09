import { useContext } from "react";
import { TokenContext } from "../App";
import { jwt } from "../identity";

export default function Welcome() {
  const [token, setToken] = useContext(TokenContext);

  return (
    <h2 className="mt-10 text-2xl mr-7 ml-72 w-screen">
      Welcome,
      <span className="italic font-extrabold ml-4">{jwt(token).firstname}</span>
    </h2>
  );
}
