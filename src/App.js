import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Builder from './components/Builder';

import beep1 from './assets/sounds/beep_1.wav';
import beep2 from './assets/sounds/beep_2.wav';
import beep3 from './assets/sounds/beep_3.wav';
import click1 from './assets/sounds/click_1.wav';
import click2 from './assets/sounds/click_2.wav';
import click3 from './assets/sounds/click_3.wav';
import ding1 from './assets/sounds/ding_1.wav';
import tom1 from './assets/sounds/tom_1.wav';

class App extends React.Component {

  constructor() {
    super();

    let sounds = [
      { name: "Beep 1", audioPath: beep1 },
      { name: "Beep 2", audioPath: beep2 },
      { name: "Beep 3", audioPath: beep3 },
      { name: "Click 1", audioPath: click1 },
      { name: "Click 2", audioPath: click2 },
      { name: "Click 3", audioPath: click3 },
      { name: "Ding 1", audioPath: ding1 },
      { name: "Tom 1", audioPath: tom1 }
    ];
    let beatCount = 1;
    let fractionTop = 4, fractionBottom = 4;

    let beatData = [];
    for (let sound of sounds) {
      let beats = [];
      for (let beat = 0; beat < beatCount * fractionTop; beat++) {
        beats.push({
          index: beat,
          active: beat === 0 && sounds.indexOf(sound) === 0
        });
      }
      beatData.push({
        sound: sound,
        beats: beats
      });
    }

    this.state = {
      fractionTop: fractionTop,
      fractionBottom: fractionBottom,
      bpm: 80,
      running: false,
      beatData: beatData,
      sounds: sounds,
      beatCount: beatCount
    };
    this.updateTimeSignature = this.updateTimeSignature.bind(this);
    this.updateBPM = this.updateBPM.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateBeatData = this.updateBeatData.bind(this);
    this.updateBeatCount = this.updateBeatCount.bind(this);
  }

  startMetronome() {
    let beatIndex = 0;

    let tick = function (app) {
      let delay = (1000 / (app.state.bpm / 60)) / app.state.beatCount;
      if (app.state.running) {
        let timeout = setTimeout(tick, delay, app);
        app.timeout = timeout;
      }

      if (beatIndex === app.state.fractionTop * app.state.beatCount) {
        beatIndex = 0;
      }

      for (let data of app.state.beatData) {
        if (data.beats[beatIndex].active) {
          let audio = new Audio(data.sound.audioPath);
          audio.play();
        }
      }

      beatIndex++;
    }
    tick(this);
  }

  getUpdatedBeatData(fractionTop, beatCount) {
    let beatData = this.state.beatData;
    let soundBeatCount = beatCount * fractionTop;
    for (let data of beatData) {
      if (data.beats.length >= soundBeatCount) {
        data.beats = data.beats.slice(0, soundBeatCount);
      } else {
        for (let newBeatIndex = data.beats.length; newBeatIndex < soundBeatCount; newBeatIndex++) {
          let newBeat = {
            index: newBeatIndex,
            active: false
          };
          data.beats.push(newBeat);
        }
      }
    }
    return beatData;
  }

  updateTimeSignature(fractionTop, fractionBottom) {
    fractionTop = fractionTop < 1 ? 1 : fractionTop;
    fractionBottom = fractionBottom < 1 ? 1 : fractionBottom;

    let beatData = this.getUpdatedBeatData(fractionTop, this.state.beatCount);

    this.setState({
      fractionTop: fractionTop,
      fractionBottom: fractionBottom,
      beatData: beatData
    });
  }

  updateBeatCount(beatCount) {
    beatCount = beatCount < 1 ? 1 : beatCount;

    let beatData = this.getUpdatedBeatData(this.state.fractionTop, beatCount);

    this.setState({
      beatCount: beatCount,
      beatData: beatData
    });
  }

  updateBPM(bpm) {
    let app = this;
    bpm = bpm < 1 ? 1 : bpm;
    this.setState({
      bpm: bpm
    }, () => {
      if (app.state.running && app.timeout) {
        clearTimeout(app.timeout);
        app.startMetronome();
      }
    });
  }

  updateStatus(running) {
    this.setState({
      running: running
    }, () => {
      if (running) {
        this.startMetronome();
      }
    });
  }

  updateBeatData(beatData) {
    this.setState({
      beatData: beatData
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
          updateStatus={this.updateStatus}
          beatCount={this.state.beatCount}
          updateBeatCount={this.updateBeatCount} />
        <Builder
          beatData={this.state.beatData}
          beatCount={this.state.beatCount}
          fractionTop={this.state.fractionTop}
          updateBeatData={this.updateBeatData}
        />
      </div>
    );
  }

}

export default App;
