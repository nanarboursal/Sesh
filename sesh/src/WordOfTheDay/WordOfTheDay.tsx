import React, { useState } from 'react';

function WordOfTheDay() {

    const [word, setWord] = useState("ExampleWord");
    const [definition, setDefinition] = useState("ExampleDefinition");

    function clickedButton() {
        chrome.runtime.sendMessage({ name: "fetchWords" }, (response) => {
            setWord(response.word);
            setDefinition(response.def);
            console.log("word is ", word);
            console.log("definition is ", definition);
        });
    };

    return (
        <div>
            <h1>Word</h1>
            <p>Word Description ... </p>
            <button onClick={clickedButton}>Click me</button>
            <h1>{word}</h1>
            <p>{definition}</p>
        </div>
    );
}

export default WordOfTheDay;