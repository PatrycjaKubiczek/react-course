import UserGreeting from "./UserGreeting";

function Header({ onLogout }) {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Kurs reacta - pomodoro 🍅</h1>
      <hr />
      <header className="header">
        <UserGreeting />
        <a onClick={onLogout} href="#">
          wyloguj
        </a>
      </header>
    </>
  );
}

export default Header;
