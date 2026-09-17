import { memo } from "react";

function Lifelines({ lifelines, onUse }) {
  const all = [
    ["fiftyFifty", "50/50"],
    ["phoneFriend", "☎ Друг"],
    ["askAudience", "◔ Зала"],
    ["secondChance", "♥ 2 життя"],
  ];
  return (
    <div className="lifelines">
      {all.map(([key, label]) => (
        <button key={key} disabled={!lifelines[key]} onClick={() => onUse(key)}>
          {label}
        </button>
      ))}
    </div>
  );
}

export default memo(Lifelines);
