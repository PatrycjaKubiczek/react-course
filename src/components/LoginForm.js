import React, { useRef } from "react";
import { Button, TextField } from "@material-ui/core";

function LoginForm({ errorMsg, onLoginAttempt }) {
  const emailInput = useRef();
  const passwordInput = React.createRef();

  //THIS FUNCTION BELOW NEED TO BE CHANGED
  function handleSubmit(e) {
    e.preventDefault();
    onLoginAttempt({
      email: emailInput.current.value,
      password: passwordInput.current.value,
    });
    emailInput.current.value = "";
    passwordInput.current.value = "";
  }

  return (
    <>
      <h2>Dodaj nowe zadanie</h2>
      <div>{errorMsg}</div>
      <form className="CurrentTimebox">
        <TextField
          inputRef={emailInput}
          label="email"
          variant="outlined"
          defaultValue="grazynka@test.pl"
        />
        <TextField
          inputRef={passwordInput}
          label="hasło"
          type="password"
          variant="outlined"
          defaultValue="haslo"
        />
        <Button variant="outlined" onClick={handleSubmit}>
          zaloguj się
        </Button>
      </form>
    </>
  );
}

export default LoginForm;
