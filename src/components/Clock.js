function Clock({ className = "", minutes = 20, seconds = 48 }) {
  if (seconds === 0) {
    seconds = seconds + "0";
  }
  return (
    <h3 className={"Clock " + className} style={{textAlign: "center"}}>
      Pozostało {minutes}:{seconds}
    </h3>
  );
}

export default Clock;