export default function MainMenu({ hasSaved, onStart, onContinue, onNewGame }) {
  return (
    <main className="menu screen-center">
      <div className="halo" />
      <section className="menu-card glass reveal">
        <p className="eyebrow">Інтерактивна вікторина</p>
        <h1>
          Хто хоче стати
          <br />
          <span>мільйонером?</span>
        </h1>
        <p className="intro">
          Створіть власну гру й перевірте, чи вистачить знань дістатися вершини.
        </p>
        <button className="primary" onClick={onStart}>
          Хто хоче стати мільйонером?
        </button>
        {hasSaved && (
          <button className="secondary" onClick={onContinue}>
            Продовжити створення
          </button>
        )}
        <button className="locked" disabled>
          Хто тупіший? <small>Скоро буде</small>
        </button>
        {hasSaved && (
          <button className="text-button" onClick={onNewGame}>
            Почати нову гру
          </button>
        )}
      </section>
    </main>
  );
}
