import React from 'react';
import './Navbar.css';
import logo from './../assets/logo.png';

class Navbar extends React.Component {

  constructor(props) {
    super();
    this.props = props;
  }

  componentDidMount() {
    this.resizeBPMInput();
    this.resizeBeatCountInput();
  }

  componentDidUpdate() {
    this.resizeBPMInput();
    this.resizeBeatCountInput();
  }

  resizeBPMInput() {
    let newSize = document.getElementById("bpmInput").value.length;
    newSize = newSize < 1 ? 1 : newSize;
    document.getElementById("bpmInput").style.width = (newSize * 13.33333) + "px";
  }

  resizeBeatCountInput() {
    let newSize = document.getElementById("beatCountInput").value.length;
    newSize = newSize < 1 ? 1 : newSize;
    document.getElementById("beatCountInput").style.width = (newSize * 13.33333) + "px";
  }

  render() {
    return (
      <nav className="navigation">
        <img src={logo} alt="BeatMaster" className="logo" />

        <button className="button" onClick={() => this.props.updateStatus(!this.props.running)}>{this.props.running ? "Stop" : "Start"}</button>

        <div className="fraction">
          <div className="fraction-input">
            <input type="number" id="topNumberInput" className="fractionInput" value={this.props.fractionTop} readOnly />
            <span className="fractionDivider"></span>
            <input type="number" id="bottomNumberInput" className="fractionInput" value={this.props.fractionBottom} readOnly />
          </div>
          <div className="fraction-control-container">
            <div className="fraction-control-top">
              <button
                className="fraction-control-button fraction-control-button-up"
                onClick={() => this.props.updateTimeSignature(this.props.fractionTop + 1, this.props.fractionBottom)}>
              </button>
              <button
                className="fraction-control-button fraction-control-button-down"
                onClick={() => this.props.updateTimeSignature(this.props.fractionTop - 1, this.props.fractionBottom)}>
              </button>
            </div>
            <div className="fraction-control-bottom">
              <button
                className="fraction-control-button fraction-control-button-up"
                onClick={() => this.props.updateTimeSignature(this.props.fractionTop, this.props.fractionBottom + 1)}>
              </button>
              <button
                className="fraction-control-button fraction-control-button-down"
                onClick={() => this.props.updateTimeSignature(this.props.fractionTop, this.props.fractionBottom - 1)}>
              </button>
            </div>
          </div>
        </div>

        <input
          type="number"
          id="bpmInput"
          className="input"
          defaultValue={this.props.bpm}
          onChange={() => this.props.updateBPM(document.getElementById("bpmInput").value)} />
        <p className="text">BPM</p>

        <input
          type="number"
          id="beatCountInput"
          className="input"
          value={this.props.beatCount}
          onChange={() => this.props.updateBeatCount(document.getElementById("beatCountInput").value)} />
        <div className="fraction-control">
          <button
            className="fraction-control-button fraction-control-button-up"
            onClick={() => this.props.updateBeatCount(this.props.beatCount + 1)}>
          </button>
          <button
            className="fraction-control-button fraction-control-button-down"
            onClick={() => this.props.updateBeatCount(this.props.beatCount - 1)}>
          </button>
        </div>

      </nav>
    );
  }
}

export default Navbar;
