import "./App.css";
import React, { useReducer } from "react";
import { RoundsCounter, Timer } from "./components";

const initialState = {
  rounds: 0,
  workTime: 25 * 60,
  restTime: 5 * 60,
  onWork: true,
  timeLeft: 25 * 60,
  intervalId: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ROUNDS":
      return { ...state, rounds: action.payload };
    case "SET_ON_WORK":
      return { ...state, onWork: action.payload };
    case "SET_TIME_LEFT":
      return { ...state, timeLeft: action.payload };
    case "SET_INTERVAL_ID":
      return { ...state, intervalId: action.payload };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleFinishedTime = () => {
    clearInterval(state.intervalId);
    setTimeout(() => {
      dispatch({ type: "SET_ON_WORK", payload: !state.onWork });
      if (state.onWork) {
        dispatch({ type: "SET_ROUNDS", payload: state.rounds + 1 });
      }
      dispatch({ type: "SET_TIME_LEFT", payload: state.onWork ? state.workTime : state.restTime });
    }, 2000);
  };

  const startTimer = () => {
    const id = setInterval(() => {
      dispatch({ type: "SET_TIME_LEFT", payload: (prevTime) => {
        if (prevTime === 0) {
          clearInterval(id);
          handleFinishedTime();
          return 0;
        }
        return prevTime - 1;
      }});
    }, 1000);
    dispatch({ type: "SET_INTERVAL_ID", payload: id });
  };

  const timeFormat = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
  };

  return (
    <div className="App">
      <h1>Pomodoro Timer</h1>
      <Timer timeFormat={timeFormat} timeLeft={state.timeLeft} />
      <RoundsCounter rounds={state.rounds} />
      <button onClick={startTimer}>Iniciar</button>
    </div>
  );
}

export default App;
