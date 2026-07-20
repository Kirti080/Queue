import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MockAuthProvider, useMockAuth } from './context/MockAuthContext';
import { DashboardLayout, PublicLayout } from './components/layouts';
import { Booking, Explore, Landing, ProviderDetails } from './pages/PublicPages';
import { ForgotPassword, Login, Signup } from './pages/AuthPages';
import { CustomerBookings, CustomerDashboard, CustomerProfile, CustomerQueue } from './pages/CustomerPages';
import {
  Availability,
  ProviderBookings,
  ProviderDashboard,
  ProviderProfile,
  ProviderQueue,
  ServiceManagement
} from './pages/ProviderPages';
import NotFound from './pages/NotFound';
function MockGuard({
  role,
  children
}) {
  const auth = useMockAuth();
  return auth.role === role ? children : <Navigate
    to={`/${auth.role}/dashboard`}
    replace
  />;
}
export default function App() {
  return <MockAuthProvider>
    <BrowserRouter>
      <Routes>
        
  
        <Route element={<PublicLayout />}>
          <Route
            path="/"
            element={<Landing />}
          />
          <Route
            path="/providers"
            element={<Explore />}
          />
          <Route
            path="/providers/:providerId"
            element={<ProviderDetails />}
          />
          <Route
            path="/book/:providerId/:serviceId"
            element={<Booking />}
          />
        </Route>
        
  
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        
  
        <Route element={<MockGuard role="customer">
          <DashboardLayout type="customer" />
        </MockGuard>}>
          <Route
            path="/customer/dashboard"
            element={<CustomerDashboard />}
          />
          <Route
            path="/customer/bookings"
            element={<CustomerBookings />}
          />
          <Route
            path="/customer/queue/:bookingId"
            element={<CustomerQueue />}
          />
          <Route
            path="/customer/profile"
            element={<CustomerProfile />}
          />
        </Route>
        
  
        <Route element={<MockGuard role="provider">
          <DashboardLayout type="provider" />
        </MockGuard>}>
          <Route
            path="/provider/dashboard"
            element={<ProviderDashboard />}
          />
          <Route
            path="/provider/services"
            element={<ServiceManagement />}
          />
          <Route
            path="/provider/bookings"
            element={<ProviderBookings />}
          />
          <Route
            path="/provider/queue"
            element={<ProviderQueue />}
          />
          <Route
            path="/provider/availability"
            element={<Availability />}
          />
          <Route
            path="/provider/profile"
            element={<ProviderProfile />}
          />
        </Route>
        
  
        <Route
          path="*"
          element={<NotFound />}
        />
        

      </Routes>
    </BrowserRouter>
  </MockAuthProvider>;
}
