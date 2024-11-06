import React from 'react';

function ProductList({ products }) {
    return (
        <div>
            <h2>Продукты</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.price} евро - {product.isActive ? "Активен" : "Неактивен"}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;
