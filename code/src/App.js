import React, { useEffect, useState } from 'react'
import { Message } from './components/Message'
import { SubmitMessage } from './components/SubmitMessage'
/* eslint no-underscore-dangle: 0 */

export const App = () => {
  const [happyThoughts, setHappyThoughts] = useState([]);
  const fetchNewHappyThoughts = () => {
    fetch('https://happy-thoughts-technigo.herokuapp.com/thoughts')
      .then((res) => res.json())
      .then((json) => {
        const sortedJson = json.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
        setHappyThoughts(sortedJson)
      });
  }
  useEffect(() => {
    fetchNewHappyThoughts();
  }, []);
  return (
    <div className="messages-container">
      <SubmitMessage fetchNewHappyThoughts={fetchNewHappyThoughts} />
      {happyThoughts && happyThoughts.map((thought) => {
        return (
          <Message
            key={thought._id}
            message={thought.message}
            createdAt={thought.createdAt}
            id={thought._id}
            hearts={thought.hearts}
            fetchNewHappyThoughts={fetchNewHappyThoughts} />
        )
      })}
    </div>
  )
}
