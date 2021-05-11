import { useContext } from "react";
import jwt from "jsonwebtoken";
import AuthenticationContext from "../contexts/AuthenticationContext";

function UserGreeting() {
  const { accessToken } = useContext(AuthenticationContext);
  return <>Witaj, {getUserEmail(accessToken)}</>;
}

export default UserGreeting;

function getUserEmail(accessToken) {
  const decodedTime = jwt.decode(accessToken);
  return decodedTime.email;
}
