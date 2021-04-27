import React from "react";
import Clock from "./Clock";
import ProgressBar from "./ProgressBar";
import { Button, Grid } from "@material-ui/core";
import { getMinutesAndSecondsFromDurationInSeconds } from "../lib/time";
class CurrentTimebox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      isPaused: false,
      pausesCount: 0,
      elapsedTimeInSeconds: 0,
    };
    this.intervalId = null;
  }
  componentWillUnmount() {
    this.stopTimer();
  }

  handleStart = (event) => {
    this.setState({
      isRunning: true,
    });
    this.startTimer();
  };

  handleStop() {
    this.setState({
      isRunning: false,
      isPaused: false,
      pausesCount: 0,
      elapsedTimeInSeconds: 0,
    });
    this.stopTimer();
  }
  startTimer() {
    if (this.intervalId === null) {
      this.intervalId = window.setInterval(() => {
        this.setState((prevState) => ({
          elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 0.1,
        }));
      }, 100);
    }
  }
  stopTimer() {
    window.clearInterval(this.intervalId);
    this.intervalId = null;
  }

  togglePause() {
    this.setState(function (prevState) {
      const isPaused = !prevState.isPaused;
      if (isPaused) {
        this.stopTimer();
      } else {
        this.startTimer();
      }
      return {
        isPaused,
        pausesCount: isPaused
          ? prevState.pausesCount + 1
          : prevState.pausesCount,
      };
    });
  }

  render() {
    const {
      isRunning,
      isPaused,
      pausesCount,
      elapsedTimeInSeconds,
    } = this.state;
    const { title, totalTimeInMinutes, isEditable, onEdit } = this.props;
    const totalTimeInSeconds = totalTimeInMinutes * 60;
    const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;

    const [
      minutesLeft,
      secondsLeft,
    ] = getMinutesAndSecondsFromDurationInSeconds(timeLeftInSeconds);
    const progressPercent = (elapsedTimeInSeconds / totalTimeInSeconds) * 100;
    return (
      <div className={` ${isEditable ? "inactive" : ""}`}>
        <h2>Licznik pomodoro</h2>
        <Grid container display="flex" justify="center">
          <h3>Zadanie: {title}</h3>
          <Button
            onClick={onEdit}
            disabled={isEditable}
            variant="outlined"
            size="small"
          >
            Edytuj
          </Button>
        </Grid>

        <Clock
          minutes={minutesLeft}
          seconds={secondsLeft}
          className={isPaused ? "inactive" : ""}
        />
        <ProgressBar
          percent={progressPercent}
          className={isPaused ? "inactive" : ""}
          color="red"
          big
        />
        <Button
          onClick={this.handleStart}
          disabled={isEditable || isRunning}
          variant="outlined"
        >
          Start
        </Button>
        <Button
          onClick={this.handleStop}
          disabled={isEditable || !isRunning}
          variant="outlined"
        >
          Stop
        </Button>
        <Button
          onClick={this.togglePause}
          disabled={isEditable || !isRunning}
          variant="outlined"
        >
          {isPaused ? "Wzów" : "Pauzuj"}
        </Button>
        <p>Liczba przerw: {pausesCount}</p>
      </div>
    );
  }
}

export default CurrentTimebox;
