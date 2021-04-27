import React from "react";
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
      title: this.titleInput.current.value,
      totalTimeInMinutes: this.totalTimeInMinutesInput.current.value,
      isEdited: false,
    });
    this.titleInput.current.value = "";
     this.totalTimeInMinutesInput.current.value = "";
  };
  render() {
    return (
      <>
        <h2>Dodaj nowe zadanie</h2>
        <form className="CurrentTimebox"> 
         <TextField
          inputRef={this.titleInput}
          label="Co robisz?"
          variant="outlined"
        />
        <TextField
          inputRef={this.totalTimeInMinutesInput}
          label="Ile minut?"
          type="number"
          variant="outlined"
        />
      <Button variant="outlined" onClick={this.handleSubmit}>
          dodaj timebox
        </Button>
     </form>
       
      </>
    );
  }
}

export default TimeboxCreator;
