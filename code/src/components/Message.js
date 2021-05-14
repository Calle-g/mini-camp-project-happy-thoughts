import React from 'react'
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'

export const Message = (props) => {
  const {
    message,
    createdAt,
    id,
    hearts,
    fetchNewHappyThoughts
  } = props
  dayjs.extend(relativeTime);
  const likeMessage = (messageId) => {
    const likedUrl = `https://happy-thoughts-technigo.herokuapp.com/thoughts/${messageId}/like`
    fetch(likedUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(() => {
        fetchNewHappyThoughts();
      })
  }
  return (
    <div className="message">
      <div className="text">
        {message}
      </div>
      <div className="row-wrapper">
        <div className="time">
          {dayjs(createdAt).fromNow()}
        </div>
        <div
          className="hearts"
          role="button"
          tabIndex={0}
          onClick={() => likeMessage(id)}
          onKeyDown={() => likeMessage(id)}>
          <svg className={`heart${hearts > 0 ? '' : ' not-as-popular'}`} viewBox="0 0 32 29.6">
            <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z" />
          </svg>
          &nbsp; {hearts}
        </div>
      </div>
    </div>
  )
}
