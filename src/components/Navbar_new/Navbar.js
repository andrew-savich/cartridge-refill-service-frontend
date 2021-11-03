import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';


export const Navbar = () =>{
    return(
        <div >
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <NavLink className="nav-link active" aria-current="page" href="#">Active</NavLink>
                </li>
                <li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Dropdown</NavLink>
                    <ul className="dropdown-menu">
                        <li><NavLink className="dropdown-item" href="#">Action</NavLink></li>
                        <li><NavLink className="dropdown-item" href="#">Another action</NavLink></li>
                        <li><NavLink className="dropdown-item" href="#">Something else here</NavLink></li>
                        <li><NavLink className="dropdown-item" href="#">Separated link</NavLink></li>
                    </ul>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" href="#">Link</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link disabled">Disabled</NavLink>
                </li>
            </ul>
        </div>
    )
}