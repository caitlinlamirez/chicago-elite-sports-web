import './Header.css'
import { Link } from 'react-router-dom';
function Header() {
    return (
      <header>
        <div className="header-content">
        <Link to="/"> {/* Link to the home page */}
                <img className="banner-image" src="/banner.png" alt="Banner Image" />
        </Link>
        </div>
      </header>
    );
  }
  
  export default Header;