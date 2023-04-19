import React, { useState, useEffect } from 'react';

function WordOfTheDay() {

    const [word, setWord] = useState("");
    const [definition, setDefinition] = useState("");

    useEffect(() => {
        chrome.runtime.sendMessage({ name: "fetchWordOfTheDay" }, (response) => {
            setWord(response.word);
            setDefinition(response.def);
        });
    }, []);

    return (
        <div>
            <h1>{word}</h1>
            <p>{definition}</p>
        </div>
    );
}

export default WordOfTheDay;