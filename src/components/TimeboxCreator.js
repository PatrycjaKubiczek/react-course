import React from "react";
import uuid from "uuid";

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

export default TimeboxCreator;
