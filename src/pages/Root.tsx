import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

export default () => (
  <>
    <Link to="/stack">
      <Button>stack</Button>
    </Link>
    <Link to="/linkedstack">
      <Button>linked stack</Button>
    </Link>
  </>
);
