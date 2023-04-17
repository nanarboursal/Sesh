import React, { useState, useEffect } from 'react';

function WordOfTheDay() {

    const [word, setWord] = useState("ExampleWord");
    const [definition, setDefinition] = useState("ExampleDefinition");

    useEffect(() => {
        chrome.runtime.sendMessage({ name: "fetchWords" }, (response) => {
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