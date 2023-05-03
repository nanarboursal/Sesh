import React, { useState, useEffect } from 'react';
import "./word-of-the-day.css";

function WordOfTheDay() {

    const [word, setWord] = useState("");
    const [definition, setDefinition] = useState("");
    const [partOfSpeech, setPartOfSpeech] = useState("");
    const [example, setExample] = useState("");
    const date = new Date().toISOString().slice(0, 10);

    useEffect(() => {
        chrome.runtime.sendMessage({ name: "fetchWordOfTheDay" }, (response) => {
            setWord(response.word);
            setDefinition(response.def);
            if (response.partOfSpeech != null) {
                setPartOfSpeech(response.partOfSpeech + ".");
            }
            setExample(response.example);
        });
    }, []);

    return (
        <div className='wotd-block'>
            <p style={{ marginBottom: "0px", fontSize: "14px", fontStyle: "bold" }}>Word of the Day <span style={{ fontStyle: "normal", marginLeft: "200px" }}>{date}</span></p>
            <h1 className='wotd'>{word}</h1>
            <p className='wotd-def'><span style={{ fontStyle: "italic", fontSize: "12px" }}>{partOfSpeech}</span> {definition}</p>
            <p className='wotd-ex'><span style={{ fontStyle: "normal", fontWeight: "bold" }}>Example: </span>{example}</p>
        </div>
    );
}

export default WordOfTheDay;