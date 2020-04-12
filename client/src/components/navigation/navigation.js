import React, { Fragment } from 'react';
import './navigation.css';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../authorization/index'


const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return {color: '#ff9900'}
    } else {
        return {color: 'ffffff'}
    }
};

// Destructuring history
const Navigation = ( {history} ) => (
    <nav>
        <h3 className="logo">JJ Brand</h3>
        <ul className="nav-links">
            
            <li>
                <Link className='nav-style links' style={isActive(history, '/')} to='/'>
                    Home
                </Link>
            </li>

            <li>
                <Link className='nav-style links' style={isActive(history, '/shop')} to='/shop'>
                    Shop
                </Link>
            </li>

            
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                    <Link className='nav-style links' style={isActive(history, '/user/dashboard')} to='/user/dashboard'>
                        User Dashboard
                    </Link>
                </li>
            )}
            
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                    <Link className='nav-style links' style={isActive(history, '/admin/dashboard')} to='/admin/dashboard'>
                        Admin Dashboard
                    </Link>
                </li>
            )}
            

            {!isAuthenticated() && (
                <Fragment>
                    <li>
                        <Link className='nav-style links' style={isActive(history, '/login')} to='/login'>
                            Login
                        </Link>
                    </li>

                    <li>
                        <Link className='nav-style links' style={isActive(history, '/signup')} to='/signup'>
                            Sign Up
                        </Link>
                    </li>
                </Fragment>
            )}

            {isAuthenticated() && (
                <li>
                    <span className='nav-style links' 
                            style={{cursor: 'pointer', color: 'ffffff'}}
                            onClick={() => signout(() =>
                                history.push('/login'))}
                            to='/signout'>
                        Sign Out
                    </span>
                </li>
            )}
            
        </ul>
    </nav>
);



export default withRouter(Navigation);




















// import React from 'react';
// import './navigation.css';
// import {Link, withRouter} from 'react-router-dom';
// import {signout} from '../authorization/index'


// class Navigation extends React.Component {
//     constructor(props) {
//         super(props);
//     }

//     // isActive(history, path) {
//     //     if (history.pathname === path) {
//     //         return {color: '#ff9900'}
//     //     } else {
//     //         return {color: 'ffffff'}
//     //     }
//     // }

//     render() {
//         return (
//             <nav>
//                 <h3 className="logo">JJ Brand</h3>
//                 <ul className="nav-links">
                    
//                     <li>
//                         <Link className='nav-style links' to='/'>
//                             Home
//                         </Link>
//                     </li>

//                     <li>
//                         <Link className='nav-style links' to='/login'>
//                             Login
//                         </Link>
//                     </li>

//                     <li>
//                         <Link className='nav-style links' to='/signup'>
//                             Sign Up
//                         </Link>
//                     </li>

//                     <li>
//                         <span className='nav-style links' onClick={() => signout(() => {
                            
//                         })} to='/signout'>
//                             Sign Out
//                         </span>
//                     </li>
                    
//                 </ul>
//             </nav>
//         );
//     }
// }


// export default Navigation;