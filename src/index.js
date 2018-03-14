import React, { Component } from "react";
import { render } from "react-dom";
import { Steps } from "intro.js-react";

import "intro.js/introjs.css";
import "./index.css";

import { Map, TileLayer, Marker, Popup } from "react-leaflet";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stepsEnabled: true,
      initialStep: 0,
      steps: [
        {
          element: ".hello",
          intro: "Hello step"
        },
        {
          element: ".world",
          intro: "World step"
        }
      ]
    };
  }

  render() {
    const { stepsEnabled, steps, initialStep } = this.state;
    const position = [51.505, -0.09];

    return (
      <div>
        <Steps
          enabled={stepsEnabled}
          steps={steps}
          initialStep={initialStep}
          onExit={this.onExit}
        />

        <div className="controls">
          <div>
            <button onClick={this.toggleSteps}>Toggle Steps</button>
          </div>
        </div>
        <div>
          <Map center={position} zoom={13}>
            <TileLayer
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                <span>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </span>
              </Popup>
            </Marker>
          </Map>
        </div>
      </div>
    );
  }

  onExit = () => {
    this.setState(() => ({ stepsEnabled: false }));
  };

  toggleSteps = () => {
    this.setState(prevState => ({ stepsEnabled: !prevState.stepsEnabled }));
  };

  addStep = () => {
    const newStep = {
      element: ".alive",
      intro: "Alive step"
    };

    this.setState(prevState => ({ steps: [...prevState.steps, newStep] }));
  };

  toggleHints = () => {
    this.setState(prevState => ({ hintsEnabled: !prevState.hintsEnabled }));
  };

  addHint = () => {
    const newHint = {
      element: ".alive",
      hint: "Alive hint",
      hintPosition: "middle-right"
    };

    this.setState(prevState => ({ hints: [...prevState.hints, newHint] }));
  };
}

render(<App />, document.getElementById("root"));
