import MoneyLadder from "./MoneyLadder";

export default function RoundTransition({
  questionNumber,
  guarantees,
  onNext,
}) {
  return (
    <main className="round-transition screen-center">
      <section className="round-ladder-wrap">
        <p className="eyebrow">Підготовка до раунду</p>
        <MoneyLadder
          current={questionNumber - 1}
          completed={questionNumber - 1}
          guarantees={guarantees}
        />
      </section>
      <button className="next-question-label" onClick={onNext}>
        Переходимо до {questionNumber} питання
      </button>
    </main>
  );
}
