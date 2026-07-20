import { providers, services, bookings, queueEntries, reviews, availability, blockedDates } from '../data/mockData';
const delay = (value, ms = 180) => new Promise(resolve => setTimeout(() => resolve(structuredClone(value)), ms));
export const mockApi = {
  getProviders: () => delay(providers),
  getProvider: id => delay(providers.find(p => p.id === id)),
  getServices: providerId => delay(providerId ? services.filter(s => s.providerId === providerId) : services),
  getService: id => delay(services.find(s => s.id === id)),
  getBookings: () => delay(bookings),
  getQueue: () => delay(queueEntries),
  getReviews: providerId => delay(reviews.filter(r => r.providerId === providerId)),
  getAvailability: () => delay(availability),
  getBlockedDates: () => delay(blockedDates),
  createBooking: input => delay({
    id: `b-${Date.now()}`,
    status: 'confirmed',
    ...input
  }, 450),
  save: input => delay({
    success: true,
    data: input
  }, 450)
};

