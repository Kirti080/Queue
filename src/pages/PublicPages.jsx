import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  HeartPulse,
  MapPin,
  Scissors,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Wrench
} from 'lucide-react';
import {
  Badge,
  Button,
  Dialog,
  EmptyState,
  LoadingSkeleton,
  ProviderCard,
  ServiceCard,
  money
} from '../components/common';
import {
  availability,
  categories,
  providers as initialProviders,
  reviews as allReviews,
  services as allServices,
  timeSlots
} from '../data/mockData';
import { mockApi } from '../services/mockApi';
const categoryIcons = [Scissors, Stethoscope, Sparkles, Wrench, ShieldCheck];
export function Landing() {
  return <><section className="hero">
      <div>
        <Badge tone="indigo">Smart bookings. Shorter queues.</Badge>
        <h1>Your time is valuable.
          <br />
          <span>Skip the waiting.</span>
        </h1>
        <p>Discover trusted local providers, book in seconds, and follow your live queue from anywhere.</p>
        <div className="hero-actions">
          <Button
            as={Link}
            to="/providers"
            className="btn-lg"
          >Find a service 
            <ArrowRight />
          </Button>
          <Button
            as={Link}
            to="/signup?role=provider"
            variant="outline"
            className="btn-lg"
          >List your business</Button>
        </div>
        <div className="trust">
          <div className="avatars">
            <i>AS</i>
            <i>RM</i>
            <i>DK</i>
          </div>
          <span>
            <strong>4.9/5</strong> from 2,000+ happy customers
          </span>
        </div>
      </div>
      <div className="hero-panel">
        <div className="mini-card">
          <span className="mini-icon">
            <CalendarCheck />
          </span>
          <div>
            <small>Upcoming appointment</small>
            <strong>Physiotherapy Consultation</strong>
            <span>Today · 10:30 AM</span>
          </div>
          <Badge tone="green">Confirmed</Badge>
        </div>
        <div className="queue-demo">
          <div className="split">
            <span>Live queue</span>
            <Badge tone="indigo">Updating live</Badge>
          </div>
          <strong>QF104</strong>
          <p>2 people ahead of you</p>
          <div className="progress">
            <i style={{
              width: '66%'
            }} />
          </div>
          <div className="split">
            <small>Estimated wait</small>
            <b>~18 minutes</b>
          </div>
        </div>
      </div>
    </section><section className="impact-strip" aria-label="QueueFlow impact">
      <div>
        <strong>50k+</strong>
        <span>appointments booked</span>
      </div>
      <i />
      <div>
        <strong>4.9/5</strong>
        <span>average customer rating</span>
      </div>
      <i />
      <div>
        <strong>38 min</strong>
        <span>average time saved</span>
      </div>
      <i />
      <div>
        <strong>500+</strong>
        <span>trusted providers</span>
      </div>
    </section><section className="section">
      <div className="section-heading">
        <p className="eyebrow">Browse by category</p>
        <h2>Everything you need, close by</h2>
        <p>Book trusted professionals across everyday services.</p>
      </div>
      <div className="categories">
        {categories.slice(1).map((c, i) => {
          const Icon = categoryIcons[i];
          return <Link
            to={`/providers?category=${encodeURIComponent(c)}`}
            key={c}
          >
            <span>
              <Icon />
            </span>
            <strong>
              {c}
            </strong>
            <small>
              {initialProviders.filter(p => p.category === c).length + 8} providers
            </small>
            <ChevronRight />
          </Link>;
        })}
      </div>
    </section><section className="section section-tint">
      <div className="section-heading row-heading">
        <div>
          <p className="eyebrow">Recommended near you</p>
          <h2>Top-rated providers</h2>
        </div>
        <Link to="/providers">View all 
          <ArrowRight />
        </Link>
      </div>
      <div className="provider-grid">
        {initialProviders.filter(p => p.featured).map(p => <ProviderCard
          key={p.id}
          provider={p}
        />)}
      </div>
    </section><section className="section">
      <div className="section-heading center">
        <p className="eyebrow">Simple by design</p>
        <h2>From search to service in three steps</h2>
      </div>
      <div className="steps">
        {[
          [
            '01',
            Search,
            'Discover',
            'Search providers by service, location, rating, and availability.'
          ],
          [
            '02',
            CalendarCheck,
            'Book',
            'Choose a service and a time that works for you.'
          ],
          [
            '03',
            Clock,
            'Track',
            'Check in and follow your live position without standing in line.'
          ]
        ].map(([n, Icon, t, d]) => <div key={n}>
          <b>
            {n}
          </b>
          <span>
            <Icon />
          </span>
          <h3>
            {t}
          </h3>
          <p>
            {d}
          </p>
        </div>)}
      </div>
    </section><section className="section testimonials">
      <div className="section-heading">
        <p className="eyebrow">Loved by busy people</p>
        <h2>Less time waiting, more time living</h2>
      </div>
      <div className="quote-grid">
        {[
          [
            '“I booked during my commute and arrived exactly when it was my turn.”',
            'Priya Nair',
            'Customer'
          ],
          [
            '“QueueFlow has made our front desk calmer and our clients much happier.”',
            'Arjun Menon',
            'Studio owner'
          ],
          [
            '“The live position is brilliant. No more waiting in crowded clinics.”',
            'Rohan Gupta',
            'Customer'
          ]
        ].map(([q, n, r]) => <blockquote key={n}>
          <div className="stars">★★★★★</div>
          <p>
            {q}
          </p>
          <footer>
            <span className="avatar">
              {n.split(' ').map(x => x[0]).join('')}
            </span>
            <div>
              <strong>
                {n}
              </strong>
              <small>
                {r}
              </small>
            </div>
          </footer>
        </blockquote>)}
      </div>
    </section><section className="provider-cta">
      <div>
        <p className="eyebrow">For service providers</p>
        <h2>Run your day, not your waiting room.</h2>
        <p>Manage bookings, live queues, services, and schedules from one clear workspace.</p>
      </div>
      <Button
        as={Link}
        to="/signup?role=provider"
        variant="white"
        className="btn-lg"
      >Start with QueueFlow 
        <ArrowRight />
      </Button>
    </section></>;
}
export function Explore() {
  const [items, setItems] = useState([]),
    [loading, setLoading] = useState(true),
    [search, setSearch] = useState(''),
    [category, setCategory] = useState('All'),
    [rating, setRating] = useState('0'),
    [availabilityFilter, setAvailability] = useState('all'),
    [sort, setSort] = useState('rating');
  useEffect(() => {
    mockApi.getProviders().then(x => {
      setItems(x);
      setLoading(false);
    });
  }, []);
  const filtered = useMemo(
    () => items
      .filter(p =>
        (p.name + p.category + p.location)
          .toLowerCase()
          .includes(search.toLowerCase()) &&
        (category === 'All' || p.category === category) &&
        p.rating >= +rating &&
        (availabilityFilter === 'all' || p.open)
      )
      .sort((a, b) =>
        sort === 'rating'
          ? b.rating - a.rating
          : a.name.localeCompare(b.name)
      ),
    [items, search, category, rating, availabilityFilter, sort]
  );
  return <div className="page">
    <div className="explore-head">
      <p className="eyebrow">Explore QueueFlow</p>
      <h1>Find the right service, right when you need it</h1>
      <p>Compare trusted providers and book with confidence.</p>
      <label className="search-box">
        <Search />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search providers, services, or locations"
        />
      </label>
    </div>
    <div className="filters">
      <label>Category
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {categories.map(x => <option key={x}>
            {x}
          </option>)}
        </select>
      </label>
      <label>Rating
        <select
          value={rating}
          onChange={e => setRating(e.target.value)}
        >
          <option value="0">Any rating</option>
          <option value="4.5">4.5 and above</option>
          <option value="4.8">4.8 and above</option>
        </select>
      </label>
      <label>Availability
        <select
          value={availabilityFilter}
          onChange={e => setAvailability(e.target.value)}
        >
          <option value="all">Any time</option>
          <option value="open">Open now</option>
        </select>
      </label>
      <label>Location
        <select>
          <option>Bengaluru</option>
          <option>Near me</option>
        </select>
      </label>
      <label>Sort by
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option value="rating">Top rated</option>
          <option value="name">Name</option>
        </select>
      </label>
    </div>
    <div className="results-bar">
      <strong>
        {filtered.length} providers found
      </strong>
      <span>Showing trusted providers in Bengaluru</span>
    </div>
    {loading ? <LoadingSkeleton /> : filtered.length ? <div className="provider-grid">
      {filtered.map(p => <ProviderCard
        key={p.id}
        provider={p}
      />)}
    </div> : <EmptyState
      title="No providers match your search"
      description="Try removing a filter or searching for another service."
      action={<Button onClick={() => {
        setSearch('');
        setCategory('All');
        setRating('0');
        setAvailability('all');
      }}>Clear filters</Button>}
    />}
  </div>;
}
export function ProviderDetails() {
  const {
    providerId
  } = useParams();
  const provider = initialProviders.find(p => p.id === providerId) || initialProviders[0];
  const services = allServices.filter(s => s.providerId === provider.id);
  const reviews = allReviews.filter(r => r.providerId === provider.id);
  return <div>
    <div className="profile-cover">
      <div className="page provider-profile">
        <span className={`avatar avatar-xl ${provider.color}`}>
          {provider.initials}
        </span>
        <div>
          <div className="row">
            <p className="eyebrow">
              {provider.category}
            </p>
            <Badge tone={provider.open ? 'green' : 'slate'}>
              {provider.open ? 'Open now' : 'Closed'}
            </Badge>
          </div>
          <h1>
            {provider.name}
          </h1>
          <p className="rating">
            <Star fill="currentColor" />
             
            {provider.rating}
             
            <span>(
              {provider.reviews} reviews)
            </span> · 
            <MapPin />
             
            {provider.location}
          </p>
        </div>
        <Button
          as={Link}
          to={services[0] ? `/book/${provider.id}/${services[0].id}` : '/providers'}
          className="btn-lg"
        >Book appointment</Button>
      </div>
    </div>
    <div className="page profile-layout">
      <main>
        <section className="content-section">
          <h2>About</h2>
          <p>
            {provider.description} Our specialists combine thoughtful care,
            clear communication, and respect for your time in every appointment.
          </p>
        </section>
        <section className="content-section">
          <div className="split">
            <h2>Available services</h2>
            <span>
              {services.length} services
            </span>
          </div>
          <div className="service-list">
            {services.length ? services.map(s => <ServiceCard
              key={s.id}
              service={s}
              providerId={provider.id}
            />) : <EmptyState title="Services coming soon" />}
          </div>
        </section>
        <section className="content-section">
          <h2>Customer reviews</h2>
          {reviews.length ? reviews.map(r => <article
            className="review"
            key={r.id}
          >
            <div className="split">
              <strong>
                {r.name}
              </strong>
              <small>
                {r.date}
              </small>
            </div>
            <div className="stars">
              {'★'.repeat(r.rating)}
            </div>
            <p>
              {r.text}
            </p>
          </article>) : <EmptyState title="No reviews yet" />}
        </section>
      </main>
      <aside>
        <section className="side-card">
          <h3>Weekly availability</h3>
          {availability.map(a => <div
            className="split schedule-row"
            key={a.day}
          >
            <span>
              {a.day}
            </span>
            <strong>
              {a.enabled ? `${a.start} – ${a.end}` : 'Closed'}
            </strong>
          </div>)}
        </section>
        <section className="side-card">
          <HeartPulse />
          <h3>Book with confidence</h3>
          <p>Verified profile, transparent pricing, and secure booking confirmation.</p>
        </section>
      </aside>
    </div>
  </div>;
}
export function Booking() {
  const {
    providerId,
    serviceId
  } = useParams();
  const nav = useNavigate();
  const p = initialProviders.find(x => x.id === providerId) || initialProviders[0],
    s = allServices.find(x => x.id === serviceId) || allServices[0];
  const [slot, setSlot] = useState(''),
    [date, setDate] = useState('2026-07-22'),
    [form, setForm] = useState({
      name: '',
      phone: '',
      email: '',
      notes: ''
    }),
    [errors, setErrors] = useState({}),
    [confirm, setConfirm] = useState(false),
    [success, setSuccess] = useState(false);
  const submit = e => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!/^\d{10}$/.test(form.phone)) next.phone = 'Enter a valid 10-digit number.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email.';
    if (!slot) next.slot = 'Choose an available time.';
    setErrors(next);
    if (!Object.keys(next).length) setConfirm(true);
  };
  const finish = () => mockApi.createBooking({
    ...form,
    date,
    slot,
    providerId,
    serviceId
  }).then(() => {
    setConfirm(false);
    setSuccess(true);
  });
  if (success) return <div className="page narrow">
    <div className="success-state">
      <CheckCircle2 />
      <h1>Appointment confirmed</h1>
      <p>Your booking with 
        {p.name} is set for 
        {date} at 
        {slot}. We sent a mock confirmation to 
        {form.email}.
      </p>
      <Button onClick={() => nav('/customer/bookings')}>View my bookings</Button>
      <Button
        as={Link}
        to="/"
        variant="outline"
      >Back home</Button>
    </div>
  </div>;
  return <div className="page">
    <div className="booking-title">
      <p className="eyebrow">Secure your appointment</p>
      <h1>Complete your booking</h1>
      <p>Choose a time and tell us how to reach you.</p>
    </div>
    <form
      className="booking-layout"
      onSubmit={submit}
    >
      <main>
        <section className="form-card">
          <h2>1. Select a date</h2>
          <label>Date
            <input
              type="date"
              min="2026-07-20"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </label>
        </section>
        <section className="form-card">
          <h2>2. Select a time</h2>
          <div className="slots">
            {timeSlots.map((x, i) => <button
              type="button"
              key={x}
              disabled={i === 1 || i === 5}
              className={slot === x ? 'selected' : ''}
              onClick={() => setSlot(x)}
            >
              {x}
              {(i === 1 || i === 5) && <small>Unavailable</small>}
            </button>)}
          </div>
          {errors.slot && <p className="error">
            {errors.slot}
          </p>}
        </section>
        <section className="form-card">
          <h2>3. Your information</h2>
          <div className="field-grid">
            <Field
              label="Full name"
              error={errors.name}
            >
              <input
                value={form.name}
                onChange={e => setForm({
                  ...form,
                  name: e.target.value
                })}
              />
            </Field>
            <Field
              label="Phone number"
              error={errors.phone}
            >
              <input
                inputMode="numeric"
                value={form.phone}
                onChange={e => setForm({
                  ...form,
                  phone: e.target.value
                })}
                placeholder="10-digit number"
              />
            </Field>
            <Field
              label="Email address"
              error={errors.email}
            >
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({
                  ...form,
                  email: e.target.value
                })}
              />
            </Field>
            <label className="full">Notes (optional)
              <textarea
                value={form.notes}
                onChange={e => setForm({
                  ...form,
                  notes: e.target.value
                })}
                placeholder="Anything the provider should know?"
              />
            </label>
          </div>
        </section>
      </main>
      <aside className="booking-summary">
        <span className={`avatar avatar-lg ${p.color}`}>
          {p.initials}
        </span>
        <p className="eyebrow">
          {p.category}
        </p>
        <h2>
          {p.name}
        </h2>
        <p>
          {s.name}
        </p>
        <hr />
        <div className="split">
          <span>Duration</span>
          <strong>
            {s.duration} min
          </strong>
        </div>
        <div className="split">
          <span>Date</span>
          <strong>
            {date}
          </strong>
        </div>
        <div className="split">
          <span>Time</span>
          <strong>
            {slot || 'Select a time'}
          </strong>
        </div>
        <hr />
        <div className="split total">
          <span>Total</span>
          <strong>
            {money(s.price)}
          </strong>
        </div>
        <Button
          type="submit"
          className="full-btn"
        >Confirm booking</Button>
        <small>No payment is collected in this demo.</small>
      </aside>
    </form>
    <Dialog
      open={confirm}
      title="Confirm this appointment?"
      onClose={() => setConfirm(false)}
      footer={<><Button
          variant="outline"
          onClick={() => setConfirm(false)}
        >Go back</Button><Button onClick={finish}>Yes, confirm booking</Button></>}
    >
      <p>You’re booking 
        <strong>
          {s.name}
        </strong> with 
        {p.name} on 
        {date} at 
        {slot}.
      </p>
    </Dialog>
  </div>;
}
function Field({
  label,
  error,
  children
}) {
  return <label>
    {label}
    {children}
    {error && <span className="error">
      {error}
    </span>}
  </label>;
}
