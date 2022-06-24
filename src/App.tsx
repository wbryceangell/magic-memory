import { useState } from "react";
import "./App.css";
import Card from "./components/Card";
import cardSources, { CardSource } from "./constants/cardSources";

export type CardSourceWithId = CardSource & { id: string };

function App() {
  const [cards, setCards] = useState<Array<CardSourceWithId>>([]);
  const [turns, setTurns] = useState(0);

  const newGame = () => {
    const shuffledCards: Array<CardSourceWithId> = [
      ...cardSources,
      ...cardSources,
    ]
      .sort(() => Math.random() - 0.5)
      .map((cardSource) => ({ ...cardSource, id: crypto.randomUUID() }));
    setCards(shuffledCards);
    setTurns(0);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={newGame}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <Card key={card.id} src={card.src} />
        ))}
      </div>
    </div>
  );
}

export default App;
