import React, {useEffect, useState} from 'react';
import NavBarHome from './NavBarHome';
import NavBarWelcome from './NavBarWelcome/NavBarWelcome';

const NavBar = () => {
    
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    useEffect(()=> {
        // JWT...
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, []);
   
    return (
        user ? <NavBarHome/> : <NavBarWelcome/>
    );

    
}

export default NavBar;