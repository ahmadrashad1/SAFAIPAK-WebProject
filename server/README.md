# SafaiPak Backend API

Express.js backend with MongoDB integration for SafaiPak platform.

## Features

### ✅ Implemented

1. **Booking System**
   - Create bookings (POST `/api/bookings`)
   - List bookings (GET `/api/bookings`)
   - Support for normal and emergency bookings
   - Status tracking (pending, confirmed, in-progress, completed, cancelled)

2. **Services Catalog**
   - Get all services (GET `/api/services`)
   - Pest Control, Sanitation, Health, and Agricultural services
   - Seasonal packages for agriculture

3. **Provider Management**
   - Register providers (POST `/api/providers`)
   - List providers with filters (GET `/api/providers`)
   - Get provider details (GET `/api/providers/:id`)
   - Update provider (PUT `/api/providers/:id`)
   - Filter by city, specialization, availability, verification status

4. **Analytics Dashboard**
   - Dashboard stats (GET `/api/analytics/dashboard`)
   - Service demand analysis (GET `/api/analytics/demand`)
   - Provider analytics (GET `/api/analytics/provider/:providerId`)
   - Location intelligence (GET `/api/analytics/location`)

5. **Database Support**
   - MongoDB integration (when `USE_MEMORY_DB=false`)
   - In-memory fallback (default, for development)
   - Models: Booking, Provider, Analytics

## Setup

1. Install dependencies:
```bash
bun install
```

2. Configure environment (create `.env` file):
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/safaipak
USE_MEMORY_DB=true  # Set to false to use MongoDB
```

3. Run server:
```bash
bun dev  # Development with watch mode
bun start  # Production
```

## API Endpoints

### Bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings` - List all bookings

### Services
- `GET /api/services` - Get services catalog

### Providers
- `POST /api/providers` - Register a new provider
- `GET /api/providers` - List providers (query params: city, specialization, available, verified)
- `GET /api/providers/:id` - Get provider details
- `PUT /api/providers/:id` - Update provider

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard statistics
- `GET /api/analytics/demand` - Get service demand (query params: city, serviceType)
- `GET /api/analytics/provider/:providerId` - Get provider analytics
- `GET /api/analytics/location` - Get location intelligence (query param: city)

## Testing

Run tests:
```bash
bun test
```

## Requirements Fulfilled

✅ Express.js backend
✅ MongoDB integration with Mongoose
✅ RESTful API endpoints
✅ Provider registration and management
✅ Booking system
✅ Analytics and reporting
✅ Location intelligence
✅ Service catalog
✅ In-memory fallback for development
✅ CORS enabled for frontend integration
