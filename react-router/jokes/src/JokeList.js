import React, { useEffect, useState } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

/** List of jokes. */

function JokeList({ numJokesToGet = 5 }) {
  const [jokes, setJokes] = useState([])
  const [isLoading, setIsLoading] = useState(false);


  // /* retrieve jokes from API */
  async function getJokes() {

    // load jokes one at a time, adding not-yet-seen jokes
    let seenJokes = new Set();
    setIsLoading(true);
    try {
      for (let i = 0; i < numJokesToGet; i++) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: {
            Accept: "application/json"
          }
        });
        let { ...joke } = res.data;
        if (!seenJokes.has(joke.id)) {
          seenJokes.add(joke.id);
          setJokes((oldJokes) =>
            [...oldJokes, joke]
          )
        } else {
          console.error("duplicate found!");

        }
      }

      setIsLoading(false);

    }
    catch (err) {
      console.error(err);
    }

  }

  useEffect(() => {
    getJokes();
  }, []);

  /* empty joke list, set to loading state, and then call getJokes */

  async function generateNewJokes() {
    await getJokes();
  }

  /* change vote for this id by delta (+1 or -1) */

  function vote(id, delta) {
    setJokes(allJokes => (
      allJokes.map(j =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      )
    ));
  }

  /* render: either loading spinner or list of sorted jokes. */

  if (isLoading) {
    return (
      <div className="loading">
        <i className="fas fa-4x fa-spinner fa-spin" />
      </div>
    )
  }

  let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

  return (
    <div className="JokeList">
      <button
        className="JokeList-getmore"
        onClick={generateNewJokes}
      >
        Get New Jokes
      </button>

      {sortedJokes.map(({ joke, id, votes }) => (
        <Joke
          text={joke}
          key={id}
          id={id}
          votes={votes}
          vote={vote}
        />
      ))}
    </div>
  );
}

export default JokeList;
