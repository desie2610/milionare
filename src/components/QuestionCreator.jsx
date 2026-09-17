import { money } from "../data/prizeLevels";
const letters = ["A", "B", "C", "D"];
export default function QuestionCreator({
  index,
  question,
  onChange,
  onSave,
  error,
  editing,
}) {
  const update = (key, value) => onChange({ ...question, [key]: value });
  const options = question.options || ["", "", "", ""];
  return (
    <main className="creator page">
      <header>
        <p className="eyebrow">Конструктор гри</p>
        <h2>
          {editing ? "Редагування питання" : `Питання №${index + 1}`}{" "}
          <em>— {money(question.amount)}</em>
        </h2>
        <div className="progress">
          <i style={{ width: `${((index + 1) / 18) * 100}%` }} />
        </div>
      </header>
      <section className="editor glass">
        <label>
          Питання
          <textarea
            value={question.text || ""}
            onChange={(e) => update("text", e.target.value)}
            placeholder="Введіть питання..."
            autoFocus
          />
        </label>
        <div className="answer-grid">
          {letters.map((letter, i) => (
            <label
              className={`answer-input ${question.correct === i ? "chosen" : ""}`}
              key={letter}
            >
              <span>{letter}</span>
              <input
                value={options[i]}
                onChange={(e) => {
                  const next = [...options];
                  next[i] = e.target.value;
                  update("options", next);
                }}
                placeholder={`Варіант ${letter}`}
              />
              <input
                type="radio"
                name="correct"
                checked={question.correct === i}
                onChange={() => update("correct", i)}
                aria-label={`Правильна відповідь ${letter}`}
              />
            </label>
          ))}
        </div>
        {error && <p className="form-error">{error}</p>}
        <button className="primary" onClick={onSave}>
          {editing ? "Зберегти зміни" : "Застосувати та продовжити"} <b>→</b>
        </button>
      </section>
    </main>
  );
}
