import React from 'react';
import {
    Nav, 
    NavLink,
    Bars,
    NavMenu,
} from './NavbarElements';

const Navbar = () => {
    return (
        <>
        <Nav> 
            <Bars />
            <NavMenu>
                <NavLink to='/'> Home </NavLink>
                <NavLink to='/find'> Find </NavLink>
            </NavMenu>
        </Nav>
        </>
    );
};

export default Navbar;

// import React from 'react';
// import {Link} from 'react-router-dom';

// const Nav = () => {
//     return (
//         <div classname="navbar">
//             <div classname="logo">Maptop</div>
//             <ul classname="nav-links">
//                 <Link to="/">Home</Link>
//                 <Link to="/find">Find</Link>
//             </ul>
//         </div>
//     );
// }

// export default Nav;