import Header from "./Header";
import TimeboxList from "./TimeboxList";
import EditableTimebox from "./EditableTimebox";

function AuthenticatedApp({ onLogout }) {
  return (
    <>
      <Header onLogout={onLogout} />
      <div className="App">
        <TimeboxList />
        <EditableTimebox />
      </div>
    </>
  );
}

export default AuthenticatedApp;
