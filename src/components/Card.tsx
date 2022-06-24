import "./Card.css";

interface Props {
  src: string;
  handleClick: (src: string) => void;
}

const Card: React.FC<Props> = ({ src, handleClick }) => {
  return (
    <div className="card">
      <div>
        <img src={src} className="front" alt="card front" />
        <img
          src="/img/cover.png"
          className="back"
          alt="card back"
          onClick={() => handleClick(src)}
        />
      </div>
    </div>
  );
};

export default Card;
