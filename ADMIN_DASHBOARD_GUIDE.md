# 🎛️ Admin Dashboard Guide

## Access the Admin Dashboard

**URL:** `http://localhost:5173/admin`

Or click "Admin" in the navigation menu.

---

## Features

### 📊 Dashboard Overview

The admin dashboard shows:
- **Total Bookings** - All bookings in the system
- **Pending Bookings** - Bookings waiting for confirmation
- **Completed Bookings** - Finished bookings
- **Total Providers** - Registered providers

### 📋 Bookings Management

#### View All Bookings
- See all bookings in a table format
- View customer details, contact info, service type, urgency, and status
- Sort and filter bookings

#### Confirm Bookings
1. Find a booking with status "pending"
2. Click the **"✓ Confirm"** button
3. In the modal:
   - Review booking details
   - Optionally assign a provider from the dropdown
   - Click **"✓ Confirm Booking"**

#### Update Booking Status
1. Click the **"Status"** dropdown on any booking
2. Select new status:
   - **Confirmed** - Provider assigned and confirmed
   - **In-Progress** - Service is being performed
   - **Completed** - Service finished
   - **Cancelled** - Booking cancelled

---

## Quick Workflow

### Step 1: View Pending Bookings
- Open admin dashboard
- Look for bookings with yellow "pending" badge

### Step 2: Confirm a Booking
1. Click **"✓ Confirm"** on a pending booking
2. Select a provider (if available in same city)
3. Click **"✓ Confirm Booking"**
4. Status changes to "confirmed" (blue badge)

### Step 3: Track Progress
- Update status as service progresses:
  - **Confirmed** → **In-Progress** → **Completed**

---

## Example Workflow

```
1. Customer submits booking → Status: "pending" ⏳
   ↓
2. Admin opens dashboard → Sees pending booking
   ↓
3. Admin clicks "Confirm" → Assigns provider
   ↓
4. Status changes to "confirmed" ✅
   ↓
5. Provider starts service → Admin updates to "in-progress" 🔄
   ↓
6. Service completed → Admin updates to "completed" ✅
```

---

## Tips

- **Refresh Button** - Click "🔄 Refresh" to reload latest data
- **Provider Assignment** - Only providers in the same city as booking are shown
- **Status Colors**:
  - 🟡 Yellow = Pending
  - 🔵 Blue = Confirmed
  - 🟣 Purple = In-Progress
  - 🟢 Green = Completed
  - 🔴 Red = Cancelled

---

## API Endpoints Used

- `GET /api/bookings` - Fetch all bookings
- `GET /api/providers` - Fetch all providers
- `GET /api/analytics/dashboard` - Get dashboard stats
- `PATCH /api/bookings/:id/confirm` - Confirm booking with provider
- `PUT /api/bookings/:id` - Update booking status

---

**The admin dashboard makes it easy to manage all bookings from one place!** 🎉

