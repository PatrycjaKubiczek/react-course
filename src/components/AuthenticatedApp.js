import Header from "./Header";
import TimeboxesManager from "./TimeboxesManager";
import EditableTimebox from "./EditableTimebox";

function AuthenticatedApp({ onLogout }) {
  return (
    <>
      <Header onLogout={onLogout} />
      <div className="App">
        <TimeboxesManager />
        <EditableTimebox />
      </div>
    </>
  );
}

export default AuthenticatedApp;
