import React from "react";
import { Button, TextField, Paper } from "@material-ui/core";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();
  }
  handleSubmit = (e) => {
    console.log(this.emailInput.current.value);
    e.preventDefault();
    this.props.onLoginAttempt({
      email: this.emailInput.current.value,
      password: this.passwordInput.current.value,
    });
    this.emailInput.current.value = "";
    this.passwordInput.current.value = "";
  };
  render() {
    return (
      <>
        <h2>Dodaj nowe zadanie</h2>
        <div>{this.props.errorMsg}</div>
        <form className="CurrentTimebox">
          <TextField
            inputRef={this.emailInput}
            label="email"
            variant="outlined"
            defaultValue="grazynka@test.pl"
          />
          <TextField
            inputRef={this.passwordInput}
            label="hasło"
            type="password"
            variant="outlined"
            defaultValue="haslo"
          />
          <Button variant="outlined" onClick={this.handleSubmit}>
            zaloguj się
          </Button>
        </form>
      </>
    );
  }
}

export default LoginForm;
