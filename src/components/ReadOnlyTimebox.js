import React from "react";

class Timebox extends React.Component {
  state = {
    updatedTitle: this.props.title,
    updatedTotalTimeInMinutes: this.props.totalTimeInMinutes,
    id: this.props.id,
  };

  render() {
    const {
      title,
      totalTimeInMinutes,
    } = this.props;
    return (
      <div className="Timebox">
          <h3>
            {title} - {totalTimeInMinutes}{" "}
          </h3>
        
      </div>
    );
  }
}

export default Timebox;
