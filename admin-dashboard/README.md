# SafaiPak Admin Dashboard

Separate admin dashboard application for managing bookings and providers.

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Run development server
bun dev
```

The admin dashboard will run on **http://localhost:5174**

## 📋 Features

- View all bookings
- Confirm bookings
- Update booking status
- Assign providers to bookings
- View dashboard statistics
- Real-time data refresh

## 🔗 API Connection

The dashboard connects to the backend API at:
- Default: `http://localhost:5000`
- Can be configured via `VITE_API_URL` environment variable

## 📦 Dependencies

- React
- Bootstrap (for UI components)
- Axios (for API calls)

## 🎯 Usage

1. Start the backend server (port 5000)
2. Start this admin dashboard (port 5174)
3. Open http://localhost:5174 in your browser
4. Manage bookings and providers
