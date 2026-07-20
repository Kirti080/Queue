import { useState } from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  CircleDollarSign,
  Plus,
  TrendingUp,
  UserCheck,
  Users,
  XCircle
} from 'lucide-react';
import { Badge, Button, Dialog, EmptyState, MetricCard, PageHeader, StatusBadge, money } from '../components/common';
import {
  availability as initialAvailability,
  blockedDates as initialBlocked,
  bookings,
  queueEntries,
  services as initialServices
} from '../data/mockData';
export function ProviderDashboard() {
  return <><PageHeader
      eyebrow="Monday, 20 July"
      title="Welcome back, Aarav"
      description="Your day is moving smoothly. Here’s the latest."
      action={<Badge tone="green">Business open</Badge>}
    /><div className="metrics-grid">
      <MetricCard
        icon={CalendarCheck}
        label="Today's bookings"
        value="18"
        detail="3 awaiting confirmation"
      />
      <MetricCard
        icon={Users}
        label="Customers waiting"
        value="3"
        detail="~18 min average"
        tone="amber"
      />
      <MetricCard
        icon={UserCheck}
        label="Completed"
        value="11"
        detail="2 more than yesterday"
        tone="green"
      />
      <MetricCard
        icon={CircleDollarSign}
        label="Est. revenue"
        value="₹12,850"
        detail="+14% from Monday"
        tone="violet"
      />
    </div><div className="dashboard-grid">
      <section className="panel span-2">
        <div className="panel-head">
          <h2>Today's schedule</h2>
          <Button variant="outline">View all bookings</Button>
        </div>
        {bookings.slice(0, 4).map(b => <div
          className="schedule-item"
          key={b.id}
        >
          <strong>
            {b.time}
          </strong>
          <span className="avatar">
            {b.customer.split(' ').map(x => x[0]).join('')}
          </span>
          <div>
            <b>
              {b.customer}
            </b>
            <p>
              {initialServices.find(s => s.id === b.serviceId)?.name}
            </p>
          </div>
          <StatusBadge status={b.status} />
          <Button variant="outline">Details</Button>
        </div>)}
      </section>
      <section className="panel">
        <div className="panel-head">
          <h2>Queue overview</h2>
          <Badge tone="indigo">Live</Badge>
        </div>
        <div className="queue-stat">
          <strong>QF102</strong>
          <span>Currently in service</span>
        </div>
        {queueEntries.slice(1).map(q => <div
          className="queue-row"
          key={q.id}
        >
          <b>
            {q.number}
          </b>
          <span>
            {q.name}
          </span>
          <small>~
            {q.wait} min
          </small>
        </div>)}
        <Button className="full-btn">Call next customer</Button>
      </section>
      <section className="panel span-2">
        <div className="panel-head">
          <h2>Weekly bookings</h2>
          <span className="trend">
            <TrendingUp /> 12% this week
          </span>
        </div>
        <div className="bar-chart">
          {[
            ['Mon', 18],
            ['Tue', 23],
            ['Wed', 16],
            ['Thu', 28],
            ['Fri', 25],
            ['Sat', 20],
            ['Sun', 8]
          ].map(([d, v]) => <div key={d}>
            <i style={{
              height: `${v * 4}px`
            }} />
            <strong>
              {v}
            </strong>
            <span>
              {d}
            </span>
          </div>)}
        </div>
      </section>
      <section className="panel">
        <h2>Recent activity</h2>
        {[
          'Riya Shah booked Sports Massage',
          'QF101 service completed',
          'Neel Rao requested an appointment',
          'A new 5-star review was received'
        ].map((x, i) => <div
          className="activity"
          key={x}
        >
          <span className={`dot dot-${i}`} />
          <div>
            <strong>
              {x}
            </strong>
            <small>
              {i * 12 + 4} minutes ago
            </small>
          </div>
        </div>)}
      </section>
    </div></>;
}
export function ServiceManagement() {
  const [items, setItems] = useState(initialServices.filter(s => s.providerId === 'p1')),
    [editing, setEditing] = useState(null),
    [deleting, setDeleting] = useState(null);
  const blank = {
    name: '',
    description: '',
    duration: 30,
    price: 500,
    category: 'Wellness',
    active: true
  };
  const save = e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const obj = {
      ...(editing?.id ? editing : {
        id: `s${Date.now()}`,
        providerId: 'p1'
      }),
      ...data,
      duration: +data.duration,
      price: +data.price,
      active: true
    };
    setItems(editing?.id ? items.map(x => x.id === editing.id ? obj : x) : [...items, obj]);
    setEditing(null);
  };
  return <><PageHeader
      title="Services"
      description="Create and maintain the services customers can book."
      action={<Button onClick={() => setEditing(blank)}>
        <Plus /> Add service
      </Button>}
    /><section className="panel table-wrap">
      {items.map(s => <div
        className="service-admin"
        key={s.id}
      >
        <div className="service-icon">
          {s.name[0]}
        </div>
        <div>
          <h3>
            {s.name}
          </h3>
          <p>
            {s.description}
          </p>
          <span>
            {s.category}
          </span>
        </div>
        <strong>
          {s.duration} min
        </strong>
        <strong>
          {money(s.price)}
        </strong>
        <label className="switch">
          <input
            type="checkbox"
            checked={s.active}
            onChange={() => setItems(items.map(x => x.id === s.id ? {
              ...x,
              active: !x.active
            } : x))}
          />
          <span />
        </label>
        <div>
          <Button
            variant="outline"
            onClick={() => setEditing(s)}
          >Edit</Button>
          <Button
            variant="danger"
            onClick={() => setDeleting(s)}
          >Delete</Button>
        </div>
      </div>)}
    </section><Dialog
      open={!!editing}
      title={editing?.id ? 'Edit service' : 'Add a service'}
      onClose={() => setEditing(null)}
      footer={null}
    >
      <form
        onSubmit={save}
        className="dialog-form"
      >
        <label>Service name
          <input
            name="name"
            required
            defaultValue={editing?.name}
          />
        </label>
        <label>Description
          <textarea
            name="description"
            required
            defaultValue={editing?.description}
          />
        </label>
        <div className="field-grid">
          <label>Duration (minutes)
            <input
              name="duration"
              type="number"
              min="5"
              required
              defaultValue={editing?.duration}
            />
          </label>
          <label>Price (₹)
            <input
              name="price"
              type="number"
              min="0"
              required
              defaultValue={editing?.price}
            />
          </label>
        </div>
        <label>Category
          <select
            name="category"
            defaultValue={editing?.category}
          >
            <option>Wellness</option>
            <option>Healthcare</option>
            <option>Salon & Beauty</option>
          </select>
        </label>
        <div className="dialog-footer">
          <Button
            type="button"
            variant="outline"
            onClick={() => setEditing(null)}
          >Cancel</Button>
          <Button type="submit">Save service</Button>
        </div>
      </form>
    </Dialog><Dialog
      open={!!deleting}
      title="Delete this service?"
      onClose={() => setDeleting(null)}
      footer={<><Button
          variant="outline"
          onClick={() => setDeleting(null)}
        >Keep service</Button><Button
          variant="danger"
          onClick={() => {
            setItems(items.filter(x => x.id !== deleting.id));
            setDeleting(null);
          }}
        >Delete</Button></>}
    >
      <p>Existing booking history will remain visible in a future backend implementation.</p>
    </Dialog></>;
}
export function ProviderBookings() {
  const [status, setStatus] = useState('all'),
    [query, setQuery] = useState('');
  const filtered = bookings.filter(
    b =>
      (status === 'all' || b.status === status) &&
      b.customer.toLowerCase().includes(query.toLowerCase())
  );
  return <><PageHeader
      title="Booking management"
      description="Review requests and keep every appointment moving."
    /><div className="toolbar">
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search customer"
      />
      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
      >
        <option value="all">All statuses</option>
        <option>pending</option>
        <option>confirmed</option>
        <option>completed</option>
      </select>
      <input
        type="date"
        aria-label="Filter by date"
      />
    </div><section className="panel table-wrap">
      {filtered.map(b => <div
        className="booking-admin"
        key={b.id}
      >
        <div>
          <strong>
            {b.time}
          </strong>
          <small>
            {b.date}
          </small>
        </div>
        <span className="avatar">
          {b.customer.split(' ').map(x => x[0]).join('')}
        </span>
        <div>
          <h3>
            {b.customer}
          </h3>
          <p>
            {initialServices.find(s => s.id === b.serviceId)?.name}
          </p>
        </div>
        <StatusBadge status={b.status} />
        <div className="actions">
          <Button variant="outline">Details</Button>
          {b.status === 'pending' && <><Button>Confirm</Button><Button variant="danger">Reject</Button></>}
          {b.status === 'confirmed' && <Button>Complete</Button>}
        </div>
      </div>)}
      {!filtered.length && <EmptyState title="No matching bookings" />}
    </section></>;
}
export function ProviderQueue() {
  const [entries, setEntries] = useState(queueEntries),
    [confirm, setConfirm] = useState(null);
  const update = (id, status) => setEntries(entries.map(x => x.id === id ? {
    ...x,
    status
  } : x));
  const groups = [['in_progress', 'In service'], ['waiting', 'Waiting'], ['completed', 'Completed']];
  return <><PageHeader
      title="Live queue"
      description="Call, serve, and complete customers in a clear sequence."
      action={<Button onClick={() => {
        const next = entries.find(x => x.status === 'waiting');
        next && update(next.id, 'in_progress');
      }}>Call next customer</Button>}
    /><div className="queue-columns">
      {groups.map(([key, title]) => <section
        className="panel"
        key={key}
      >
        <div className="panel-head">
          <h2>
            {title}
          </h2>
          <Badge>
            {entries.filter(x => x.status === key).length}
          </Badge>
        </div>
        {entries.filter(x => x.status === key).map(q => <article
          className="queue-ticket"
          key={q.id}
        >
          <div className="split">
            <strong>
              {q.number}
            </strong>
            <StatusBadge status={q.status} />
          </div>
          <h3>
            {q.name}
          </h3>
          <p>
            {q.service}
          </p>
          <small>
            {q.wait ? `Estimated wait ${q.wait} min` : 'Service underway'}
          </small>
          <div className="actions">
            {key === 'waiting' && <><Button onClick={() => update(q.id, 'in_progress')}>Start service</Button><Button
                variant="outline"
                onClick={() => setConfirm(q)}
              >Skip</Button></>}
            {key === 'in_progress' && <Button onClick={() => update(q.id, 'completed')}>Complete service</Button>}
            {key === 'completed' && <Button
              variant="outline"
              onClick={() => update(q.id, 'waiting')}
            >Restore</Button>}
          </div>
        </article>)}
        {!entries.some(x => x.status === key) && <EmptyState title={`No customers ${title.toLowerCase()}`} />}
      </section>)}
    </div><Dialog
      open={!!confirm}
      title="Skip this customer?"
      onClose={() => setConfirm(null)}
      footer={<><Button
          variant="outline"
          onClick={() => setConfirm(null)}
        >Go back</Button><Button
          variant="danger"
          onClick={() => {
            update(confirm.id, 'completed');
            setConfirm(null);
          }}
        >Skip customer</Button></>}
    >
      <p>They will be removed from the active waiting list. You can restore them later.</p>
    </Dialog></>;
}
export function Availability() {
  const [days, setDays] = useState(initialAvailability),
    [blocked, setBlocked] = useState(initialBlocked),
    [dialog, setDialog] = useState(false),
    [saved, setSaved] = useState(false);
  return <><PageHeader
      title="Availability"
      description="Set working hours, breaks, and dates when bookings are unavailable."
      action={<Button onClick={() => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }}>Save schedule</Button>}
    />{saved && <div className="toast success">
      <CheckCircle2 />Schedule saved locally.
    </div>}<div className="settings-grid">
      <section className="panel">
        <h2>Weekly working hours</h2>
        {days.map((d, i) => <div
          className="day-row"
          key={d.day}
        >
          <label className="switch">
            <input
              type="checkbox"
              checked={d.enabled}
              onChange={() => setDays(days.map((x, j) => j === i ? {
                ...x,
                enabled: !x.enabled
              } : x))}
            />
            <span />
          </label>
          <strong>
            {d.day}
          </strong>
          {d.enabled ? <><input
              type="time"
              value={d.start}
              onChange={e => setDays(days.map((x, j) => j === i ? {
                ...x,
                start: e.target.value
              } : x))}
            /><span>to</span><input
              type="time"
              value={d.end}
              onChange={e => setDays(days.map((x, j) => j === i ? {
                ...x,
                end: e.target.value
              } : x))}
            /><Button variant="outline">Add break</Button></> : <p>Unavailable</p>}
        </div>)}
      </section>
      <section className="panel">
        <div className="panel-head">
          <div>
            <h2>Blocked dates</h2>
            <p>Holidays and other closures</p>
          </div>
          <Button onClick={() => setDialog(true)}>
            <Plus /> Block date
          </Button>
        </div>
        {blocked.map(x => <div
          className="blocked-date"
          key={x.id}
        >
          <span>
            <XCircle />
          </span>
          <div>
            <strong>
              {x.date}
            </strong>
            <p>
              {x.reason}
            </p>
          </div>
          <button
            aria-label={`Remove ${x.date}`}
            onClick={() => setBlocked(blocked.filter(y => y.id !== x.id))}
          >×</button>
        </div>)}
      </section>
    </div><Dialog
      open={dialog}
      title="Block a date"
      onClose={() => setDialog(false)}
      footer={<Button onClick={() => {
        setBlocked([...blocked, {
          id: Date.now(),
          date: '5 Sep 2026',
          reason: 'Personal leave'
        }]);
        setDialog(false);
      }}>Add blocked date</Button>}
    >
      <label>Date
        <input
          type="date"
          defaultValue="2026-09-05"
        />
      </label>
      <label>Reason
        <input defaultValue="Personal leave" />
      </label>
    </Dialog></>;
}
export function ProviderProfile() {
  const [saved, setSaved] = useState(false);
  return <><PageHeader
      title="Business profile"
      description="Manage what customers see when they discover your business."
    />{saved && <div className="toast success">
      <CheckCircle2 />Business profile saved locally.
    </div>}<form
      className="settings-grid"
      onSubmit={e => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }}
    >
      <section className="panel">
        <div className="cover-placeholder">Cover image
          <Button
            type="button"
            variant="white"
          >Upload cover</Button>
        </div>
        <div className="profile-avatar">
          <span className="avatar avatar-lg bg-indigo-100 text-indigo-700">AW</span>
          <Button
            type="button"
            variant="outline"
          >Change logo</Button>
        </div>
        <label>Business name
          <input defaultValue="Aarav Wellness Studio" />
        </label>
        <label>Description
          <textarea defaultValue="A calm, modern wellness studio offering expert physiotherapy and recovery care." />
        </label>
        <label>Category
          <select defaultValue="Wellness">
            <option>Wellness</option>
            <option>Healthcare</option>
          </select>
        </label>
        <Button type="submit">Save profile</Button>
      </section>
      <section className="panel">
        <h2>Contact & location</h2>
        <label>Address
          <textarea defaultValue="42, 12th Main Road, Indiranagar, Bengaluru, Karnataka 560038" />
        </label>
        <label>Phone
          <input defaultValue="+91 98765 43210" />
        </label>
        <label>Business email
          <input
            type="email"
            defaultValue="hello@aaravwellness.in"
          />
        </label>
        <h2 className="subsection">Notifications</h2>
        {['New booking requests', 'Booking cancellations', 'Queue alerts', 'Daily summary'].map(x => <label
          className="toggle-row"
          key={x}
        >
          <strong>
            {x}
          </strong>
          <input
            type="checkbox"
            defaultChecked
          />
          <span />
        </label>)}
      </section>
    </form></>;
}
