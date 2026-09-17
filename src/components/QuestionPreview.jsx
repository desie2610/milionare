import { money } from "../data/prizeLevels";
const letters = ["A", "B", "C", "D"];
export default function QuestionPreview({ questions, onEdit, onPlay }) {
  return (
    <main className="review page">
      <header>
        <p className="eyebrow">Усе готово</p>
        <h2>Перевірка питань</h2>
        <p>Перегляньте набір перед початком гри.</p>
      </header>
      <section className="question-list">
        {questions.map((q, i) => (
          <details className="glass" key={i} open={i === 0}>
            <summary>
              <span>
                {i + 1}. {money(q.amount)}
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onEdit(i);
                }}
              >
                Редагувати
              </button>
            </summary>
            <p className="preview-question">{q.text}</p>
            {q.options.map((option, n) => (
              <p key={n} className={n === q.correct ? "correct-preview" : ""}>
                {letters[n]}) {option}
                {n === q.correct && " ✓"}
              </p>
            ))}
          </details>
        ))}
      </section>
      <button className="primary play-button" onClick={onPlay}>
        Перейти до гри <b></b>
      </button>
    </main>
  );
}
