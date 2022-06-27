import { CardSourceWithId } from "../App";
import "./Card.css";

interface Props {
  card: CardSourceWithId;
  flipped: boolean;
  handleClick: (card: CardSourceWithId) => void;
}

const Card: React.FC<Props> = ({ card, flipped, handleClick }) => {
  const { src } = card;
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img src={src} className="front" alt="card front" />
        <img
          src="/img/cover.png"
          className="back"
          alt="card back"
          onClick={() => handleClick(card)}
        />
      </div>
    </div>
  );
};

export default Card;
