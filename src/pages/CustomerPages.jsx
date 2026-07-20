import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarCheck,
  CheckCircle2,
  Clock3,
  MapPin,
  Star,
  TicketCheck
} from 'lucide-react';
import {
  BookingCard,
  Button,
  Dialog,
  EmptyState,
  MetricCard,
  PageHeader,
  StatusBadge
} from '../components/common';
import { bookings, providers, queueEntries, services } from '../data/mockData';
export function CustomerDashboard() {
  const upcoming = bookings[1];
  return <><PageHeader
      eyebrow="Monday, 20 July"
      title="Good morning, Kirti"
      description="Here’s what’s happening with your appointments."
      action={<Button
        as={Link}
        to="/providers"
      >Book a service</Button>}
    /><div className="metrics-grid">
      <MetricCard
        icon={CalendarCheck}
        label="Upcoming"
        value="2"
        detail="Next on 22 July"
      />
      <MetricCard
        icon={TicketCheck}
        label="Completed"
        value="12"
        detail="Across 5 providers"
        tone="green"
      />
      <MetricCard
        icon={Clock3}
        label="Time saved"
        value="4.5 hrs"
        detail="This month"
        tone="violet"
      />
      <MetricCard
        icon={Star}
        label="Reviews given"
        value="8"
        detail="Thank you!"
        tone="amber"
      />
    </div><div className="dashboard-grid">
      <section className="panel span-2">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Next appointment</p>
            <h2>Coming up this week</h2>
          </div>
          <Link to="/customer/bookings">All bookings</Link>
        </div>
        <BookingCard
          booking={upcoming}
          actions={<Button variant="outline">Reschedule</Button>}
        />
      </section>
      <section className="panel queue-widget">
        <div className="panel-head">
          <h2>Live queue</h2>
          <StatusBadge status="in_queue" />
        </div>
        <span className="queue-number">QF104</span>
        <p>2 people ahead · about 18 minutes</p>
        <div className="progress">
          <i style={{
            width: '62%'
          }} />
        </div>
        <Button
          as={Link}
          to="/customer/queue/b1"
          className="full-btn"
        >Track live queue</Button>
      </section>
      <section className="panel span-2">
        <div className="panel-head">
          <h2>Recent bookings</h2>
          <Link to="/customer/bookings">View history</Link>
        </div>
        {bookings.slice(0, 3).map(b => <BookingCard
          key={b.id}
          booking={b}
        />)}
      </section>
      <section className="panel">
        <div className="panel-head">
          <h2>Recommended for you</h2>
        </div>
        {providers.slice(0, 2).map(p => <Link
          className="mini-provider"
          to={`/providers/${p.id}`}
          key={p.id}
        >
          <span className={`avatar ${p.color}`}>
            {p.initials}
          </span>
          <div>
            <strong>
              {p.name}
            </strong>
            <small>
              <Star fill="currentColor" />
               
              {p.rating} · 
              {p.location.split(',')[0]}
            </small>
          </div>
        </Link>)}
      </section>
    </div></>;
}
export function CustomerBookings() {
  const [tab, setTab] = useState('upcoming'),
    [search, setSearch] = useState(''),
    [cancel, setCancel] = useState(null),
    [review, setReview] = useState(null),
    [toast, setToast] = useState('');
  const match = b => {
    if (tab === 'upcoming') {
      return [
        'pending',
        'confirmed',
        'checked_in',
        'in_queue',
        'in_progress'
      ].includes(b.status);
    }
    if (tab === 'completed') {
      return b.status === 'completed';
    }
    return ['cancelled', 'rejected', 'no_show'].includes(b.status);
  };
  const filtered = bookings.filter(b => {
    const providerName = providers.find(p => p.id === b.providerId)?.name;
    const serviceName = services.find(s => s.id === b.serviceId)?.name;
    const normalizedSearch = search.toLowerCase();

    return (
      match(b) &&
      (providerName?.toLowerCase().includes(normalizedSearch) ||
        serviceName?.toLowerCase().includes(normalizedSearch))
    );
  });
  return <><PageHeader
      title="My bookings"
      description="View, update, and revisit all your appointments."
      action={<Button
        as={Link}
        to="/providers"
      >Book new appointment</Button>}
    />{toast && <div className="toast success">
      <CheckCircle2 />
      {toast}
    </div>}<div className="toolbar">
      <div className="tabs">
        {['upcoming', 'completed', 'cancelled'].map(x => <button
          key={x}
          className={tab === x ? 'active' : ''}
          onClick={() => setTab(x)}
        >
          {x}
        </button>)}
      </div>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search bookings"
        aria-label="Search bookings"
      />
    </div><section className="panel booking-list">
      {filtered.length ? filtered.map(b => <BookingCard
        key={b.id}
        booking={b}
        actions={tab === 'upcoming' ? <>
          <Button variant="outline">Reschedule</Button>
          <Button
            variant="danger"
            onClick={() => setCancel(b)}
          >Cancel</Button>
        </> : tab === 'completed' ? (
          <Button onClick={() => setReview(b)}>Leave a review</Button>
        ) : null}
      />) : <EmptyState
        title={`No ${tab} bookings`}
        description="Your bookings in this category will appear here."
      />}
    </section><Dialog
      open={!!cancel}
      title="Cancel appointment?"
      onClose={() => setCancel(null)}
      footer={<><Button
          variant="outline"
          onClick={() => setCancel(null)}
        >Keep appointment</Button><Button
          variant="danger"
          onClick={() => {
            setCancel(null);
            setToast('Appointment cancelled in this demo.');
          }}
        >Cancel appointment</Button></>}
    >
      <p>The provider will be notified. This demonstration does not save changes permanently.</p>
    </Dialog><Dialog
      open={!!review}
      title="How was your visit?"
      onClose={() => setReview(null)}
      footer={<Button onClick={() => {
        setReview(null);
        setToast('Thank you—your review was submitted.');
      }}>Submit review</Button>}
    >
      <label>Rating
        <select>
          <option>5 — Excellent</option>
          <option>4 — Good</option>
          <option>3 — Okay</option>
        </select>
      </label>
      <label>Your review
        <textarea placeholder="Share what stood out..." />
      </label>
    </Dialog></>;
}
export function CustomerQueue() {
  const [serving, setServing] = useState(102),
    [checked, setChecked] = useState(true),
    [left, setLeft] = useState(false),
    [confirm, setConfirm] = useState(false);
  useEffect(() => {
    if (!checked || left) return;
    const id = setInterval(() => setServing(x => Math.min(x + 1, 104)), 12000);
    return () => clearInterval(id);
  }, [checked, left]);
  const ahead = Math.max(104 - serving - 1, 0),
    progress = Math.min((serving - 101) / 3 * 100, 100);
  if (left) return <EmptyState
    title="You left the queue"
    description="Your appointment remains visible in My Bookings. Contact the provider if this was a mistake."
    action={<Button
      as={Link}
      to="/customer/bookings"
    >View booking</Button>}
  />;
  return <><PageHeader
      eyebrow="Live updates · locally simulated"
      title="Your live queue"
      description="You can step away—we’ll keep your position updated on this screen."
    /><div className="queue-page">
      <section className="queue-hero panel">
        <div className="split">
          <StatusBadge status={serving === 104 ? 'in_progress' : 'in_queue'} />
          <span>Last updated just now</span>
        </div>
        <p>Your queue number</p>
        <strong>QF104</strong>
        <h2>
          {serving === 104 ? 'It’s your turn!' : `${ahead} ${ahead === 1 ? 'person' : 'people'} ahead of you`}
        </h2>
        <p>
          {serving === 104
            ? 'Please proceed to the service desk.'
            : `Estimated wait: about ${Math.max(
              (104 - serving) * 8,
              2
            )} minutes`}
        </p>
        <div className="queue-track">
          <i style={{
            width: `${progress}%`
          }} />
          <span style={{
            left: `calc(${progress}% - 12px)`
          }}>KV</span>
        </div>
        <div className="split">
          <small>Currently serving QF
            {serving}
          </small>
          <small>You are QF104</small>
        </div>
      </section>
      <aside className="panel visit-card">
        <span className="avatar bg-indigo-100 text-indigo-700">AW</span>
        <h3>Aarav Wellness Studio</h3>
        <p>Physiotherapy Consultation</p>
        <div>
          <MapPin /> Indiranagar, Bengaluru
        </div>
        <div>
          <Clock3 /> 10:30 AM · 45 min
        </div>
      </aside>
      <section className="panel span-2">
        <h2>Visit status</h2>
        <div className="timeline">
          {[
            ['Booking confirmed', '20 Jul · 9:14 AM', true],
            ['Checked in', 'Today · 10:12 AM', checked],
            ['Waiting in queue', `Currently serving QF${serving}`, checked],
            ['Service begins', 'We’ll notify you', serving === 104]
          ].map(([t, d, done], i) => <div
            className={done ? 'done' : ''}
            key={t}
          >
            <span>
              {done ? <CheckCircle2 /> : i + 1}
            </span>
            <div>
              <strong>
                {t}
              </strong>
              <p>
                {d}
              </p>
            </div>
          </div>)}
        </div>
        <div className="actions">
          {!checked && <Button onClick={() => setChecked(true)}>Check in now</Button>}
          <Button
            variant="danger"
            onClick={() => setConfirm(true)}
          >Leave queue</Button>
        </div>
      </section>
    </div><Dialog
      open={confirm}
      title="Leave the live queue?"
      onClose={() => setConfirm(false)}
      footer={<><Button
          variant="outline"
          onClick={() => setConfirm(false)}
        >Stay in queue</Button><Button
          variant="danger"
          onClick={() => {
            setLeft(true);
            setConfirm(false);
          }}
        >Leave queue</Button></>}
    >
      <p>You may lose your position and need to check in again with the provider.</p>
    </Dialog></>;
}
export function CustomerProfile() {
  const [saved, setSaved] = useState(false);
  const save = e => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };
  return <><PageHeader
      title="Profile & settings"
      description="Keep your personal details and preferences up to date."
    />{saved && <div className="toast success">
      <CheckCircle2 />Your changes were saved locally.
    </div>}<form
      onSubmit={save}
      className="settings-grid"
    >
      <section className="panel">
        <h2>Personal details</h2>
        <div className="profile-avatar">
          <span className="avatar avatar-lg">KV</span>
          <Button
            type="button"
            variant="outline"
          >Change photo</Button>
        </div>
        <div className="field-grid">
          <label>Full name
            <input defaultValue="Kirti Verma" />
          </label>
          <label>Email
            <input
              type="email"
              defaultValue="kirti@example.com"
            />
          </label>
          <label>Phone
            <input defaultValue="9876543210" />
          </label>
          <label>City
            <input defaultValue="Bengaluru" />
          </label>
        </div>
        <Button type="submit">Save changes</Button>
      </section>
      <section className="panel">
        <h2>Notifications</h2>
        <Toggle
          title="Appointment reminders"
          text="Email and app reminders before appointments"
        />
        <Toggle
          title="Queue updates"
          text="Position and wait-time notifications"
        />
        <Toggle
          title="Recommendations"
          text="Occasional provider suggestions"
        />
        <h2 className="subsection">Password & security</h2>
        <label>Current password
          <input
            type="password"
            placeholder="••••••••"
          />
        </label>
        <label>New password
          <input
            type="password"
            placeholder="At least 8 characters"
          />
        </label>
        <Button
          type="button"
          variant="outline"
        >Update password</Button>
      </section>
    </form></>;
}
function Toggle({
  title,
  text
}) {
  return <label className="toggle-row">
    <div>
      <strong>
        {title}
      </strong>
      <p>
        {text}
      </p>
    </div>
    <input
      type="checkbox"
      defaultChecked
    />
    <span />
  </label>;
}
