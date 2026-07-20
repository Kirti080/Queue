import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { BriefcaseBusiness, CheckCircle2, Eye, EyeOff, UserRound } from 'lucide-react';
import { Button } from '../components/common';
import { Logo } from '../components/layouts';
import { useMockAuth } from '../context/MockAuthContext';
export function Login() {
  const [show, setShow] = useState(false),
    [error, setError] = useState(''),
    nav = useNavigate(),
    {
      role
    } = useMockAuth();
  const submit = e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (!data.get('email') || String(data.get('password')).length < 6) {
      setError('Enter a valid email and a password of at least 6 characters.');
      return;
    }
    nav(`/${role}/dashboard`);
  };
  return <AuthShell
    title="Welcome back"
    subtitle="Log in to manage bookings and queues."
  >
    <div className="mock-note">Demo authentication: use any valid email and a 6+ character password.</div>
    <form onSubmit={submit}>
      <label>Email address
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
        />
      </label>
      <label>Password
        <div className="password">
          <input
            name="password"
            type={show ? 'text' : 'password'}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </label>
      {error && <p className="error-box">
        {error}
      </p>}
      <div className="split">
        <label className="check">
          <input type="checkbox" /> Remember me
        </label>
        <Link to="/forgot-password">Forgot password?</Link>
      </div>
      <Button
        type="submit"
        className="full-btn btn-lg"
      >Log in</Button>
    </form>
    <div className="or">
      <span>or continue with</span>
    </div>
    <Button
      variant="outline"
      className="full-btn"
    >G&nbsp; Google 
      <small>(visual only)</small>
    </Button>
    <p className="auth-footer">New to QueueFlow? 
      <Link to="/signup">Create an account</Link>
    </p>
  </AuthShell>;
}
export function Signup() {
  const [params] = useSearchParams();
  const [role, setRole] = useState(params.get('role') || 'customer'),
    [show, setShow] = useState(false),
    [error, setError] = useState(''),
    nav = useNavigate(),
    auth = useMockAuth();
  const submit = e => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    if (!d.get('name') || !d.get('email') || String(d.get('password')).length < 8) {
      setError('Complete all fields and use at least 8 password characters.');
      return;
    }
    auth.switchRole(role);
    nav(`/${role}/dashboard`);
  };
  return <AuthShell
    title="Create your account"
    subtitle="Join QueueFlow and take back your time."
  >
    <div className="role-cards">
      <button
        className={role === 'customer' ? 'active' : ''}
        onClick={() => setRole('customer')}
      >
        <UserRound />
        <strong>I’m a customer</strong>
        <small>Book and track services</small>
      </button>
      <button
        className={role === 'provider' ? 'active' : ''}
        onClick={() => setRole('provider')}
      >
        <BriefcaseBusiness />
        <strong>I’m a provider</strong>
        <small>Manage bookings and queues</small>
      </button>
    </div>
    <div className="mock-note">Account creation is mocked; no data leaves your browser.</div>
    <form onSubmit={submit}>
      <label>Full name
        <input
          name="name"
          placeholder="Your full name"
        />
      </label>
      <label>Email address
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
        />
      </label>
      <label>Password
        <div className="password">
          <input
            name="password"
            type={show ? 'text' : 'password'}
            placeholder="At least 8 characters"
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            aria-label="Toggle password visibility"
          >
            {show ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </label>
      {error && <p className="error-box">
        {error}
      </p>}
      <label className="check">
        <input
          required
          type="checkbox"
        /> I agree to the Terms and Privacy Policy
      </label>
      <Button
        type="submit"
        className="full-btn btn-lg"
      >Create account</Button>
    </form>
    <p className="auth-footer">Already have an account? 
      <Link to="/login">Log in</Link>
    </p>
  </AuthShell>;
}
export function ForgotPassword() {
  const [sent, setSent] = useState(false);
  return <AuthShell
    title="Reset your password"
    subtitle="We’ll send you a link to choose a new password."
  >
    {sent ? <div className="success-state compact">
      <CheckCircle2 />
      <h2>Check your inbox</h2>
      <p>This is a visual demo; no email was sent.</p>
      <Button
        as={Link}
        to="/login"
      >Back to login</Button>
    </div> : <form onSubmit={e => {
      e.preventDefault();
      setSent(true);
    }}>
      <label>Email address
        <input
          required
          type="email"
          placeholder="you@example.com"
        />
      </label>
      <Button className="full-btn btn-lg">Send reset link</Button>
      <p className="auth-footer">
        <Link to="/login">Back to login</Link>
      </p>
    </form>}
  </AuthShell>;
}
function AuthShell({
  title,
  subtitle,
  children
}) {
  return <main className="auth-page">
    <section className="auth-brand">
      <Logo />
      <div>
        <p className="eyebrow">QueueFlow</p>
        <h1>Spend less time waiting.</h1>
        <p>One reliable place for bookings, appointment updates, and live queues.</p>
      </div>
      <blockquote>“A smoother day for customers and service teams.”</blockquote>
    </section>
    <section className="auth-form">
      <div>
        <Logo />
        <h1>
          {title}
        </h1>
        <p>
          {subtitle}
        </p>
        {children}
      </div>
    </section>
  </main>;
}

