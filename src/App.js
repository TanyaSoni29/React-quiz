// import DateCounter from "./comaponent/DateCounter";
import { useEffect } from "react";
import Header from "./comaponent/Header";
import { useReducer } from "react";
import Main from "./comaponent/Main";
import Loader from "./comaponent/Loader";
import Error from "./comaponent/Error";
import StartScreen from "./comaponent/StartScreen";
import Question from "./comaponent/Question";
import Progress from "./comaponent/Progress";
import FinishScreen from "./comaponent/FinishScreen";
import Footer from "./comaponent/Footer";

const SEC_PER_QUESTIONS = 30;
const initialState = {
  questions: [],

  // loading, error, ready, active, finished we can divide the status
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions * SEC_PER_QUESTIONS,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    // return { ...state, answer: null, status: "ready", index: 0, points: 0, highscore: 0 }; this could also be used...
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unknown Action");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    questions,
    status,
    answer,
    index,
    points,
    highscore,
    secondsRemaining,
  } = state;
  const numQuestions = questions.length;
  const totalPoints = questions?.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch("http://localhost:8000/questions");
        const arrayQuestions = await data.json();
        dispatch({ type: "dataReceived", payload: arrayQuestions });
      } catch (error) {
        console.log(error);
        dispatch({ type: "dataFailed" });
      }
    }
    fetchData();
  }, []);

  console.log(questions);

  return (
    <div className="app">
      {/* <DateCounter /> */}
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen length={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer
              dispatch={dispatch}
              answer={answer}
              numQuestions={numQuestions}
              index={index}
              status={status}
              secondsRemaining={secondsRemaining}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
