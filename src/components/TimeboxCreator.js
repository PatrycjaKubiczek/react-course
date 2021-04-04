import React from "react";
import uuid from "uuid";
import { Button, TextField, Paper } from "@material-ui/core";

class TimeboxCreator extends React.Component {
  constructor(props) {
    super(props);
    this.titleInput = React.createRef();
    this.totalTimeInMinutesInput = React.createRef();
  }
  handleSubmit = (e) => {
    console.log(this.titleInput.current.value);
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
      <>
        <h2>Dodaj nowe zadanie</h2>
        {/* <form className="CurrentTimebox"> 
      //   <TextField
      //     inputRef={this.titleInput}
      //     label="Co robisz?"
      //     variant="outlined"
      //   />
      //   <TextField
      //     inputRef={this.totalTimeInMinutesInput}
      //     label="Ile minut?"
      //     type="number"
      //     variant="outlined"
      //   />
      // <Button variant="outlined" onClick={this.handleSubmit}>
      //     dodaj timebox
      //   </Button>
      */}
        <Paper>
          <form className="CurrentTimebox" onSubmit={this.handleSubmit}>
            <label>
              Co robisz?
              <input ref={this.titleInput} type="text" required />
            </label>
            <br />
            <label>
              Ile minut?
              <input
                ref={this.totalTimeInMinutesInput}
                type="number"
                required
              />
            </label>
            <br />
            <button>dodaj timebox</button>
            {/* <Button variant="contained" onClick={this.handleSubmit}>
              dodaj timebox
            </Button> */}
          </form>
        </Paper>
      </>
    );
  }
}

export default TimeboxCreator;
