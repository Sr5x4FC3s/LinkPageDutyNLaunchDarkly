import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div>
    <button>
      <Link to='/ld_pd_comms'>LD and PD Testing</Link>
    </button>
    <button>
      <Link to='/sdk_testing'>LD SDK Testing</Link>
    </button>
  </div>
);

export default Nav;