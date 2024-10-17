import { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [kasutajad, setKasutajad] = useState([]);
    const [uusKasutaja, setUusKasutaja] = useState({
        kasutajanimi: '',
        parool: '',
        eesnimi: '',
        perenimi: '',
    });
    const [editMode, setEditMode] = useState(false);
    const [kasutajaToEdit, setKasutajaToEdit] = useState(null);

    // Получить список пользователей с API
    useEffect(() => {
        fetch('https://localhost:7198/api/kasutaja')
            .then((response) => response.json())
            .then((data) => setKasutajad(data))
            .catch((error) => console.error('Viga:', error));
    }, []);

    // Добавить нового пользователя
    const lisaKasutaja = (e) => {
        e.preventDefault();

        fetch('https://localhost:7198/api/kasutaja', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(uusKasutaja),
        })
            .then((response) => response.json())
            .then((newUser) => {
                setKasutajad([...kasutajad, newUser]);
                setUusKasutaja({ kasutajanimi: '', parool: '', eesnimi: '', perenimi: '' }); // Очистить форму
            })
            .catch((error) => console.error('Viga:', error));
    };

    // Удалить пользователя
    const kustutaKasutaja = (id) => {
        fetch(`https://localhost:7198/api/kasutaja/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                setKasutajad(kasutajad.filter((kasutaja) => kasutaja.id !== id));
            })
            .catch((error) => console.error('Viga:', error));
    };

    // Обновить пользователя
    const uuendaKasutaja = (e) => {
        e.preventDefault();

        fetch(`https://localhost:7198/api/kasutaja/${kasutajaToEdit.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(kasutajaToEdit),
        })
            .then(() => {
                setKasutajad(kasutajad.map((kasutaja) =>
                    kasutaja.id === kasutajaToEdit.id ? kasutajaToEdit : kasutaja
                ));
                setEditMode(false);
                setKasutajaToEdit(null);
            })
            .catch((error) => console.error('Viga:', error));
    };

    // Включить режим редактирования
    const startEditing = (kasutaja) => {
        setEditMode(true);
        setKasutajaToEdit({ ...kasutaja });
    };

    return (
        <div className="App">
            <h1>Kasutajate loend</h1>
            <ul>
                {kasutajad.map((kasutaja) => (
                    <li key={kasutaja.id}>
                        {kasutaja.eesnimi} {kasutaja.perenimi} ({kasutaja.kasutajanimi})
                        <button onClick={() => kustutaKasutaja(kasutaja.id)}>Kustuta</button>
                        <button onClick={() => startEditing(kasutaja)}>Redigeeri</button>
                    </li>
                ))}
            </ul>

            {editMode ? (
                <>
                    <h2>Redigeeri kasutaja</h2>
                    <form onSubmit={uuendaKasutaja}>
                        <input
                            type="text"
                            placeholder="Kasutajanimi"
                            value={kasutajaToEdit.kasutajanimi}
                            onChange={(e) =>
                                setKasutajaToEdit({ ...kasutajaToEdit, kasutajanimi: e.target.value })
                            }
                        />
                        <input
                            type="password"
                            placeholder="Parool"
                            value={kasutajaToEdit.parool}
                            onChange={(e) =>
                                setKasutajaToEdit({ ...kasutajaToEdit, parool: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Nimi"
                            value={kasutajaToEdit.eesnimi}
                            onChange={(e) =>
                                setKasutajaToEdit({ ...kasutajaToEdit, eesnimi: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Perenimi"
                            value={kasutajaToEdit.perenimi}
                            onChange={(e) =>
                                setKasutajaToEdit({ ...kasutajaToEdit, perenimi: e.target.value })
                            }
                        />
                        <button type="submit">Uuendama</button>
                    </form>
                </>
            ) : (
                <>
                    <h2>Lisa uus kasutaja</h2>
                    <form onSubmit={lisaKasutaja}>
                        <input
                            type="text"
                            placeholder="Kasutajanimi"
                            value={uusKasutaja.kasutajanimi}
                            onChange={(e) => setUusKasutaja({ ...uusKasutaja, kasutajanimi: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Parool"
                            value={uusKasutaja.parool}
                            onChange={(e) => setUusKasutaja({ ...uusKasutaja, parool: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Nimi"
                            value={uusKasutaja.eesnimi}
                            onChange={(e) => setUusKasutaja({ ...uusKasutaja, eesnimi: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Perenimi"
                            value={uusKasutaja.perenimi}
                            onChange={(e) => setUusKasutaja({ ...uusKasutaja, perenimi: e.target.value })}
                        />
                        <button type="submit">Lisa</button>
                    </form>
                </>
            )}
        </div>
    );
}

export default App;
