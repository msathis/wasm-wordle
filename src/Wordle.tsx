import React, { Component, KeyboardEvent } from "react";
import Box from "./Box";

type Props = {
  word: string;
  m: any;
};

type State = {
  tries: string[];
  curr: number;
  over: boolean;
};

const range = (n: number) => Array.from({ length: n }, (value, key) => key);

const isLetter = (key: String) =>
  (key.length == 1 && key >= "a" && key <= "z") ||
  (key.length == 1 && key >= "A" && key <= "Z");

export default class Wordle extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tries: ["", "", "", "", "", ""],
      curr: 0,
      over: false,
    };
  }

  gameOverText = () => {
    const { curr } = this.state;
    if (curr === 1) {
      return "Fabulous!";
    } else if (curr === 2) {
      return "Fantastic!";
    } else if (curr === 3) {
      return "Marvelous!";
    } else if (curr === 4) {
      return "Excellant!";
    } else if (curr === 5) {
      return "Great Job!";
    } else if (curr === 6) {
      return "Good Job!";
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.updateCurr);
  }

  updateCurr = (ev: Event): any => {
    const { key, keyCode } = ev as unknown as KeyboardEvent;
    const { curr, tries, over } = this.state;
    const { m, word } = this.props;

    if (over) {
      return;
    } else if (keyCode === 13 && tries[curr].length == 5) {
      if (m.is_word(tries[curr].toLowerCase())) {
        this.setState({
          curr: curr + 1,
          over: tries[curr].toLowerCase() == word,
        });
        return;
      }
    } else if (keyCode === 8 || keyCode == 46) {
      tries[curr] = tries[curr].slice(0, tries[curr].length - 1);
    } else if (tries[curr].length < 5 && isLetter(key.toLowerCase())) {
      tries[curr] += key.toUpperCase();
    }
    this.setState({
      tries,
    });
  };

  render() {
    const { word } = this.props;
    const { tries, curr, over } = this.state;

    if (word.length === 0) {
      return <div className="wordle">Loading...</div>;
    }

    return (
      <>
        {
          <div className={`game-over ${over ? "show" : ""}`}>
            <p>{this.gameOverText()}</p>
            <img src="/well-done.svg" />
          </div>
        }
        <div className="wordle">
          {tries.map((w, i) => (
            <div key={i} className="row">
              {range(5).map((j) => (
                <Box
                  key={j}
                  highlight={!over && i === curr && j == w.length}
                  validate={curr > i}
                  index={j}
                  word={word}
                  letter={w.charAt(j)}
                />
              ))}
            </div>
          ))}
        </div>
      </>
    );
  }
}
