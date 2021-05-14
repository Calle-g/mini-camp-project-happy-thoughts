import React, { useState } from 'react'
import { ErrorMessage } from './ErrorMessage'

export const SubmitMessage = ({ fetchNewHappyThoughts }) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const submitMessage = () => {
    fetch('https://happy-thoughts-technigo.herokuapp.com/thoughts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    })
      .then((response) => {
        if (response.ok) {
          setMessage('');
          fetchNewHappyThoughts();
          setError(false);
        } else {
          setError(true);
        }
      })
  }
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <div className="message">
        <textarea
          type="text"
          rows={3}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Add your own happy thought..." />
        <div className="row-wrapper">
          <div className={`characters${(140 - message.length) < 0 ? ' above-limit' : ''}`}>
            {140 - message.length} characters left
          </div>
          <button className="submit-button" type="button" onClick={() => submitMessage()}>
            Submit your happy thought
          </button>
          {error && <ErrorMessage setError={setError} message={message} />}
        </div>
      </div>
    </form>
  )
}
