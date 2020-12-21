import React from "react";

const Card = ({ card, onCardOpen }) => {
  const clickHandler = () => {
    if (!card.open && !card.matched) {
      onCardOpen(card);
    }
  };

  const getCard = () => {
    if (card.matched) {
      return;
    } else if (card.open) {
      return <img src={card.image} />;
    }

    return <div className="not-opened m-auto pt-4">?</div>;
  };

  return (
    <div
      className={"card shadow m-1 bg-primary" + (card.matched ? " matched invisible" : "")}
      onClick={clickHandler}
    >
      {getCard()}
    </div>
  );
};

export default Card;
