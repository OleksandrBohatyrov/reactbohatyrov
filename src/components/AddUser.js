import React, { useState } from 'react';

function AddUser({ addUser }) {
    const [formData, setFormData] = useState({
        kasutajanimi: '',
        parool: '',
        eesnimi: '',
        perenimi: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addUser(formData);
        setFormData({
            kasutajanimi: '',
            parool: '',
            eesnimi: '',
            perenimi: ''
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Kasutaja lisamine</h3>
            <input
                type="text"
                name="kasutajanimi"
                value={formData.kasutajanimi}
                onChange={handleChange}
                placeholder="Kasutajanimi"
                required
            />
            <input
                type="password"
                name="parool"
                value={formData.parool}
                onChange={handleChange}
                placeholder="Parool"
                required
            />
            <input
                type="text"
                name="eesnimi"
                value={formData.eesnimi}
                onChange={handleChange}
                placeholder="Eesnimi"
                required
            />
            <input
                type="text"
                name="perenimi"
                value={formData.perenimi}
                onChange={handleChange}
                placeholder="Perekonnanimi"
                required
            />
            <button type="submit">Lisa kasutaja</button>
        </form>
    );
}

export default AddUser;
