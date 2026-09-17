export function PhoneFriend({ answer, onClose }) {
  return (
    <div className="modal-backdrop">
      <section className="modal glass">
        <div className="modal-icon">☎</div>
        <h3>Дзвінок другу</h3>
        <p>
          Ваш друг вважає, що правильна відповідь — <strong>{answer}</strong>
        </p>
        <button className="primary" onClick={onClose}>
          Дякую!
        </button>
      </section>
    </div>
  );
}
export function AudienceHelp({ votes, onClose }) {
  return (
    <div className="modal-backdrop">
      <section className="modal glass">
        <div className="modal-icon">◔</div>
        <h3>Допомога залу</h3>
        <div className="votes">
          {Object.entries(votes).map(([letter, value]) => (
            <div key={letter}>
              <span>{letter}</span>
              <i>
                <b style={{ height: `${value}%` }} />
              </i>
              <strong>{value}%</strong>
            </div>
          ))}
        </div>
        <button className="primary" onClick={onClose}>
          Зрозуміло
        </button>
      </section>
    </div>
  );
}
