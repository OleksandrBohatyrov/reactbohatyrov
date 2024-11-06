import React, { useState } from 'react';

function ProductActions({ product, users, buyProduct, updateProduct, deleteProduct }) {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ ...product });
    const [selectedUserId, setSelectedUserId] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        updateProduct(formData);
        setEditMode(false);
    };

    const handleUserSelect = (e) => {
        setSelectedUserId(e.target.value);
    };

    const handleBuy = () => {
        if (selectedUserId) {
            buyProduct(product.id, selectedUserId);
        } else {
            alert('Palun vali kasutaja ostmiseks.');
        }
    };

    return (
        <div>
            {editMode ? (
                <form onSubmit={handleUpdate}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Toote nimi"
                    />
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Hind"
                    />
                    <button type="submit">Salvesta</button>
                    <button type="button" onClick={() => setEditMode(false)}>Tühista</button>
                </form>
            ) : (
                <>
                    <span>{product.name} - {product.price} eurot - {product.isActive ? "Aktiivne" : "Mitteaktiivne"}</span>

                    <select value={selectedUserId} onChange={handleUserSelect}>
                        <option value="">Vali kasutaja</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.eesnimi} {user.perenimi}
                            </option>
                        ))}
                    </select>

                    <button onClick={handleBuy}>Osta</button>
                    <button onClick={() => setEditMode(true)}>Muuda</button>
                    <button onClick={() => deleteProduct(product.id)}>Kustuta</button>
                </>
            )}
        </div>
    );
}

export default ProductActions;
