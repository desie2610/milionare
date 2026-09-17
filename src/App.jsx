import { useEffect, useMemo, useState } from "react";
import { prizeLevels, automaticGuarantees } from "./data/prizeLevels";
import MainMenu from "./components/MainMenu";
import RoundTransition from "./components/RoundTransition";
import QuestionCreator from "./components/QuestionCreator";
import QuestionPreview from "./components/QuestionPreview";
import Question from "./components/Question";
import { PhoneFriend, AudienceHelp } from "./components/PhoneFriend";
import GameResult from "./components/GameResult";
import AudioController, { useAudio } from "./components/AudioController";
import GameSetup from "./components/GameSetup";
const blank = (i) => ({
  amount: prizeLevels[i],
  text: "",
  options: ["", "", "", ""],
  correct: null,
});
const key = "millionaire-questions-v1";
export default function App() {
  const [screen, setScreen] = useState("MENU");
  const [questions, setQuestions] = useState([]);
  const [editIndex, setEditIndex] = useState(0);
  const [draft, setDraft] = useState(blank(0));
  const [error, setError] = useState("");
  const [sound, setSound] = useState(true);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealStep, setRevealStep] = useState(0);
  const [answerResult, setAnswerResult] = useState("");
  const [removed, setRemoved] = useState([]);
  const [lifelines, setLifelines] = useState({
    fiftyFifty: true,
    phoneFriend: true,
    askAudience: true,
    secondChance: true,
  });
  const [guarantees, setGuarantees] = useState(automaticGuarantees);
  const [chosenGuarantee, setChosenGuarantee] = useState(null);
  const [modal, setModal] = useState(null);
  const [result, setResult] = useState(null);
  const play = useAudio(sound);
  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        setQuestions(JSON.parse(saved));
      } catch {}
    }
  }, []);
  const persist = (data) => {
    setQuestions(data);
    localStorage.setItem(key, JSON.stringify(data));
  };
  const beginCreation = () => {
    if (questions.length >= 18) {
      setScreen("REVIEW");
      return;
    }
    setEditIndex(questions.length);
    setDraft(blank(questions.length));
    setError("");
    setScreen("CREATOR");
    play("button");
  };
  const continueCreation = () => {
    const n = questions.length;
    setEditIndex(n);
    setDraft(questions[n] || blank(n));
    setScreen("CREATOR");
  };
  const saveQuestion = () => {
    if (
      !draft.text.trim() ||
      draft.options.some((x) => !x.trim()) ||
      draft.correct === null
    ) {
      setError(
        "Заповніть питання, усі варіанти та позначте правильну відповідь.",
      );
      return;
    }
    const copy = [...questions];
    const wasEditing = editIndex < questions.length;
    copy[editIndex] = { ...draft, amount: prizeLevels[editIndex] };
    persist(copy);
    if (wasEditing || editIndex === 17) setScreen("REVIEW");
    else {
      setEditIndex(editIndex + 1);
      setDraft(copy[editIndex + 1] || blank(editIndex + 1));
      setError("");
    }
    play("button");
  };
  const openSetup = () => {
    setGuarantees(automaticGuarantees);
    setChosenGuarantee(null);
    setScreen("SETUP");
    play("button");
  };
  const startGame = () => {
    setCurrent(0);
    setSelected(null);
    setRevealStep(0);
    setRemoved([]);
    setAnswerResult("");
    setLifelines({
      fiftyFifty: true,
      phoneFriend: true,
      askAudience: true,
      secondChance: true,
    });
    setGuarantees((g) =>
      [...new Set([...g, chosenGuarantee])]
        .filter(Boolean)
        .sort((a, b) => a - b),
    );
    setScreen("STAGE");
    play("button");
  };
  const finish = (won, prize) => {
    setResult({ won, prize });
    setScreen("RESULT");
    play(won ? "win" : "final");
  };
  const answer = (value) => {
    if (selected !== null) return;
    setSelected(value);
    setTimeout(() => {
      const correct = value === questions[current].correct;
      setAnswerResult(correct ? "correct" : "wrong");
      play(correct ? "correct" : "wrong");
      setTimeout(() => {
        if (correct) {
          if (current === 17) finish(true, prizeLevels[17]);
          else {
            setCurrent((c) => c + 1);
            setSelected(null);
            setRevealStep(0);
            setAnswerResult("");
            setRemoved([]);
            setScreen("STAGE");
          }
        } else if (lifelines.secondChance) {
          setLifelines((l) => ({ ...l, secondChance: false }));
          setSelected(null);
          setAnswerResult("");
          setRemoved([]);
          setModal({ type: "chance" });
        } else {
          const answeredAmount = current ? prizeLevels[current - 1] : 0;
          const safe =
            guarantees.filter((x) => x <= answeredAmount).at(-1) || 0;
          finish(false, safe);
        }
      }, 1100);
    }, 550);
  };
  const useLifeline = (type) => {
    if (!lifelines[type]) return;
    const q = questions[current];
    setLifelines((l) => ({ ...l, [type]: false }));
    play("lifeline");
    if (type === "fiftyFifty") {
      const wrong = q.options
        .map((_, i) => i)
        .filter((i) => i !== q.correct)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);
      setRemoved(wrong);
    }
    if (type === "phoneFriend") {
      const choice =
        Math.random() < 0.7
          ? q.correct
          : q.options.map((_, i) => i).filter((i) => i !== q.correct)[
              Math.floor(Math.random() * 3)
            ];
      setModal({ type, answer: "ABCD"[choice] });
    }
    if (type === "askAudience") {
      const base = q.options.map((_, i) =>
        i === q.correct
          ? 48 + Math.floor(Math.random() * 27)
          : 4 + Math.floor(Math.random() * 16),
      );
      const sum = base.reduce((a, b) => a + b, 0);
      const votes = Object.fromEntries(
        base.map((n, i) => ["ABCD"[i], Math.round((n * 100) / sum)]),
      );
      const diff = 100 - Object.values(votes).reduce((a, b) => a + b, 0);
      votes["ABCD"[q.correct]] += diff;
      setModal({ type, votes });
    }
  };
  const chooseGuarantee = (amount) => setChosenGuarantee(amount);
  const edit = (i) => {
    setEditIndex(i);
    setDraft(questions[i]);
    setScreen("CREATOR");
  };
  const clear = () => {
    if (window.confirm("Очистити всі збережені питання?")) {
      localStorage.removeItem(key);
      setQuestions([]);
      setEditIndex(0);
      setDraft(blank(0));
      setError("");
      setScreen("CREATOR");
    }
  };

  const guaranteedPrize = useMemo(
    () =>
      guarantees
        .filter((amount) => amount <= (prizeLevels[current - 1] || 0))
        .at(-1) || 0,
    [current, guarantees],
  );
  return (
    <>
      <AudioController enabled={sound} onToggle={() => setSound((s) => !s)} />
      {screen === "MENU" && (
        <MainMenu
          hasSaved={questions.length > 0}
          onStart={beginCreation}
          onContinue={continueCreation}
          onNewGame={clear}
        />
      )}
      {screen === "CREATOR" && (
        <QuestionCreator
          index={editIndex}
          question={draft}
          onChange={setDraft}
          onSave={saveQuestion}
          error={error}
          editing={editIndex < questions.length}
        />
      )}
      {screen === "REVIEW" && (
        <QuestionPreview
          questions={questions}
          onEdit={edit}
          onPlay={openSetup}
        />
      )}
      {screen === "SETUP" && (
        <GameSetup
          guarantees={automaticGuarantees}
          selected={chosenGuarantee}
          onSelect={chooseGuarantee}
          onStart={startGame}
        />
      )}
      {screen === "STAGE" && (
        <RoundTransition
          questionNumber={current + 1}
          guarantees={guarantees}
          onNext={() => setScreen("GAME")}
        />
      )}
      {screen === "GAME" && (
        <main className="game page">
          <div className="game-main">
            <Question
              item={questions[current]}
              index={current}
              guaranteedPrize={guaranteedPrize}
              revealStep={revealStep}
              onReveal={() => setRevealStep((step) => step + 1)}
              lifelines={lifelines}
              removed={removed}
              selected={selected}
              result={answerResult}
              onAnswer={answer}
              onLifeline={useLifeline}
            />
          </div>
        </main>
      )}
      {screen === "RESULT" && (
        <GameResult
          {...result}
          onReplay={openSetup}
          onMenu={() => setScreen("MENU")}
        />
      )}
      {modal?.type === "phoneFriend" && (
        <PhoneFriend answer={modal.answer} onClose={() => setModal(null)} />
      )}
      {modal?.type === "askAudience" && (
        <AudienceHelp votes={modal.votes} onClose={() => setModal(null)} />
      )}
      {modal?.type === "chance" && (
        <div className="modal-backdrop">
          <section className="modal glass">
            <div className="modal-icon">♥</div>
            <h3>Ви використали другий шанс!</h3>
            <p>Відповідайте уважніше — наступна помилка завершить гру.</p>
            <button className="primary" onClick={() => setModal(null)}>
              Продовжити
            </button>
          </section>
        </div>
      )}
    </>
  );
}
