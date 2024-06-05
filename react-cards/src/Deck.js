import React, { useEffect, useState, useCallback } from "react";
import Card from "./Card";
import axios from "axios";


const API_URL = "https://deckofcardsapi.com/api/deck";

function Deck() {
  const [deck, setDeck] = useState(null);
  const [drawnCards, setDrawnCards] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    async function fetchDeck() {
      try {
        const response = await axios.get(`${API_URL}/new/shuffle/`);
        setDeck(response.data);
      } 
      catch (error) {
        console.error("Error fetching deck:", error);
      }
    }
    fetchDeck();
  });

  const drawCard = useCallback(async () => {
    if (!deck) return;

    try {
      const response = await axios.get(`${API_URL}/${deck.deck_id}/draw/`);
      if (response.data.remaining === 0) throw new Error("Deck empty!");

      const card = response.data.cards[0];
      setDrawnCards((prevDrawnCards) => [
        ...prevDrawnCards,
        {
          id: card.code,
          name: `${card.value} of ${card.suit}`,
          image: card.image,
        },
      ]);
    } 
    catch (error) {
      alert(error);
    }
  }, [deck]);

  const shuffleDeck = useCallback(async () => { //temp name
    if (!deck) return;

    setIsShuffling(true);
    try {
      await axios.get(`${API_URL}/${deck.deck_id}/shuffle/`);
      setDrawnCards([]);
    } 
    catch (error) {
      alert(error);
    } 
    finally {
      setIsShuffling(false);
    }
  }, [deck]);

  const renderDrawButton = useCallback(() => {
    if (!deck) return null;

    return (
      <button className="Deck-draw-btn" onClick={drawCard} disabled={isShuffling}>
        Draw 1
      </button>
    );
  }, [deck, drawCard, isShuffling]);

  const renderShuffleButton = useCallback(() => {
    if (!deck) return null;

    return (
      <button className="Deck-shuffle-btn" onClick={shuffleDeck} disabled={isShuffling}>
        SHUFFLE DECK
      </button>
    );
  }, [deck, shuffleDeck, isShuffling]);

  return (
    <main className="Deck">
      {renderDrawButton()}
      {renderShuffleButton()}
      <div className="Deck-cardArea">
        {drawnCards.map((card) => (
          <Card key={card.id} name={card.name} image={card.image} />
        ))}
      </div>
    </main>
  );
}

export default Deck;