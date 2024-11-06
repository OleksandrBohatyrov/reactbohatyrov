import React from 'react';

function UserList({ users }) {
    return (
        <div>
            <h2>Kasutajad</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.eesnimi} {user.perenimi} - {user.kasutajanimi}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
