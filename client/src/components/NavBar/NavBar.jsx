import React, {useEffect, useState} from 'react';
import NavBarHome from './NavBarHome/NavBarHome';
import NavBarWelcome from './NavBarWelcome/NavBarWelcome';
import {useSelector} from "react-redux";



const NavBar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    const {authData} = useSelector((state)=> state.auth); 


    useEffect(()=> {
        // JWT...
        console.log('====================================');
        console.log(authData);
        console.log('====================================');
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [authData]);
   
    return (
        user ? <NavBarHome/> : <NavBarWelcome />
    );

    
}

export default NavBar;