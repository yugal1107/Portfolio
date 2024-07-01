// Desc: This file contains the code to animate the text on the projects page.
import { React, useEffect } from "react";
import "../custom.css";
import anime from "animejs/lib/anime.es.js";

const TextAnimation = (props) => {
  useEffect(() => {
    var textWrapper = document.querySelector(".ml9 .letters");
    textWrapper.innerHTML = textWrapper.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );

    anime
      .timeline({ loop: true })
      .add({
        targets: ".ml9 .letter",
        scale: [0, 1],
        duration: 2000,
        elasticity: 600,
        delay: (el, i) => 45 * (i + 1),
      })
      .add({
        targets: ".ml9",
        opacity: 0,
        duration: 500,
        easing: "easeOutExpo",
        delay: 1000,
      });
  }, []);

  return (
    <h2 className="ml9 mb-5">
      <span className="text-wrapper">
        <span className="letters text-5xl text-yellow-300 font-normal">
          {props.text}
        </span>
      </span>
    </h2>
  );
};

export default TextAnimation;
