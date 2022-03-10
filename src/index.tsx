import React from "react";
import ReactDOM from "react-dom";

import "./index.less";
import Wordle from "./Wordle";
const wasm = import("../build/wasm_wordle");

wasm.then((m) => {
  const WordleApp = () => {
    const [word, setWord] = React.useState("");
    m.init().then(() => {
        if (word.length === 0) {
            setWord(m.get_random_word());
        }
    });

    console.log("Word is ", word);

    return (
      <>
        <Wordle word={word} m={m} />
      </>
    );
  };

  ReactDOM.render(<WordleApp />, document.getElementById("root"));
});
