import React from 'react'

const fetchSuggestionFromChatGPT = () => 
  fetch("/api/suggestion", { 
    cache: 'no-store'
  }).then((res) => res.json());


export default fetchSuggestionFromChatGPT;