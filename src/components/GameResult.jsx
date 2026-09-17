import { money } from "../data/prizeLevels";
export default function GameResult({ won, prize, onReplay, onMenu }) {
  return (
    <main className={`result screen-center ${won ? "winner" : ""}`}>
      <section className="glass reveal">
        {" "}
        <div className="trophy">{won ? "🏆" : "✦"}</div>
        <p className="eyebrow">
          {won ? "Неймовірний результат" : "Це була сильна гра"}
        </p>
        <h1>{won ? "ВИ СТАЛИ МІЛЬЙОНЕРОМ!" : "Гру завершено"}</h1>
        <p>Ви виграли</p>
        <div className="result-prize">{money(prize)}</div>
        <button className="primary" onClick={onReplay}>
          Грати ще раз
        </button>
        <button className="secondary" onClick={onMenu}>
          Головне меню
        </button>
      </section>
    </main>
  );
}
