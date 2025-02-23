// import DateCounter from "./comaponent/DateCounter";
import { useEffect } from "react";
import Header from "./comaponent/Header";
import { useReducer } from "react";
import { type } from "@testing-library/user-event/dist/type";

const initialState = {
  questions: [],

  // loading, error, ready, active, finished
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      throw new Error("Unknown Action");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch("http://localhost:8000/questions");
        const questions = await data.json();
        console.log(questions);
        dispatch({ type: "dataReceived", payload: questions });
      } catch (error) {
        console.log(error);
        dispatch({ type: "dataFailed" });
      }
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      {/* <DateCounter /> */}
      <Header />
    </div>
  );
}

export default App;
