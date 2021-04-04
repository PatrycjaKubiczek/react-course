import TimeboxList from "./TimeboxList";
import EditableTimebox from "./EditableTimebox";
import ErrorBoundary from "./ErrorBoundary";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, Container } from "@material-ui/core";

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Container maxWidth="sm">
          <h1 style={{textAlign: "center"}}>Kurs reacta - pomodoro 🍅</h1>
          <hr />
          <ErrorBoundary message="Coś nie działa w aplikacji">
            <div className="App">
              <TimeboxList />
              <EditableTimebox />
            </div>
          </ErrorBoundary>
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
