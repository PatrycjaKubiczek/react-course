function ProgressBar({ className = "", percent = 44 }) {
  return (
    <div className={"progress " + className}>
      <div className={"progress__bar"} style={{ width: `${percent}%` }}></div>
    </div>
  );
}

export default ProgressBar;