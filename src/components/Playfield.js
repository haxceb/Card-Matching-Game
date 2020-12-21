import React, { useEffect, useState } from "react";
import Card from "./Card";
import imageLoader from "./images";

const Playfield = () => {
  const pairVisibleInMilliseconds = 2000;
  const [pairs, setPairs] = useState(10);
  const [images, setImages] = useState([]);
  const [turns, setTurns] = useState(0);
  const [pairsMatched, setPairsMatched] = useState(0);
  const [openedCards, setOpenedCards] = useState([]);
  const [deck, setDeck] = useState([]);
  const [open, setOpen] = useState(false);
  const [effect, setEffect] = useState(0);

  useEffect(() => {
    getImages();
  }, [pairs]);

  useEffect(() => {
    if (images.length === pairs) {
      generateCards();
    }
  }, [images]);

  useEffect(() => {
    openAll();
  }, [effect]);

  const openAll = () => {
    if (deck.length > 1) {
      deck.map((card) => {
        openCard(card);
      });
    } else {
      console.log("No card in deck");
    }
    setTimeout(() => {
      closeCards();
      setTurns(0);
      console.log("now open false", open);
    }, 2000);
  };

  const openCard = (card) => {
    if (openedCards.length === 2 && open) {
      return;
    }

    let newDeck = [...deck];
    console.log("from opencard", newDeck);

    deck.forEach((element, index) => {
      if (element.number === card.number) {
        newDeck[index].open = true;
        return;
      }
    });

    setDeck(newDeck);
    let opened = openedCards;

    if (open) {
      setOpenedCards(deck);
    } else {
    opened.push(card);
    setOpenedCards(opened);
    }

    if (opened.length === 2) {
      setTimeout(() => {
        handlePossibleMatch(opened);
      }, pairVisibleInMilliseconds);
    }
  };

  const handlePossibleMatch = (openedCards) => {
    let newDeck;

    if (cardsMatch(openedCards)) {
      const openedCardNumbers = [openedCards[0].number, openedCards[1].number];
      newDeck = [...deck];

      deck.forEach((element, index) => {
        if (openedCardNumbers.includes(element.number)) {
          newDeck[index].open = false;
          newDeck[index].matched = true;
        }
      });

      setPairsMatched(pairsMatched + 1);
      setDeck(newDeck);
    } else {
      closeCards();
    }

    setTurns(turns + 1);
    setOpenedCards([]);
  };

  const cardsMatch = (cards) => {
    return cards[0].pair === cards[1].pair;
  };

  const getImages = async () => {
    let fetchedImages = imageLoader();

    let setImg = [];
    fetchedImages.map((image) => {
      if (setImg.length < pairs) {
        setImg.push(image.src);
      } else return;
    });
    setImages(setImg);
  };

  const closeCards = () => {
    let closedDeck = [];

    deck.forEach((card) => {
      card.open = false;
      closedDeck.push(card);
    });

    setDeck(closedDeck);
    setOpen(false);
  };

  const resetGame = () => {
    generateCards();
    setTurns(0);
    setPairsMatched(0);
  };

  const generateCards = () => {
    let cards = [];
    let cardNumber = 0;

    images.forEach((image, key) => {
      for (let i = 0; i < 2; i++) {
        cardNumber += 1;

        cards.push({
          number: cardNumber,
          pair: key,
          image: image,
          open: false,
          matched: false,
        });
      }
    });

    setDeck(shuffleDeck(cards));
    setEffect(!effect);
  };

  const shuffleDeck = (cards) => {
    return cards
      .map((a) => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map((a) => a[1]);
  };

  const handlePairs = (e) => {
    setPairs(e.target.value);
  };

  return (
    <>
      <div className="m-auto text-center p-3 pt-5">
        <h2>Find the pairs</h2>
      </div>
      <div className="d-flex container m-auto w-50">
        <div className="d-flex flex-wrap">
          {deck.map((card) => {
            return <Card key={card.number} card={card} onCardOpen={openCard} />;
          })}
        </div>
        <div className="shadow rounded w-50 p-3 pr-5">
          <div>
            <h5>Score</h5>
          </div>
          <div>
            <h3>
              {pairsMatched} / {pairs}
            </h3>
          </div>
          <div>
            <h6>Tries: {turns}</h6>
          </div>
          <hr />
          <form>
            <label htmlFor="inputState" className="form-label">
              Select Size
            </label>
            <select
              className="form-select"
              onChange={handlePairs}
              aria-label="Default select example"
            >
              <option value="10">10 Pairs ...</option>
              <option value="15">15 Pairs</option>
              <option value="20">20 Pairs</option>
            </select>
          </form>
          <button className="btn btn-primary mt-3" onClick={resetGame}>
            Restart
          </button>
        </div>
      </div>
    </>
  );
};

export default Playfield;
