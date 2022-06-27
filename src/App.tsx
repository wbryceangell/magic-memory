import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import cardSources, { CardSource } from "./constants/cardSources";

export type CardSourceWithId = CardSource & { id: string; matched: boolean };

function App() {
  const [cards, setCards] = useState<Array<CardSourceWithId>>([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<CardSourceWithId | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<CardSourceWithId | null>(null);

  const newGame = () => {
    const shuffledCards: Array<CardSourceWithId> = [
      ...cardSources,
      ...cardSources,
    ]
      .sort(() => Math.random() - 0.5)
      .map((cardSource) => ({
        ...cardSource,
        id: crypto.randomUUID(),
        matched: false,
      }));
    setCards(shuffledCards);
    resetChoices();
    setTurns(0);
  };

  const handleClick = (card: CardSourceWithId) =>
    !choiceOne ? setChoiceOne(card) : setChoiceTwo(card);

  const compareChoices = () => {
    if (!choiceOne || !choiceTwo) return;
    if (choiceOne.src === choiceTwo.src)
      setCards((cards) =>
        cards.map((card) => {
          if (card.src === choiceOne.src) card.matched = true;
          return card;
        })
      );
    setTimeout(nextTurn, 1000);
  };

  const nextTurn = () => {
    resetChoices();
    setTurns((turns) => turns + 1);
  };

  const resetChoices = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  const isFlipped = (card: CardSourceWithId): boolean => {
    return (
      card.matched ||
      (choiceOne !== null && card.id === choiceOne.id) ||
      (choiceTwo !== null && card.id === choiceTwo.id)
    );
  };

  useEffect(newGame, []);
  useEffect(compareChoices, [choiceTwo]);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={newGame}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            flipped={isFlipped(card)}
            handleClick={
              (!choiceOne || !choiceTwo) && !isFlipped(card)
                ? handleClick
                : () => {}
            }
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
