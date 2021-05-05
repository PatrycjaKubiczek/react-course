import jwt from "jsonwebtoken";
import AuthenticationContext from "../contexts/AuthenticationContext";

function UserGreeting() {
  return (
    <AuthenticationContext.Consumer>
      {({ accessToken }) => <>Witaj, {getUserEmail(accessToken)}</>}
    </AuthenticationContext.Consumer>
  );
}

export default UserGreeting;

function getUserEmail(accessToken) {
  const decodedTime = jwt.decode(accessToken);
  return decodedTime.email;
}
