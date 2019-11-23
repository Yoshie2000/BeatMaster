import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import downSoundPath from './assets/sounds/bang/Metronome.wav';
import upSoundPath from './assets/sounds/bang/MetronomeUp.wav';
import Builder from './components/Builder';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      fractionTop: 4,
      fractionBottom: 4,
      bpm: 80,
      running: false,
      interval: null
    };
    this.updateTimeSignature = this.updateTimeSignature.bind(this);
    this.updateBPM = this.updateBPM.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
  }

  startMetronome() {
    let upSound = new Audio(upSoundPath);
    let downSound = new Audio(downSoundPath);

    let measureIndex = 0;

    let delay = 1000 / (this.state.bpm / 60);
    let interval = setInterval(() => {

      let sound = downSound;

      if (measureIndex === this.state.fractionTop || measureIndex === 0) {
        measureIndex = 0;
        sound = upSound;
      }

      sound.play();

      measureIndex++;

    }, delay);

    this.setState({
      interval: interval
    });

  }

  updateTimeSignature(fractionTop, fractionBottom) {
    fractionTop = fractionTop < 1 ? 1 : fractionTop;
    fractionBottom = fractionBottom < 1 ? 1 : fractionBottom;
    this.setState({
      fractionTop: fractionTop,
      fractionBottom: fractionBottom
    });
  }

  updateBPM(bpm) {
    bpm = bpm < 1 ? 1 : bpm;
    this.setState({
      bpm: bpm
    });
  }

  updateStatus(running) {
    if (running) {
      this.startMetronome();
    } else {
      clearInterval(this.state.interval);
    }
    this.setState({
      running: running
    });
  }

  render() {
    return (
      <div>
        <Navbar
          fractionTop={this.state.fractionTop}
          fractionBottom={this.state.fractionBottom}
          updateTimeSignature={this.updateTimeSignature}
          bpm={this.state.bpm}
          updateBPM={this.updateBPM}
          running={this.state.running}
          updateStatus={this.updateStatus}>
        </Navbar>
        <Builder />
      </div>
    );
  }

}

export default App;
