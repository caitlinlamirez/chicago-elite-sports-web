import './Nav.css';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function Nav() {
    const location = useLocation(); // Get the current location

    const toggleMenu = () => {
        const menu = document.querySelector('nav ul');
        menu.classList.toggle('open'); // Toggle the open class to show/hide the menu
    };

    useEffect(() => {
        const menu = document.querySelector('nav ul');

        // Close the menu on route change
        if (menu.classList.contains('open')) {
            menu.classList.remove('open');
        }
    }, [location]); // Run this effect whenever the location changes

    return (
        <nav>
            <Link to="/">
                <img className="logopic" src="/chicagoelitesportslogo.png" alt="Halloween Hockey Bash Logo" />
            </Link>

            <button className="nav-toggle" onClick={toggleMenu}>
                <i className="fa-solid fa-bars"></i>
            </button> {/* "Menu" button */}

            <ul>
                <li><Link to="/about">About</Link></li>
                <li><a href="#schedule">Schedule</a></li>
                <li><Link to="/results">Results</Link></li>
                <li><Link to="/standings">Standings</Link></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    );
}

export default Nav;
