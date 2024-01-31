import { useState, useEffect } from "react";
import "../css/terminal.css";
import HackerSimulator from "./HackSimulator";
const Typewriter = (text, delay, func, Spinner, spinTime) => {
  const startTime = new Date();
  let Output = "";
  let index = 0;
  text = Spinner ? "⠋⠙⠹⠸⠼⠴⠦⠧⠇" : text;

  const intervalId = setInterval(() => {
    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        return clearInterval(intervalId);
      }
    });

    const endTime = new Date();
    if (index < text.length) {
      Output += text[index];
      index += 1;

      if (Spinner) {
        func(text[index]);
        setTimeout(function () {
          func(text[index + 1]);
        }, 700);
        if (index === 8) {
          if (endTime.getTime() - startTime.getTime() < spinTime) {
            index = 0;
          } else {
            clearInterval(intervalId);
          }
        }
      } else {
        func(Output);
      }
    } else {
      return clearInterval(intervalId);
    }
  }, delay);
};

function Terminal() {
  const [Text1, setText1] = useState("");
  const [Text2, setText2] = useState("");
  const [Text3, setText3] = useState("");
  const [Text4, setText4] = useState("");
  const cursor = "▮";
  let previousCommand;

  const [prevusedCommand, setprevusedCommand] = useState([]);

  function SkipIntro() {
    let id = setTimeout(() => {}, 0);
    while (id--) {
      clearTimeout(id);
    }

    id = setInterval(() => {}, 0);
    while (id--) {
      clearInterval(id);
    }
    setText1("ssh guest@renisal.me");
    setText3("Access Granted!");
  }

  useEffect(() => {
    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        if (!Text3.includes("Access")) {
          let id = setTimeout(() => {}, 0);
          while (id--) {
            clearTimeout(id);
          }

          id = setInterval(() => {}, 0);
          while (id--) {
            clearInterval(id);
          }
          setText1("ssh guest@renisal.me");
          setText2("guest@renisal.me's password:");
          setText3("Access Granted!");
        }
        const CommandArea = document.getElementById("command");
        if (CommandArea) {
          previousCommand = CommandArea.value;
          setprevusedCommand((prevArray) => [
            ...prevArray,
            "guest@renisal.me:~$ " + previousCommand,
          ]);
          if (CommandArea.value === "github") {
            window.open("https://github.com/montymahato", "_blank");
          } else if (CommandArea.value === "mysite") {
            window.open("https://renisal.me", "_blank");
          } else if (CommandArea.value === "source") {
            window.open(
              "https://github.com/montymahato/terminal-portfolio",
              "_blank"
            );
          }
          CommandArea.value = "";
        }
      }
    });

    Typewriter("ssh guest@renisal.me", 100, setText1);

    setTimeout(() => {
      setText2("guest@renisal.me's password:▮");
    }, 3000);

    setTimeout(() => {
      Typewriter("", 100, setText4, true, 2500);
    }, 4300);

    setTimeout(() => {
      setText3("Connecting to guest@renisal.me...");
    }, 4300);

    setTimeout(() => {
      setText2("guest@renisal.me's password:");
      setText3("> Access granted.");
    }, 7300);
  }, []);

  return (
    <div className="terminal">
      <div className="console">
        <span className="userPrefix">
          user@localhost:~$
          <span style={{ color: "white", marginLeft: "8px" }}>
            {Text1}
            {Text1.length === 20 ? "" : cursor}
          </span>
        </span>

        {Text3.includes("Access") ? (
          ""
        ) : (
          <span id="skipButton" onClick={SkipIntro}>
            Press Enter or Click Here to Skip
          </span>
        )}
        {Text2}
        <span>
          {" "}
          {Text4}{" "}
          <span style={{ color: Text3.includes("Access") ? "yellow" : "" }}>
            {Text3}
          </span>
        </span>
        <br />
        {Text3.includes("Access") ? (
          <pre>
            {`              _______                  _             _ 
             |__   __|                (_)           | |
       _ __ ___ | | ___ _ __ _ __ ___  _ _ __   __ _| |
      | '_ \` _ \\| |/ _ \\ '__| '_ \` _ \\| | '_ \\ / _\` | |
      | | | | | | |  __/ |  | | | | | | | | | | (_| | |
      |_| |_| |_|_|\\___|_|  |_| |_| |_|_|_| |_|\\__,_|_|
                                                
    `}
          </pre>
        ) : null}

        <br></br>

        {Text3.includes("Access") ? (
          <span className="commands">
            <span className="userPrefix">guest@renisal.me:~$</span>{" "}
            <input type="text" id="command" name="command" autoFocus></input>
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Terminal;
