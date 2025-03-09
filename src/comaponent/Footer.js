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
