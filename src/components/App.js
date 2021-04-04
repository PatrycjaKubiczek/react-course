import TimeboxList from "./TimeboxList";
import EditableTimebox from "./EditableTimebox";
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
        <Container>
          <h1>Kurs reacta</h1>
          <hr />
          <div className="App">
            <TimeboxList />
            <EditableTimebox />
          </div>
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
