import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Deck.css"
import Card from "./Card";

const BASE_URL = 'https://deckofcardsapi.com/api/deck';

const Deck = () => {
    const [deck, setDeck] = useState(null);
    const [drawn, setDrawn] = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);

    useEffect(function loadDeckFromAPI() {
        async function fetchData() {
            const d = await axios.get(`${BASE_URL}/new/shuffle/`);
            setDeck(d.data);
        }
        fetchData();
    }, []);

    // Draw Card: change the state & the effect will activate too  
    const draw = async () => {
        try {
            const drawRes = await axios.get(`${BASE_URL}/${deck.deck_id}/draw/`);
            const remaining = drawRes.data.remaining;
            const card = drawRes.data.cards[0];

            if (remaining === 0) throw new Error("Error: no cards remaining! ")

            setDrawn(drawn =>
                [...drawn,
                {
                    id: card.code,
                    name: card.suit + " " + card.value,
                    image: card.image
                }]);

        }
        catch (e) {
            alert(e)
        }
    }

    /** Shuffle: change the state & effect will activate too  */
    const startShuffling = async () => {
        setIsShuffling(true);
        try {
            await axios.get(`${BASE_URL}/${deck.deck_id}/shuffle/`);
            setDrawn([]);
        }
        catch (e) {
            alert(e);
        } finally {
            setIsShuffling(false);
        }
    }

    /** Return draw button (disabled if shuffling) */
    const renderDrawBtnIfOk = () => {
        if (!deck) return null;

        return (
            <button
                className="Deck-gimme"
                onClick={draw}
                disabled={isShuffling}>
                DRAW
            </button>
        );
    }

    /** Return shuffle button (disabled if already is) */
    const renderShuffleBtnIfOk = () => {
        if (!deck) return null;
        return (
            <button
                className="Deck-gimme"
                onClick={startShuffling}
                disabled={isShuffling}>
                SHUFFLE DECK
            </button>
        );
    }

    return (
        <div className="Deck">

            {renderDrawBtnIfOk()}
            {renderShuffleBtnIfOk()}

            <div className="Deck-cardarea">{
                drawn.map(c => (
                    <Card key={c.id} name={c.name} image={c.image} />
                ))}
            </div>

        </div>
    );

}

export default Deck;