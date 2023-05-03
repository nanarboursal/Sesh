import React, { useState, useEffect } from 'react';
import "./word-of-the-day.css";

function WordOfTheDay() {

    const [word, setWord] = useState("");
    const [definition, setDefinition] = useState("");
    const [partOfSpeech, setPartOfSpeech] = useState("");
    const [example, setExample] = useState("");

    useEffect(() => {
        chrome.runtime.sendMessage({ name: "fetchWordOfTheDay" }, (response) => {
            setWord(response.word);
            setDefinition(response.def);
            setPartOfSpeech(response.partOfSpeech);
            setExample(response.example);
        });
    }, []);

    return (
        <div className='wotd-block'>
            <h1 className='wotd'>{word}</h1>
            <p className='wotd-def'><span style={{ fontStyle: "italic", fontSize: "12px" }}>{partOfSpeech}</span>. {definition}</p>
            <p className='wotd-ex'><span style={{ fontStyle: "normal", fontWeight: "bold" }}>Example: </span>{example}</p>
        </div>
    );
}

export default WordOfTheDay;