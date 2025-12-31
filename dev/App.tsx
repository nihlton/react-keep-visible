import React from "react";
import KeepVisible from "../src/react-keep-visible";
import "simpl-grid";

import "./App.css";

const words0 = [
  "flabbergasted",
  "persnickety",
  "bumfuzzled",
  "rambunctious",
  "winsome",
  "splendiferous",
  "fastidious",
  "serendipitous",
  "finicky",
  "mellifluous",
  "woebegone",
  "highfalutin",
  "scrumptious",
];
const words1 = [
  "hullabaloo",
  "shenanigans",
  "snollygoster",
  "taradiddle",
  "collywobbles",
  "haberdashery",
  "rigmarole",
  "pumpernickel",
  "balderdash",
  "curmudgeon",
  "doohickey",
  "kumquat",
  "lollygagging",
  "persnickety",
  "thingamajig",
];

const getWords = () => `${words0[Math.floor(Math.random() * words0.length)]} ${words1[Math.floor(Math.random() * words1.length)]}`;

function App() {
  return (
    <div className="App">
      <header>
        <div>Site Header</div>
      </header>
      <div className="main-content">
        <div className="row">
          <div className="small-12 no-cell-padding">
            <h1>Keeping small elements visible is easy</h1>
          </div>
          <div className="small-4 medium-3 outlined no-cell-padding">
            <KeepVisible top={"var(--header-height)"}>
              <aside>
                <div className="padded">keep this visible</div>
              </aside>{" "}
            </KeepVisible>
          </div>
          <div className="small-8 medium-9 outlined" style={{ padding: "1em" }}>
            <p>
              <strong>
                When the element is shorter than the view port, this component simply leverages <em>&apos;position: sticky&apos;</em>
              </strong>
            </p>
            <p>
              Lorem Waistcoat helvetica brooklyn offal plaid hell of XOXO messenger bag bespoke umami succulents williamsburg. Raw denim activated
              charcoal church-key mixtape narwhal health goth mlkshk freegan glossier enamel pin poke. Cold-pressed paleo fixie YOLO pork belly
              whatever. Quinoa twee knausgaard you probably haven&apos;t heard of them, keytar street art activated charcoal fingerstache echo park
              mustache put a bird on it migas deep v selvage. Raw denim art party retro seitan small batch offal tumeric cardigan street art
              pinterest.
            </p>
          </div>

          <div className="small-12">
            <h1>Tall elements are trickier</h1>
            <ul className="head">
              <li>
                The desired behavior is for the element to &apos;sit still&apos; till we&apos;ve scrolled down to the bottom, or up to the top - then
                stick to that leading edge.
              </li>
              <li>This allows use to view the entire content of the elment, without scrolling to the edge of the parent.</li>
            </ul>
          </div>
          <div className="big-demo small-7 medium-9 outlined"></div>

          <div className="big-demo-aside small-5 medium-3 outlined">
            <KeepVisible top={"calc(var(--header-height) + 1rem)"} bottom={"2rem"}>
              <aside>
                <ul className="demo">
                  {Array(35)
                    .fill("")
                    .map((_n, i) => (
                      <li key={i}>{getWords()}</li>
                    ))}
                </ul>
              </aside>
            </KeepVisible>
          </div>
        </div>
      </div>
      <footer>footer</footer>
    </div>
  );
}

export default App;
