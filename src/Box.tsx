import React, { useEffect } from "react";
import { animated, useSpring } from "react-spring";
import Wordle from "./Wordle";

type Props = {
  index: number;
  letter: string;
  word: string;
  validate: boolean;
  highlight: boolean;
};

export default function Box({ letter, validate, word, index, highlight }: Props) {
  // component with transform using translate3d

  var background = "transparent";
  if (validate && letter.toLowerCase() === word.charAt(index)) {
    background = "green";
  } else if (validate && word.indexOf(letter.toLowerCase()) > -1) {
    background = "#f39c12";
  }

  const { transform } = useSpring({
    transform: `perspective(48px) rotateX(360deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <animated.div
      className={`box ${validate ? "validated" : ""} ${highlight ? "highlight" : ""}`}
      style={{ background, transform }}
    >
      {letter}
    </animated.div>
  );
}
