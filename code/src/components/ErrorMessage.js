import React, { useEffect } from 'react'

export const ErrorMessage = ({ setError, message }) => {
  useEffect(() => {
    const timer = setTimeout(() => setError(false), 2850);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="error">{message.length > 140 ? 'This is not a novel! Keep it short.' : 'Your message might be too short.'}</div>
  )
}
