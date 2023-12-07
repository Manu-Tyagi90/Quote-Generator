import React from "react"
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import randomColor from "randomcolor"
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

export default function App () {

const url = 'https://api.quotable.io/quotes/random?minLength=100&maxLength=200'
const [quote, setQuote] = useState({})
const [loading, setLoading] = useState(true)

const fetchData = () => {
  return fetch(url)
    .then(response => response.json())
    .then(json => {
      setQuote(json[0])
      setLoading(false)
    })
}

useEffect(() => {
  setTimeout(fetchData, 0);
}, []);

const color = randomColor({luminosity: "dark", alpha: 1})

const backgroundStyles = loading ? 
  {
    backgroundColor: "gray",
    transition: "all 1s ease",

  } : 
  {
    backgroundColor: color,
    transition: "all 1s ease"
  }

const textStyles = {
  color: color
}

const tweetUrl = quote.content?.split(" ").map(value => value + "%20").join("")
const author = quote.author?.split(" ").join("")

  return (
    <div 
      className="background" 
      style={backgroundStyles}
    >
      <div id="quote-box" >
        <div className="text-wrapper">
          <p 
              id="text" 
              style={textStyles}
          >
              {quote?.content}
          </p>
          {!loading && <p id="author">- {quote.author}</p>}
        </div>
        <div id="buttons">
          <a 
            href={`https://twitter.com/intent/tweet?text=${tweetUrl}&hashtags=${author}`}
            target="_blank"
            className="button"
            id="tweet-quote"
            style={backgroundStyles}  
          >
            <FontAwesomeIcon icon={faXTwitter} />
          </a>

          <button 
            id="new-quote"
            style={backgroundStyles}
            onClick={fetchData}
          >
            Random Quotes 
          </button>
        </div>
      </div>
    </div>
  )
}