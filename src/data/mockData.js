export const categories = ['All', 'Salon & Beauty', 'Healthcare', 'Wellness', 'Automotive', 'Professional'];
export const providers = [{
  id: 'p1',
  name: 'Aarav Wellness Studio',
  category: 'Wellness',
  rating: 4.9,
  reviews: 184,
  location: 'Indiranagar, Bengaluru',
  open: true,
  initials: 'AW',
  color: 'bg-indigo-100 text-indigo-700',
  description: 'A calm, modern wellness studio offering expert physiotherapy and recovery care.',
  wait: '8 min',
  featured: true
}, {
  id: 'p2',
  name: 'Glow & Grace Salon',
  category: 'Salon & Beauty',
  rating: 4.8,
  reviews: 329,
  location: 'Koramangala, Bengaluru',
  open: true,
  initials: 'GG',
  color: 'bg-pink-100 text-pink-700',
  description: 'Premium hair, skin, and bridal services by experienced professionals.',
  wait: '12 min',
  featured: true
}, {
  id: 'p3',
  name: 'Dr. Meera Family Clinic',
  category: 'Healthcare',
  rating: 4.9,
  reviews: 242,
  location: 'HSR Layout, Bengaluru',
  open: false,
  initials: 'MC',
  color: 'bg-emerald-100 text-emerald-700',
  description: 'Thoughtful primary care for every member of your family.',
  wait: 'Opens 9:00 AM',
  featured: true
}, {
  id: 'p4',
  name: 'AutoCare Express',
  category: 'Automotive',
  rating: 4.7,
  reviews: 156,
  location: 'Whitefield, Bengaluru',
  open: true,
  initials: 'AE',
  color: 'bg-amber-100 text-amber-700',
  description: 'Transparent, dependable car care without the long wait.',
  wait: '18 min'
}, {
  id: 'p5',
  name: 'Lex & Ledger Advisors',
  category: 'Professional',
  rating: 4.6,
  reviews: 98,
  location: 'MG Road, Bengaluru',
  open: true,
  initials: 'LL',
  color: 'bg-sky-100 text-sky-700',
  description: 'Clear legal and tax guidance for people and growing businesses.',
  wait: '25 min'
}, {
  id: 'p6',
  name: 'Sattva Yoga House',
  category: 'Wellness',
  rating: 4.8,
  reviews: 211,
  location: 'Jayanagar, Bengaluru',
  open: true,
  initials: 'SY',
  color: 'bg-violet-100 text-violet-700',
  description: 'Mindful movement, breathwork, and individual yoga sessions.',
  wait: '6 min'
}];
export const services = [{
  id: 's1',
  providerId: 'p1',
  name: 'Physiotherapy Consultation',
  description: 'Assessment and personalised recovery plan.',
  duration: 45,
  price: 900,
  category: 'Wellness',
  active: true
}, {
  id: 's2',
  providerId: 'p1',
  name: 'Sports Massage',
  description: 'Targeted massage for muscle recovery.',
  duration: 60,
  price: 1400,
  category: 'Wellness',
  active: true
}, {
  id: 's3',
  providerId: 'p2',
  name: 'Haircut & Styling',
  description: 'Consultation, wash, precision cut and styling.',
  duration: 50,
  price: 850,
  category: 'Salon & Beauty',
  active: true
}, {
  id: 's4',
  providerId: 'p2',
  name: 'Signature Facial',
  description: 'A restorative facial tailored to your skin.',
  duration: 60,
  price: 1800,
  category: 'Salon & Beauty',
  active: true
}, {
  id: 's5',
  providerId: 'p3',
  name: 'General Consultation',
  description: 'Comprehensive general health consultation.',
  duration: 30,
  price: 700,
  category: 'Healthcare',
  active: true
}, {
  id: 's6',
  providerId: 'p4',
  name: 'Standard Car Service',
  description: 'Oil, fluids, brakes and 25-point inspection.',
  duration: 90,
  price: 2499,
  category: 'Automotive',
  active: true
}];
export const bookings = [{
  id: 'b1',
  customer: 'Kirti Verma',
  providerId: 'p1',
  serviceId: 's1',
  date: '22 Jul 2026',
  time: '10:30 AM',
  status: 'in_queue',
  queueNumber: 'QF104',
  price: 900
}, {
  id: 'b2',
  customer: 'Kirti Verma',
  providerId: 'p2',
  serviceId: 's3',
  date: '25 Jul 2026',
  time: '3:00 PM',
  status: 'confirmed',
  price: 850
}, {
  id: 'b3',
  customer: 'Kirti Verma',
  providerId: 'p3',
  serviceId: 's5',
  date: '14 Jul 2026',
  time: '11:00 AM',
  status: 'completed',
  price: 700
}, {
  id: 'b4',
  customer: 'Riya Shah',
  providerId: 'p1',
  serviceId: 's2',
  date: '20 Jul 2026',
  time: '11:30 AM',
  status: 'confirmed',
  price: 1400
}, {
  id: 'b5',
  customer: 'Neel Rao',
  providerId: 'p1',
  serviceId: 's1',
  date: '20 Jul 2026',
  time: '12:15 PM',
  status: 'pending',
  price: 900
}];
export const queueEntries = [{
  id: 'q1',
  number: 'QF102',
  name: 'Ananya Rao',
  service: 'Physiotherapy Consultation',
  status: 'in_progress',
  wait: 0
}, {
  id: 'q2',
  number: 'QF103',
  name: 'Vikram Singh',
  service: 'Sports Massage',
  status: 'waiting',
  wait: 8
}, {
  id: 'q3',
  number: 'QF104',
  name: 'Kirti Verma',
  service: 'Physiotherapy Consultation',
  status: 'waiting',
  wait: 18
}, {
  id: 'q4',
  number: 'QF105',
  name: 'Sara Khan',
  service: 'Physiotherapy Consultation',
  status: 'waiting',
  wait: 29
}];
export const reviews = [{
  id: 'r1',
  providerId: 'p1',
  name: 'Ananya S.',
  rating: 5,
  date: '12 Jul 2026',
  text: 'The booking was effortless and the therapist explained every step clearly.'
}, {
  id: 'r2',
  providerId: 'p1',
  name: 'Rahul M.',
  rating: 5,
  date: '4 Jul 2026',
  text: 'Clean studio, almost no waiting, and a genuinely helpful session.'
}, {
  id: 'r3',
  providerId: 'p2',
  name: 'Diya K.',
  rating: 5,
  date: '9 Jul 2026',
  text: 'Wonderful service and accurate appointment timing.'
}];
export const availability = [{
  day: 'Monday',
  enabled: true,
  start: '09:00',
  end: '18:00'
}, {
  day: 'Tuesday',
  enabled: true,
  start: '09:00',
  end: '18:00'
}, {
  day: 'Wednesday',
  enabled: true,
  start: '09:00',
  end: '18:00'
}, {
  day: 'Thursday',
  enabled: true,
  start: '10:00',
  end: '19:00'
}, {
  day: 'Friday',
  enabled: true,
  start: '09:00',
  end: '18:00'
}, {
  day: 'Saturday',
  enabled: true,
  start: '09:00',
  end: '14:00'
}, {
  day: 'Sunday',
  enabled: false,
  start: '09:00',
  end: '14:00'
}];
export const blockedDates = [{
  id: 'bd1',
  date: '15 Aug 2026',
  reason: 'Independence Day'
}, {
  id: 'bd2',
  date: '28 Aug 2026',
  reason: 'Team training'
}];
export const timeSlots = ['9:00 AM', '9:45 AM', '10:30 AM', '11:15 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:30 PM'];

