import { prizeLevels, money } from "../data/prizeLevels";
export default function MoneyLadder({
  current,
  completed,
  guarantees,
  chosen,
  onChoose,
  compact = false,
}) {
  return (
    <aside className={`ladder glass ${compact ? "compact" : ""}`}>
      <div className="ladder-title">Сходи виграшів</div>
      <div className="levels">
        {prizeLevels.map((amount, index) => (
          <button
            key={amount}
            onClick={() => onChoose?.(amount)}
            className={`${index === current ? "active" : ""} ${index < completed ? "passed" : ""} ${guarantees.includes(amount) ? "guaranteed" : ""} ${chosen === amount ? "selected" : ""}`}
          >
            <span className="level-number">{index + 1}</span>
            {money(amount)}
            {guarantees.includes(amount) && <b>◆</b>}
          </button>
        ))}
      </div>
    </aside>
  );
}
