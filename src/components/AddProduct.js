import React, { useState } from 'react';

function AddProduct({ addProduct }) {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        isActive: true
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct(formData);
        setFormData({
            name: '',
            price: '',
            isActive: true
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Toote lisamine</h3>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Toote nimi"
                required
            />
            <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Hind"
                required
            />
            <label>
                Aktiivne:
                <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Lisa toode</button>
        </form>
    );
}

export default AddProduct;
