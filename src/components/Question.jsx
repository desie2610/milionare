import { memo } from "react";

import { money } from "../data/prizeLevels";

import Lifelines from "./Lifelines";

function Question({
  item,
  index,
  guaranteedPrize,
  revealStep,
  onReveal,
  lifelines,
  removed,
  selected,
  result,
  onAnswer,
  onLifeline,
}) {
  return (
    <>
      <section className="game-question">
        <div className="question-top">
          <p>Питання {index + 1} з 18</p>
          <strong>Незгораєма сума: {money(guaranteedPrize)}</strong>
        </div>

        <div
          className="prize-orbit"
          aria-label={`Потенційний виграш ${money(item.amount)}`}
        >
          <span>Потенційний виграш</span>
          <b>{money(item.amount)}</b>
        </div>

        {revealStep >= 1 && (
          <>
            <div className="question-text">{item.text}</div>

            <Lifelines lifelines={lifelines} onUse={onLifeline} />

            <div className="game-options">
              {item.options.map(
                (option, i) =>
                  i < revealStep - 1 &&
                  !removed.includes(i) && (
                    <button
                      disabled={selected !== null}
                      onClick={() => onAnswer(i)}
                      key={i}
                      className={`${selected === i ? "selected" : ""} ${
                        result === "correct" && i === item.correct ? "right" : ""
                      } ${
                        result === "wrong" && selected === i ? "wrong" : ""
                      }`}
                    >
                      {option}
                    </button>
                  ),
              )}
            </div>
          </>
        )}
      </section>

      {revealStep < 5 && (
        <button className="reveal-button" onClick={onReveal}>
          {revealStep === 0
            ? "Показати питання"
            : `Показати відповідь ${revealStep}`}
        </button>
      )}
    </>
  );
}

export default memo(Question);