import React, {useState} from 'react';

function App() {
    const [num1, setNum1] = useState("");
    const [num2, setNum2] = useState("");

    const handleNum1Change = (event) => {
        setNum1(event.target.value);
    };

    const handleNum2Change = (event) => { // ANSWER: second handler
        setNum2(event.target.value);
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
                <label htmlFor="number1">Enter 1st number:</label>
                <br/>
                <input
                    type="number"
                    id="number1"
                    value={num1}
                    onChange={handleNum1Change}
                    placeholder="Enter number"
                />
            </div>
            <div>
                <label htmlFor="number2">Enter 2nd number:</label>
                <br/>
                <input
                    type="number"
                    id="number2"
                    value={num2}
                    onChange={handleNum2Change}
                    placeholder="Enter number"
                />
            </div>

            <div>
                <label htmlFor="sum">Sum:</label>
                <br/>
                <input
                    type="number"
                    id="sum"
                    value={+num1 + +num2}
                    readOnly
                />
            </div>
        </div>
    );
}

export default App;
