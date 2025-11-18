import React, {useState} from 'react';

function App() {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh", // Full viewport height
            flexDirection: "column", // Stack elements vertically
        }}
        >
            <div>
                <label htmlFor="userInput">Enter Text:</label>
                <br />
                <input
                    type="text"
                    id="userInput"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Type something here..."
                />
            </div>

            <div>
                <label htmlFor="duplicatedText">Duplicated Text:</label>
                <br />
                <input
                    type="text"
                    id="duplicatedText"
                    value={inputValue}
                    readOnly
                />
            </div>
        </div>
    );
}

export default App;
