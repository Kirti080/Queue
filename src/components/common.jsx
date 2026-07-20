import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Clock, MapPin, Star, Inbox, LoaderCircle } from 'lucide-react';
import { providers, services } from '../data/mockData';
export const money = value => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
}).format(value);
export const Button = ({
  as: Comp = 'button',
  className = '',
  variant = 'primary',
  ...props
}) => <Comp
  className={`btn btn-${variant} ${className}`}
  {...props}
/>;
export const Badge = ({
  children,
  tone = 'slate'
}) => <span className={`badge badge-${tone}`}>
  {children}
</span>;
const statusTone = {
  pending: 'amber',
  confirmed: 'blue',
  checked_in: 'indigo',
  in_queue: 'indigo',
  in_progress: 'violet',
  completed: 'green',
  cancelled: 'red',
  rejected: 'red',
  no_show: 'slate',
  waiting: 'amber'
};
export function StatusBadge({
  status
}) {
  return <Badge tone={statusTone[status] || 'slate'}>
    {status.replaceAll('_', ' ')}
  </Badge>;
}
export function PageHeader({
  eyebrow,
  title,
  description,
  action
}) {
  return <header className="page-header">
    <div>
      {eyebrow && <p className="eyebrow">
        {eyebrow}
      </p>}
      <h1>
        {title}
      </h1>
      {description && <p>
        {description}
      </p>}
    </div>
    {action}
  </header>;
}
export function MetricCard({
  icon: Icon,
  label,
  value,
  detail,
  tone = 'indigo'
}) {
  return <div className="metric">
    <span className={`metric-icon tone-${tone}`}>
      <Icon />
    </span>
    <div>
      <p>
        {label}
      </p>
      <strong>
        {value}
      </strong>
      {detail && <small>
        {detail}
      </small>}
    </div>
  </div>;
}
export function ProviderCard({
  provider
}) {
  return <article className="provider-card">
    <div className="provider-cover">
      <span className={`avatar avatar-lg ${provider.color}`}>
        {provider.initials}
      </span>
      <Badge tone={provider.open ? 'green' : 'slate'}>
        {provider.open ? 'Open now' : 'Closed'}
      </Badge>
    </div>
    <div className="provider-content">
      <p className="eyebrow">
        {provider.category}
      </p>
      <h3>
        {provider.name}
      </h3>
      <p className="rating">
        <Star fill="currentColor" />
         
        {provider.rating}
         
        <span>(
          {provider.reviews} reviews)
        </span>
      </p>
      <p className="muted row">
        <MapPin />
         
        {provider.location}
      </p>
      <p>
        {provider.description}
      </p>
      <div className="card-footer">
        <span>
          <Clock />
           
          {provider.wait}
        </span>
        <Button
          as={Link}
          to={`/providers/${provider.id}`}
          variant="outline"
        >View profile 
          <ArrowRight />
        </Button>
      </div>
    </div>
  </article>;
}
export function ServiceCard({
  service,
  providerId,
  actions = true
}) {
  return <article className="service-card">
    <div>
      <h3>
        {service.name}
      </h3>
      <p>
        {service.description}
      </p>
      <div className="meta">
        <span>
          <Clock />
           
          {service.duration} min
        </span>
        <strong>
          {money(service.price)}
        </strong>
      </div>
    </div>
    {actions && <Button
      as={Link}
      to={`/book/${providerId}/${service.id}`}
    >Book appointment</Button>}
  </article>;
}
export function BookingCard({
  booking,
  actions
}) {
  const p = providers.find(x => x.id === booking.providerId),
    s = services.find(x => x.id === booking.serviceId);
  return <article className="booking-card">
    <div className={`avatar ${p?.color}`}>
      {p?.initials}
    </div>
    <div className="grow">
      <div className="split">
        <div>
          <h3>
            {s?.name}
          </h3>
          <p>
            {p?.name}
          </p>
        </div>
        <StatusBadge status={booking.status} />
      </div>
      <div className="meta">
        <span>
          <CalendarDays />
           
          {booking.date}
        </span>
        <span>
          <Clock />
           
          {booking.time}
        </span>
        <strong>
          {money(booking.price)}
        </strong>
      </div>
      {actions && <div className="actions">
        {actions}
      </div>}
    </div>
  </article>;
}
export function EmptyState({
  title = 'Nothing here yet',
  description = 'Try changing your filters or come back later.',
  action
}) {
  return <div className="empty">
    <Inbox />
    <h3>
      {title}
    </h3>
    <p>
      {description}
    </p>
    {action}
  </div>;
}
export function LoadingSkeleton() {
  return <div
    className="skeleton-wrap"
    aria-label="Loading"
  >
    <LoaderCircle className="spin" />
    <div>
      <i />
      <i />
      <i />
    </div>
  </div>;
}
export function Dialog({
  open,
  title,
  children,
  onClose,
  footer
}) {
  if (!open) return null;
  return <div
    className="dialog-backdrop"
    role="presentation"
    onMouseDown={e => e.target === e.currentTarget && onClose()}
  >
    <section
      className="dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div className="split">
        <h2 id="dialog-title">
          {title}
        </h2>
        <button
          className="icon-btn"
          onClick={onClose}
          aria-label="Close dialog"
        >×</button>
      </div>
      {children}
      <div className="dialog-footer">
        {footer}
      </div>
    </section>
  </div>;
}

