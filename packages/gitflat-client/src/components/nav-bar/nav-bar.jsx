import { Component } from 'react';
import './nav-bar.css';

class NavBar extends Component{
    render() {
        return(   
            <section className='navBar'>
                <ul>
                <li><a href="#branches">Branches</a></li>
                <li><a href="#pull-requests">Pull Requests</a></li>
                </ul>
            </section>
        );
    }
}

export default NavBar;

