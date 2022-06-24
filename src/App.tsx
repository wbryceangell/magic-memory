import { useState } from "react";
import "./App.css";
import cardSources, { CardSource } from "./constants/cardSources";

type Card = CardSource & { id: string };

function App() {
  const [cards, setCards] = useState<Array<Card>>([]);
  const [turns, setTurns] = useState(0);

  const newGame = () => {
    const shuffledCards: Array<Card> = [...cardSources, ...cardSources]
      .sort(() => Math.random() - 0.5)
      .map((cardSource) => ({ ...cardSource, id: crypto.randomUUID() }));
    setCards(shuffledCards);
    setTurns(0);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={newGame}>New Game</button>
    </div>
  );
}

export default App;
