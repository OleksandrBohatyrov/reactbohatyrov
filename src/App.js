import { useRef } from 'react';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [prices, setPrices] = useState([]);
    const [chosenCountry, setChosenCountry] = useState("ee");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const startRef = useRef();
    const endRef = useRef();

    useEffect(() => {
        if (start !== "" && end !== "") {
            fetch("https://localhost:7198/nordpool/" + chosenCountry + "/" + start + "/" + end)
                .then(res => res.json())
                .then(json => {
                    setPrices(json);
                });
        }
    }, [chosenCountry, start, end]);

    function updateStart() {
        const startIso = new Date(startRef.current.value).toISOString();
        setStart(startIso);
    }

    function updateEnd() {
        const endIso = new Date(endRef.current.value).toISOString();
        setEnd(endIso);
    }

    return (
        <div>
            <button onClick={() => setChosenCountry("fi")}>Soome</button>
            <button onClick={() => setChosenCountry("ee")}>Eesti</button>
            <button onClick={() => setChosenCountry("lv")}>Läti</button>
            <button onClick={() => setChosenCountry("lt")}>Leedu</button>
            <input ref={startRef} onChange={updateStart} type="datetime-local" />
            <input ref={endRef} onChange={updateEnd} type="datetime-local" />
            {prices.length > 0 &&
                <table style={{marginLeft: "100px"}}>
                    <thead>
                    <th style={{border: "1px solid #ddd", padding: "12px", backgroundColor: "#04AA6D"}}>Ajatempel</th>
                    <th style={{border: "1px solid #ddd", padding: "12px", backgroundColor: "#04AA6D"}}>Hind</th>
                    </thead>
                    <tbody>
                    <td style={{position: "absolute", left: "30px"}}>{chosenCountry}</td>
                    {prices.map(data =>
                        <tr key={data.timestamp}>
                            <td style={{border: "1px solid #ddd", padding: "8px"}}>{new Date(data.timestamp * 1000).toISOString()}</td>
                            <td style={{border: "1px solid #ddd", padding: "8px"}}>{data.price}</td>
                        </tr>)}
                    </tbody>
                </table>}
        </div>
    );
}

export default App;