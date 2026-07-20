import { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  Clock3,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
  X
} from 'lucide-react';
import { Button } from './common';
import { useMockAuth } from '../context/MockAuthContext';
export function Logo() {
  return <Link
    to="/"
    className="logo"
  >
    <span>Q</span>QueueFlow
  </Link>;
}
export function PublicLayout() {
  const [open, setOpen] = useState(false);
  return <div>
    <header className="public-nav">
      <Logo />
      <nav className={open ? 'open' : ''}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/providers">Explore providers</NavLink>
        <Link to="/login">Log in</Link>
        <Button
          as={Link}
          to="/signup"
        >Get started</Button>
      </nav>
      <button
        className="mobile-menu"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
    <main>
      <Outlet />
    </main>
    <footer className="footer">
      <div>
        <Logo />
        <p>Less waiting. Better service. Every time.</p>
      </div>
      <div>
        <strong>Product</strong>
        <Link to="/providers">Find providers</Link>
        <Link to="/signup">For providers</Link>
      </div>
      <div>
        <strong>Company</strong>
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>
      </div>
      <div>
        <strong>Legal</strong>
        <Link to="/">Privacy</Link>
        <Link to="/">Terms</Link>
      </div>
      <p className="copyright">© 2026 QueueFlow. Built for better service experiences.</p>
    </footer>
  </div>;
}
const customerNav = [
  [LayoutDashboard, 'Dashboard', '/customer/dashboard'],
  [CalendarDays, 'My bookings', '/customer/bookings'],
  [Clock3, 'Live queue', '/customer/queue/b1'],
  [Settings, 'Profile & settings', '/customer/profile']
];

const providerNav = [
  [LayoutDashboard, 'Dashboard', '/provider/dashboard'],
  [BriefcaseBusiness, 'Services', '/provider/services'],
  [CalendarDays, 'Bookings', '/provider/bookings'],
  [Users, 'Live queue', '/provider/queue'],
  [Clock3, 'Availability', '/provider/availability'],
  [Settings, 'Profile & settings', '/provider/profile']
];
export function DashboardLayout({
  type
}) {
  const [open, setOpen] = useState(false);
  const {
    role,
    switchRole,
    user
  } = useMockAuth();
  const nav = type === 'provider' ? providerNav : customerNav;
  const location = useLocation();
  return <div className="app-shell">
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar-top">
        <Logo />
        <button
          className="mobile-close"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <X />
        </button>
      </div>
      <p className="nav-label">
        {type} workspace
      </p>
      <nav>
        {nav.map(([Icon, label, to]) => <NavLink
          key={to}
          to={to}
          onClick={() => setOpen(false)}
        >
          <Icon />
          {label}
        </NavLink>)}
      </nav>
      <div className="role-switch">
        <label htmlFor="mock-role">Development role 
          <span>(mocked)</span>
        </label>
        <div>
          <select
            id="mock-role"
            value={role}
            onChange={e => {
              switchRole(e.target.value);
              if (
                location.pathname.startsWith('/provider') &&
                e.target.value === 'customer'
              ) {
                window.location.href = '/customer/dashboard';
              }
              if (
                location.pathname.startsWith('/customer') &&
                e.target.value === 'provider'
              ) {
                window.location.href = '/provider/dashboard';
              }
            }}
          >
            <option value="customer">Customer</option>
            <option value="provider">Provider</option>
          </select>
          <ChevronDown />
        </div>
        <small>UI-only guards are not security.</small>
      </div>
      <Link
        to="/"
        className="logout"
      >
        <LogOut /> Back to website
      </Link>
    </aside>
    {open && <div
      className="sidebar-overlay"
      onClick={() => setOpen(false)}
    />}
    <div className="app-main">
      <header className="app-topbar">
        <button
          className="mobile-menu"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu />
        </button>
        <div>
          <span className="avatar">KV</span>
          <div>
            <strong>
              {user.name}
            </strong>
            <small>
              {type === 'provider' ? 'Aarav Wellness Studio' : 'Customer'}
            </small>
          </div>
        </div>
      </header>
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  </div>;
}
