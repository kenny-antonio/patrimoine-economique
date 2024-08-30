import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/patrimoine">Patrimoine</Link></li>
          <li><Link to="/possession">Possessions</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
