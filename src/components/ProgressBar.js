import classNames from "classnames";

function ProgressBar({ className = "", percent = 44, big = false, color = null }) {
  let progresClassName = classNames(
    "progress ",
    className,
    {
      "progress--big": big,
      "progress--big": color === "red"
    }
  )
  return (
    <div className={progresClassName}>
      <div className="progress__bar" style={{ width: `${percent}%` }}></div>
    </div>
  );
}

export default ProgressBar;