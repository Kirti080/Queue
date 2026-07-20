import { Link } from 'react-router-dom';
import { Button } from '../components/common';
export default function NotFound() {
  return <main className="not-found">
    <span>404</span>
    <h1>This page missed its turn</h1>
    <p>The page you’re looking for doesn’t exist or has moved.</p>
    <Button
      as={Link}
      to="/"
    >Return home</Button>
  </main>;
}

