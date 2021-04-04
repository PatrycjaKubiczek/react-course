function Clock({ className = "", minutes = 20, seconds = 48 }) {
  if (seconds === 0) {
    seconds = seconds + "0";
  }
  return (
    <h2 className={"Clock " + className}>
      Pozostało {minutes}:{seconds}
    </h2>
  );
}

export default Clock;