import React from 'react';
import './Builder.css';

class Builder extends React.Component {

  constructor(props) {
    super();
    this.props = props;
    this.state = {
      beatData: this.props.beatData
    };
  }

  toggleBeat(soundIndex, beatIndex) {
    let beatData = this.state.beatData;
    beatData[soundIndex].beats[beatIndex].active = !beatData[soundIndex].beats[beatIndex].active;
    this.setState({
      beatData: beatData
    });
    this.props.updateBeatData(beatData);
  }

  render() {
    // ! CREATE TABLE HEADER
    let headCols = [];
    let firstHeadCol = (
      <th key={0}></th>
    );
    headCols.push(firstHeadCol);

    for (let beatIndex = 0; beatIndex < this.props.beatCount * this.props.fractionTop; beatIndex++) {
      let headCol = (
        <th key={beatIndex + 1}>{beatIndex % this.props.beatCount === 0 ? `${beatIndex / this.props.beatCount + 1}` : ""}</th>
      );
      headCols.push(headCol);
    }

    // ! CREATE TABLE ROWS
    let rows = [];
    for (let soundIndex = 0; soundIndex < this.state.beatData.length; soundIndex++) {
      let beatData = this.state.beatData[soundIndex];

      // ! CREATE TABLE COLUMNS FOR CURRENT ROW
      let cols = [];
      let firstCol = (
        <th key={beatData.sound.name} className="text-right">{beatData.sound.name}</th>
      );
      cols.push(firstCol);

      for (let beatIndex = 0; beatIndex < beatData.beats.length; beatIndex++) {
        let col = (
          <td
            key={`${beatData.sound.name}-${beatIndex}`}
            onMouseDown={() => this.toggleBeat(soundIndex, beatIndex)}
            onMouseEnter={() => {
              if (this.props.mouseDown)
                this.toggleBeat(soundIndex, beatIndex)
            }}
            className={beatData.beats[beatIndex].active ? "active" : ""}>
          </td>
        );
        cols.push(col);
      }

      // ! ADD COLUMNS TO ROW
      let row = (
        <tr key={beatData.sound.name}>
          {cols}
        </tr>
      )
      rows.push(row);
    }

    return (
      <div className="builder">
        <table className="builder-table" id="builder-table">
          <thead>
            <tr>
              {headCols}
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
          <span id="metronome-bar"></span>
        </table>
      </div>
    );
  }
}

export default Builder;
