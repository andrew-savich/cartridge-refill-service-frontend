import React, { useState, useEffect, useRef} from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
    const [isShow, setIsShow] = useState(false);
    const refDropdown = useRef(null);

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (isShow && refDropdown.current && !refDropdown.current.contains(e.target)) {
                setIsShow(false);
            }
        }
            
        document.addEventListener("mousedown", checkIfClickedOutside);

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
        
    }, [isShow]);

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">Bajter</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/refills">Refills</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link dropdown-toggle" onClick={() => {setIsShow(!isShow)}} to="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Cartridges</NavLink>
                                <ul ref={refDropdown} className={"dropdown-menu bg-light text-dark " + (isShow ? 'show' : '') } aria-labelledby="navbarDropdownMenuLink">
                                    <li><NavLink className="dropdown-item" to="/groups" onClick={() => {setIsShow(false)}}>Groups</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/models" onClick={() => {setIsShow(false)}}>Models</NavLink></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/clients">Clients</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/employees">Employees</NavLink>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
    )
}