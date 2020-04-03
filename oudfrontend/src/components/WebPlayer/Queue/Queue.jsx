import React, { Component } from "react";
import Extend from "../../../assets/images/icons/extend.png";
import TrackContainer from "./TrackContainer";
import { arrayMove } from "react-sortable-hoc";
import "./Queue.css";

class Queue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: "0%",
      tracks: []
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.tracks !== prevState.tracks) {
      return {
        tracks: nextProps.tracks
      };
    }
  }

  /* Open */
  openQueue = () => {
    this.setState({
      height: "60%"
    });
  };

  /* Close */
  closeQueue = () => {
    this.setState({
      height: "0%"
    });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const tracks = arrayMove(this.state.tracks, oldIndex, newIndex);
    this.setState({ tracks: tracks });
    this.props.onChangeQueueOrder(tracks);
  };
  render() {
    return (
      <div className="queue-container">
        <div className="overlay" style={{ height: this.state.height }}>
          <button className="close-btn" onClick={this.closeQueue}>
            <img src={Extend} alt="Close Queue" />
          </button>
          <TrackContainer
            tracks={this.state.tracks}
            trackId={this.props.trackId}
            playing={this.props.playing}
            onSortEnd={this.onSortEnd}
            useDragHandle={true}
            playTrack={this.props.playTrack}
          />
        </div>
      </div>
    );
  }
}

export default Queue;
