import "./Card.css";

interface Props {
  src: string;
}

const Card: React.FC<Props> = ({ src }) => {
  return (
    <div className="card">
      <div>
        <img src={src} className="front" alt="card front" />
        <img src="/img/cover.png" className="back" alt="card back" />
      </div>
    </div>
  );
};

export default Card;
