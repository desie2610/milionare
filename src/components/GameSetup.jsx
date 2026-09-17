import { money } from "../data/prizeLevels";
import MoneyLadder from "./MoneyLadder";

export default function GameSetup({ guarantees, selected, onSelect, onStart }) {
  return (
    <main className="setup page">
      <section className="setup-copy">
        <p className="eyebrow">Перед початком</p>
        <h2>
          Оберіть одну
          <br />
          <span>незгораєму суму</span>
        </h2>
        <p>Натисніть на одну суму зі списку.</p>
      </section>
      <MoneyLadder
        current={-1}
        completed={0}
        guarantees={guarantees}
        chosen={selected}
        onChoose={onSelect}
      />
      <div className="setup-footer">
        <div className="selected-safe">
          {selected ? (
            <>
              Ваш вибір: <b>{money(selected)}</b>
            </>
          ) : (
            "Виберіть одну додаткову незгораєму суму"
          )}
        </div>
        <p className="setup-condition">
          Обрана сума захистить ваш виграш у разі неправильної відповіді. Її не
          можна буде змінити після початку гри.
        </p>
        <button className="primary" disabled={!selected} onClick={onStart}>
          Почати гру <b>▶</b>
        </button>
      </div>
    </main>
  );
}
