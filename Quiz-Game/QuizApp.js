import React, { useState, useEffect, useRef, useCallback } from "react";
import questions from "./questions";
import "./QuizApp.css";

function QuizApp() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [review, setReview] = useState([]);
  const [timer, setTimer] = useState(15);
  const intervalRef = useRef(null);

  const handleNext = useCallback(() => {
    const q = questions[current];
    const correct = selected === q.answer;
    setReview((prev) => [
      ...prev,
      {
        question: q.question,
        selected: selected || "No answer",
        correct: q.answer,
        explanation: q.explanation,
        isCorrect: correct,
      },
    ]);
    if (correct) setScore((prev) => prev + 1);

    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
      setSelected("");
      setTimer(15);
    } else {
      setShowResults(true);
      clearInterval(intervalRef.current);
    }
  }, [current, selected]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          handleNext();
          return 15;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [handleNext]);

  if (showResults) {
    return (
      <div className="quiz-container">
        <h2>Quiz Completed!</h2>
        <p>
          Your Score: {score} / {questions.length}
        </p>
        <h3>Review:</h3>
        {review.map((r, i) => (
          <div key={i} className="review-card">
            <p>
              <strong>Q{i + 1}:</strong> {r.question}
            </p>
            <p>
              Your Answer:{" "}
              <span className={r.isCorrect ? "correct" : "wrong"}>
                {r.selected}
              </span>
            </p>
            {!r.isCorrect && (
              <p>
                Correct Answer: <strong>{r.correct}</strong>
              </p>
            )}
            <p>
              <em>{r.explanation}</em>
            </p>
          </div>
        ))}
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="quiz-container">
      <div className="question-card">
        <div className="timer">Time Left: {timer}s</div>
        <h3>{q.question}</h3>
        <ul className="options">
          {q.options.map((opt, i) => (
            <li key={i}>
              <label>
                <input
                  type="radio"
                  name="option"
                  value={opt}
                  checked={selected === opt}
                  onChange={() => setSelected(opt)}
                />
                {opt}
              </label>
            </li>
          ))}
        </ul>
        <button onClick={handleNext} disabled={!selected}>
          {current + 1 < questions.length ? "Next" : "Finish"}
        </button>
        <div className="progress-bar">
          <div
            style={{
              width: `${((current + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default QuizApp;
