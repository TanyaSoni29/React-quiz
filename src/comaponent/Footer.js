import NextButton from "./NextButton";
import Timer from "./Timer";

function Footer({ dispatch, answer, numQuestions, index, status, secondsRemaining }) {
  return (
    <footer>
      <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
      <NextButton
        dispatch={dispatch}
        answer={answer}
        numQuestions={numQuestions}
        index={index}
        status={status}
      />
    </footer>
  );
}

export default Footer;

// we can make this component as taking children so that in app we are limited prop drilling but if we have more level of prop drilling then we use reducer and main reason to use useReducer when we have multiple state which are linked together means we have update multiple state at the same time then we should use use reducer
