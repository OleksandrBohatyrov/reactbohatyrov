import { useState, useEffect } from 'react';
import './App.css';
import UserList from './components/UserList';
import ProductList from './components/ProductList';
import AddUser from './components/AddUser';
import AddProduct from './components/AddProduct';
import ProductActions from './components/ProductActions';

function App() {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);

    // Kasutajate nimekirja laadimine
    useEffect(() => {
        fetch('https://localhost:7198/api/Kasutaja')
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("Viga kasutajate laadimisel:", error));
    }, []);

    // Toodete nimekirja laadimine
    useEffect(() => {
        fetch('https://localhost:7198/tooted')
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Viga toodete laadimisel:", error));
    }, []);

    // Kasutaja lisamise funktsioon
    const addUser = (user) => {
        fetch('https://localhost:7198/api/Kasutaja', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then((response) => response.json())
            .then((newUser) => setUsers([...users, newUser]))
            .catch((error) => console.error("Viga kasutaja lisamisel:", error));
    };

    // Toote lisamise funktsioon
    const addProduct = (product) => {
        fetch('https://localhost:7198/tooted/lisa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then((response) => response.json())
            .then((newProduct) => setProducts([...products, newProduct]))
            .catch((error) => console.error("Viga toote lisamisel:", error));
    };

    // Toote ostmise funktsioon
    const buyProduct = (productId, userId) => {
        fetch(`https://localhost:7198/tooted/osta/${productId}/${userId}`, {
            method: 'POST'
        })
            .then((response) => response.json())
            .then((data) => alert(data))
            .catch((error) => console.error("Viga toote ostmisel:", error));
    };

    // Toote uuendamise funktsioon
    const updateProduct = (product) => {
        fetch(`https://localhost:7198/tooted/${product.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then((response) => response.json())
            .then((updatedProduct) => {
                setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
            })
            .catch((error) => console.error("Viga toote uuendamisel:", error));
    };

    // Toote kustutamise funktsioon
    const deleteProduct = (productId) => {
        fetch(`https://localhost:7198/tooted/${productId}`, {
            method: 'DELETE'
        })
            .then(() => {
                setProducts(products.filter((p) => p.id !== productId));
            })
            .catch((error) => console.error("Viga toote kustutamisel:", error));
    };

    return (
        <div className="App">
            <h1>Halduspaneel</h1>
            <AddUser addUser={addUser} />
            <AddProduct addProduct={addProduct} />
            <UserList users={users} />
            <h2>Tooted</h2>
            {products.map((product) => (
                <ProductActions
                    key={product.id}
                    product={product}
                    users={users}
                    buyProduct={buyProduct}
                    updateProduct={updateProduct}
                    deleteProduct={deleteProduct}
                />
            ))}
        </div>
    );
}

export default App;
