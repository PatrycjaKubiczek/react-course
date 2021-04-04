import React from "react";
import ReactDOM from "react-dom";
import uuid from "uuid";

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

function ProgressBar({ className = "", percent = 44 }) {
  return (
    <div className={"ProgressBar " + className}>
      <div style={{ width: `${percent}%` }}></div>
    </div>
  );
}

function TimeboxEditor(props) {
  const {
    title,
    totalTimeInMinutes,
    isEditable,
    onTitleChange,
    onTotalTimeInInputOnChange,
    onConfirm,
  } = props;
  return (
    <div className={`TimeboxEditor ${isEditable ? "" : "inactive"}`}>
      <label>
        Co robisz?
        <input
          disabled={!isEditable}
          value={title}
          onChange={onTitleChange}
          type="text"
        />
      </label>
      <br />
      <label>
        Ile minut?
        <input
          disabled={!isEditable}
          value={totalTimeInMinutes}
          onChange={onTotalTimeInInputOnChange}
          type="number"
        />
      </label>
      <br />
      <button disabled={!isEditable} onClick={onConfirm}>
        zatwierdź zmiany
      </button>
    </div>
  );
}

class TimeboxCreator extends React.Component {
  constructor(props) {
    super(props);
    this.titleInput = React.createRef();
    this.totalTimeInMinutesInput = React.createRef();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onCreate({
      id: uuid.v4(),
      title: this.titleInput.current.value,
      totalTimeInMinutes: this.totalTimeInMinutesInput.current.value,
      isEdited: false,
    });
    this.titleInput = "";
    this.totalTimeInMinutesInput = "";
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="CurrentTimebox">
        <label>
          Co robisz?
          <input ref={this.titleInput} type="text" />
        </label>
        <br />
        <label>
          Ile minut?
          <input ref={this.totalTimeInMinutesInput} type="number" />
        </label>
        <br />
        <button>dodaj timebox</button>
      </form>
    );
  }
}

class TimeboxList extends React.Component {
  state = {
    timeboxes: [
      {
        id: uuid.v4(),
        title: "uczę się list",
        totalTimeInMinutes: 25,
        isEdited: false,
      },
      {
        id: uuid.v4(),
        title: "uczę się formularzy",
        totalTimeInMinutes: 15,
        isEdited: false,
      },
      {
        id: uuid.v4(),
        title: "uczę się komponentów",
        totalTimeInMinutes: 5,
        isEdited: false,
      },
    ],
  };
  addTimebox = (timebox) => {
    this.setState((prevState) => {
      const timeboxes = [timebox, ...prevState.timeboxes];
      return { timeboxes };
    });
  };
  removeTimebox = (indexToRemove) => {
    this.setState((prevState) => {
      const timeboxes = prevState.timeboxes.filter(
        (timebox, index) => !index == indexToRemove
      );
      return { timeboxes };
    });
  };
  updateTimebox = (indexToUpdate, updatedTimebox) => {
    this.setState((prevState) => {
      const timeboxes = prevState.timeboxes.map((timebox, index) =>
        index === indexToUpdate ? updatedTimebox : timebox
      );
      return { timeboxes };
    });
  };
  handleCreate = (createdTimebox) => {
    this.addTimebox(createdTimebox);
  };
  handleSave = (indexToUpdate, updatedTimebox) => {
    console.log(updatedTimebox);
    this.setState((prevState) => {
      const timeboxes = prevState.timeboxes.map((timebox, index) =>
        index === indexToUpdate ? updatedTimebox : timebox
      );
      return { timeboxes };
    });
  };
  handleEdit = (indexToUpdate) => {
    this.setState((prevState) => {
      const timeboxes = prevState.timeboxes.map((timebox, index) =>
        index === indexToUpdate ? { ...timebox, isEdited: true } : timebox
      );
      return { timeboxes };
    });
  };
  render() {
    return (
      <>
        <TimeboxCreator onCreate={this.handleCreate} />
        {this.state.timeboxes.map((timebox, index) => (
          <Timebox
            key={timebox.id}
            index={index}
            id={timebox.id}
            title={timebox.title}
            totalTimeInMinutes={timebox.totalTimeInMinutes}
            onDelete={() => this.removeTimebox(index)}
            onEdit={() => this.handleEdit(index)}
            onSave={this.handleSave}
            isEdited={timebox.isEdited}
          />
        ))}
      </>
    );
  }
}
class Timebox extends React.Component {
  state = {
    updatedTitle: this.props.title,
    updatedTotalTimeInMinutes: this.props.totalTimeInMinutes,
  };
  constructor(props) {
    super(props);
  }
  handleTitleChange = (e) => {
    this.setState({ updateTitle: e.target.value });
  };
  handleMinutesChange = (e) => {
    this.setState({ updatedTotalTimeInMinutes: e.target.value });
  };
  handleSubmit = (e) => {
    console.log(this.props.timebox);
    this.props.onSave(this.props.index, {
      ...this.props.timebox,
      title: this.state.updatedTitle,
      totalTimeInMinutes: this.state.updatedTotalTimeInMinutes,
      isEdited: false,
    });
  };

  render() {
    const {
      title,
      totalTimeInMinutes,
      onDelete,
      onEdit,
      onSave,
      isEdited,
      index,
      id,
    } = this.props;
    return (
      <div className="Timebox">
        {!isEdited && (
          <h3>
            {title} - {totalTimeInMinutes}{" "}
          </h3>
        )}
        {isEdited && (
          <form>
            <input
              className="updateInput"
              type="text"
              value={this.state.updatedTitle}
              onChange={this.handleTitleChange}
            />
            <input
              className="updateInput"
              type="number"
              value={this.state.updatedTotalTimeInMinutes}
              onChange={this.handleMinutesChange}
            />
          </form>
        )}

        {!isEdited && <button onClick={onEdit}>edytuj</button>}
        {isEdited && <button onClick={this.handleSubmit}>zapisz</button>}
        <button onClick={onDelete}>usuń</button>
      </div>
    );
  }
}

class CurrentTimebox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      isPaused: false,
      pausesCount: 0,
      elapsedTimeInSeconds: 0,
    };

    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.togglePause = this.togglePause.bind(this);
  }

  handleStart(event) {
    this.setState({
      isRunning: true,
    });
    this.startTimer();
  }

  startTimer() {
    this.intervalId = window.setInterval(() => {
      this.setState((prevState) => ({
        elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 0.1,
      }));
    }, 100);
  }
  stopTimer() {
    window.clearInterval(this.intervalId);
  }

  handleStop(event) {
    this.setState({
      isPaused: false,
      isRunning: false,
      pausesCount: 0,
      elapsedTimeInSeconds: 0,
    });
    this.stopTimer();
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
    const minutesLeft = Math.floor(timeLeftInSeconds / 60);
    const secondsLeft = Math.floor(timeLeftInSeconds % 60);
    const progressPercent = (elapsedTimeInSeconds / totalTimeInSeconds) * 100;
    return (
      <div className={`CurrentTimebox ${isEditable ? "inactive" : ""}`}>
        <h2>{title}</h2>
        <Clock
          minutes={minutesLeft}
          seconds={secondsLeft}
          className={isPaused ? "inactive" : ""}
        />
        <ProgressBar
          percent={progressPercent}
          className={isPaused ? "inactive" : ""}
        />
        <button onClick={onEdit} disabled={isEditable}>
          Edytuj
        </button>
        <button onClick={this.handleStart} disabled={isRunning}>
          Start
        </button>
        <button onClick={this.handleStop} disabled={!isRunning}>
          Stop
        </button>
        <button onClick={this.togglePause} disabled={!isRunning}>
          {isPaused ? "Wzów" : "Pauzuj"}
        </button>
        <p>Liczba przerw: {pausesCount}</p>
      </div>
    );
  }
}
class EditableTimebox extends React.Component {
  state = {
    title: "Uczę się kontrolowanych komponentów",
    totalTimeInMinutes: 15,
    isEditable: true,
  };
  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };
  handleTotalTimeInMinutesChange = (event) => {
    this.setState({ totalTimeInMinutes: event.target.value });
  };
  handleConfirm = () => {
    this.setState({ isEditable: false });
  };
  handleEdit = () => {
    this.setState({ isEditable: true });
  };
  render() {
    const { title, totalTimeInMinutes, isEditable } = this.state;
    return (
      <>
        <TimeboxEditor
          title={title}
          totalTimeInMinutes={totalTimeInMinutes}
          isEditable={isEditable}
          onTitleChange={this.handleTitleChange}
          onTotalTimeInInputOnChange={this.handleTotalTimeInMinutesChange}
          onConfirm={this.handleConfirm}
        />
        <CurrentTimebox
          title={title}
          totalTimeInMinutes={totalTimeInMinutes}
          isEditable={isEditable}
          onEdit={this.handleEdit}
        />
      </>
    );
  }
}
function App() {
  return (
    <div className="App">
      <TimeboxList />
      <EditableTimebox />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
