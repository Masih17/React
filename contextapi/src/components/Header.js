import React from 'react';
import UserContext from './UserContext';

export default function Header() {
    // the useContext hook took our object UserContext
    const userContext = React.useContext(UserContext);

    return (
        <div>
            Hello {userContext.user.name}
        </div>
    );
}