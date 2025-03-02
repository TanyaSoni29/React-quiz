function FinishScreen({ points, totalPoints, highscore, dispatch }) {
  const percentage = (points / totalPoints) * 100;
  let emoji;
  if (percentage === 100) return (emoji = "🥇");
  if (percentage >= 80 && percentage < 100) return (emoji = "🎉");
  if (percentage >= 50 && percentage < 80) return (emoji = "😇");
  if (percentage >= 0 && percentage < 50) return (emoji = "🤔");
  if (percentage === 0) return (emoji = "🤦‍♂️");

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You Scored <strong>{points}</strong> out of{" "}
        {totalPoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
