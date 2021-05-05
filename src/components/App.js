import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, Container } from "@material-ui/core";
import LoginForm from "./LoginForm";
import AuthenticationAPI from "../api/FetchAuthenticationAPI";

import AuthenticationContext from "../contexts/AuthenticationContext";
import Quote from "./Quote";

const AuthenticatedApp = React.lazy(() => import("./AuthenticatedApp"));
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
                  <AuthenticationContext.Provider
                    value={{ accessToken: this.state.accessToken }}
                  >
                    {
                      <React.Suspense fallback={"...Loading"}>
                        <AuthenticatedApp onLogout={this.handleLogout} />
                      </React.Suspense>
                    }
                  </AuthenticationContext.Provider>
                  <Quote />
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
