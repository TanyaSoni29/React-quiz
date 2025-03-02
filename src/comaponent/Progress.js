function Progress({ index, numQuestions, points, totalPoints, answer }) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {totalPoints}
      </p>
    </header>
  );
}

export default Progress;

// when answer is null then index + 0 ans Number function treat false value as 0 and answer does not equal to  null then Number treat true value as 1 and we have index + 1 in this way whenever we click on answer our progress will move
