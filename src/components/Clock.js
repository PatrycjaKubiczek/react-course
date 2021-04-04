import PropTypes from "prop-types";

function Clock({ className, minutes, seconds}) {
  if (seconds === 0) {
    seconds = seconds + "0";
  }
  return (
    <h3 className={"Clock " + className} style={{textAlign: "center"}}>
      Pozostało {minutes}:{seconds}
    </h3>
  );
}

Clock.defaultProps = {
  className: ""
}

Clock.propTypes = {
  className: PropTypes.string.isRequired,
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
};

export default Clock;