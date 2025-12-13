# 🚀 SafaiPak - Quick Start Guide

## Current Status

✅ **Backend Server**: Starting on `http://localhost:5000`  
✅ **Frontend Client**: Starting on `http://localhost:5173` (or check terminal)  
✅ **Database**: Using in-memory mode (no MongoDB setup needed)

---

## 📋 Step-by-Step Demo Testing

### Step 1: Verify Servers Are Running

**Check Backend:**
- Open browser: `http://localhost:5000`
- Should see: `{"status":"ok","service":"SafaiPak API",...}`

**Check Frontend:**
- Open browser: `http://localhost:5173` (or port shown in terminal)
- Should see: SafaiPak homepage with purple gradient

---

### Step 2: Test Services Page

1. Navigate to: `http://localhost:5173/services`
2. **Expected**: See 4 service categories:
   - Pest Control Services
   - Sanitation & Cleaning Services  
   - Specialized Health Services
   - Agricultural Services

**API Test:**
```bash
# In browser console (F12):
fetch('http://localhost:5000/api/services')
  .then(r => r.json())
  .then(data => console.log('Services:', data))
```

---

### Step 3: Create a Booking (Frontend)

1. Go to: `http://localhost:5173/book` or click "Book a Service"
2. Fill the form:
   - Name: **Ayesha Khan**
   - Email: **ayesha@example.com**
   - Phone: **0300-1234567**
   - Message: **Need emergency mosquito control in Lahore**
   - Source: **Search Engine**
3. Check privacy policy
4. Click **Submit**

**Expected Result:**
- ✅ Success message appears
- ✅ Form clears
- ✅ Booking saved in backend

**Verify Booking:**
```javascript
// In browser console:
fetch('http://localhost:5000/api/bookings')
  .then(r => r.json())
  .then(data => {
    console.log('Total bookings:', data.length);
    console.table(data);
  })
```

---

### Step 4: Register a Provider (API Test)

**Open browser console (F12) and run:**

```javascript
fetch('http://localhost:5000/api/providers', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "Hassan Ali",
    email: "hassan@example.com",
    phone: "021-1234567",
    city: "Karachi",
    specialization: ["Mosquito & Dengue Control", "Termite Control"],
    certificationLevel: "expert",
    yearsOfExperience: 15,
    verified: true,
    available: true,
    emergencyService: true
  })
})
.then(r => r.json())
.then(data => {
  console.log('✅ Provider registered:', data);
  window.providerId = data._id; // Save for later
})
```

**Verify Provider:**
```javascript
fetch('http://localhost:5000/api/providers')
  .then(r => r.json())
  .then(data => console.table(data))
```

---

### Step 5: Test Analytics Dashboard

**Option A: Frontend**
- Navigate to: `http://localhost:5173/analytics`
- Should see dashboard with stats

**Option B: API**
```javascript
// Get dashboard stats
fetch('http://localhost:5000/api/analytics/dashboard')
  .then(r => r.json())
  .then(stats => {
    console.log('📊 Dashboard Stats:');
    console.log(`Total Bookings: ${stats.totalBookings}`);
    console.log(`Total Providers: ${stats.totalProviders}`);
    console.log(`Pending: ${stats.pendingBookings}`);
    console.log(`Completed: ${stats.completedBookings}`);
    console.log(`Completion Rate: ${stats.completionRate}%`);
  })
```

---

### Step 6: Test Service Demand Analytics

```javascript
// Get demand by city
fetch('http://localhost:5000/api/analytics/demand?city=Lahore')
  .then(r => r.json())
  .then(data => console.log('Demand in Lahore:', data))

// Get all demand
fetch('http://localhost:5000/api/analytics/demand')
  .then(r => r.json())
  .then(data => console.table(data))
```

---

### Step 7: Test Location Intelligence

```javascript
fetch('http://localhost:5000/api/analytics/location?city=Karachi')
  .then(r => r.json())
  .then(data => {
    console.log('📍 Location Intelligence:');
    console.log(`Provider Density: ${data.providerDensity}`);
    console.log(`Coverage Areas: ${data.coverage.totalAreas}`);
    console.log(`Providers per Area: ${data.coverage.providersPerArea.toFixed(2)}`);
  })
```

---

### Step 8: Create Multiple Bookings (Full Demo)

```javascript
// Booking 1: Emergency
fetch('http://localhost:5000/api/bookings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "Ahmed Raza",
    phone: "0300-9876543",
    email: "ahmed@example.com",
    city: "Lahore",
    serviceType: "Mosquito & Dengue Control",
    urgency: "emergency",
    message: "Dengue outbreak, need immediate fogging"
  })
}).then(r => r.json()).then(d => console.log('✅ Booking 1:', d.name))

// Booking 2: Regular
fetch('http://localhost:5000/api/bookings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "Fatima Sheikh",
    phone: "0300-5551234",
    email: "fatima@example.com",
    city: "Islamabad",
    serviceType: "Water Tank Cleaning",
    urgency: "normal",
    message: "Monthly maintenance"
  })
}).then(r => r.json()).then(d => console.log('✅ Booking 2:', d.name))

// Booking 3: Agricultural
fetch('http://localhost:5000/api/bookings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "Farmer Ali",
    phone: "0300-7778888",
    email: "ali@example.com",
    city: "Multan",
    serviceType: "Crop-Specific Pest Control",
    urgency: "normal",
    message: "Need cotton pest control for 10 acres"
  })
}).then(r => r.json()).then(d => console.log('✅ Booking 3:', d.name))
```

**Then view all:**
```javascript
fetch('http://localhost:5000/api/bookings')
  .then(r => r.json())
  .then(data => {
    console.log(`\n📋 Total Bookings: ${data.length}`);
    data.forEach((b, i) => {
      console.log(`${i+1}. ${b.name} - ${b.serviceType} (${b.city})`);
    });
  })
```

---

## 🎯 Complete Demo Flow

### Scenario: Complete Customer Journey

1. **Customer browses services** → `/services` page
2. **Customer books service** → `/book` page, fills form
3. **System creates booking** → API: `POST /api/bookings`
4. **Provider registered** → API: `POST /api/providers`
5. **View analytics** → `/analytics` page or API: `GET /api/analytics/dashboard`
6. **Check demand** → API: `GET /api/analytics/demand`
7. **Location intelligence** → API: `GET /api/analytics/location`

---

## ✅ Success Checklist

After testing, you should have:

- [x] Frontend loads with purple gradient design
- [x] Services page shows all 4 categories
- [x] Booking form submits successfully
- [x] At least 3 bookings created
- [x] At least 1 provider registered
- [x] Analytics dashboard shows stats
- [x] All API endpoints working
- [x] Navigation between pages works

---

## 🔧 Quick API Test

Run this in a new terminal:
```bash
cd D:\semester7\web_programming\semester_project_2.0
bun test-api.js
```

Or test manually in browser console (F12):
```javascript
// Quick health check
fetch('http://localhost:5000/')
  .then(r => r.json())
  .then(console.log)
```

---

## 📱 Frontend Pages to Test

1. **Homepage** (`/`) - Hero, services preview, stats
2. **Services** (`/services`) - Full services catalog
3. **About** (`/about`) - Problem & Vision section
4. **Providers** (`/providers`) - Provider network
5. **Analytics** (`/analytics`) - Dashboard stats
6. **Book** (`/book`) - Booking form

---

## 🐛 Troubleshooting

**Backend not responding?**
- Check terminal: Should see "SafaiPak API running on port 5000"
- Try: `http://localhost:5000` in browser

**Frontend not loading?**
- Check terminal for Vite dev server URL
- Usually: `http://localhost:5173`
- Check browser console for errors

**API calls failing?**
- Ensure backend is running first
- Check CORS (should be enabled automatically)
- Open Network tab in DevTools to see requests

---

**🎉 Your application is ready for testing!**

Both servers should be running. Open your browser and start testing!

