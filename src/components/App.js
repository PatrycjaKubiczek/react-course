import React from "react";
import TimeboxList from "./TimeboxList";
import EditableTimebox from "./EditableTimebox";
import ErrorBoundary from "./ErrorBoundary";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, Container } from "@material-ui/core";
import LoginForm from "./LoginForm";
import AuthenticationAPI from "../api/FetchAuthenticationAPI";
import jwt from "jsonwebtoken";

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        margin: "10px",
        padding: "10px",
      },
    },
    MuiTextField: {
      root: {
        margin: "10px",
      },
    },
  },
});

class App extends React.Component {
  state = {
    accessToken: null,
    previousLoginAttemptFailed: false
  };

  isUserLoggedIn() {
    return !!this.state.accessToken;
  }
  getUserEmail() {
    const decodedTime = jwt.decode(this.state.accessToken);
    return decodedTime.email;
  }
  handleLogout = () => {
    this.setState({
      accessToken: null,
      previousLoginAttemptFailed: false,
    });
  };
  handleLoginAttempt = (credentials) => {
    AuthenticationAPI.login(credentials)
      .then(({ accessToken }) => {
        this.setState({
          accessToken,
          previousLoginAttemptFailed: false,
        });
      })
      .catch(() => {
        this.setState({
          previousLoginAttemptFailed: true,
        });
      });
  };
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Container maxWidth="sm">
            <ErrorBoundary message="Coś nie działa w aplikacji">
              {this.isUserLoggedIn() ? (
                <>
                  <header className="header">
                    Witaj, {this.getUserEmail()}!
                    <a onClick={this.handleLogout} href="#">
                      wyloguj
                    </a>
                  </header>
                  <h1 style={{ textAlign: "center" }}>
                    Kurs reacta - pomodoro 🍅
                  </h1>
                  <hr />

                  <div className="App">
                    <TimeboxList accessToken={this.state.accessToken}/>
                    <EditableTimebox />
                  </div>
                </>
              ) : (
                <LoginForm onLoginAttempt={this.handleLoginAttempt} />
              )}
            </ErrorBoundary>
          </Container>
        </CssBaseline>
      </ThemeProvider>
    );
  }
}

export default App;
