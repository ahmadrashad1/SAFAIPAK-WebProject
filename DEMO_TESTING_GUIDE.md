# SafaiPak Application - Demo Testing Guide

## 🚀 Application Status

- **Backend Server**: Running on `http://localhost:5000`
- **Frontend Client**: Running on `http://localhost:5173` (or check terminal for actual port)
- **Database**: Using in-memory mode (no MongoDB required for demo)

---

## 📋 Demo Testing Scenarios

### Scenario 1: Browse Services Catalog

**Steps:**
1. Open browser and navigate to `http://localhost:5173`
2. You should see the SafaiPak homepage with purple gradient hero section
3. Scroll down to see "Core Services Portfolio" section
4. Verify you see 4 service categories:
   - Pest Control Services
   - Sanitation & Cleaning Services
   - Specialized Health Services
   - Agricultural Services

**Expected Result:**
- Services are displayed in cards
- Each card shows service list with checkmarks
- Agricultural services show seasonal packages

**API Test:**
```bash
# Test in browser console or use curl:
fetch('http://localhost:5000/api/services')
  .then(r => r.json())
  .then(console.log)
```

---

### Scenario 2: Create a Booking (Customer Journey)

**Steps:**
1. On homepage, click "Book a Service" button (or navigate to `/book`)
2. Fill out the contact form:
   - **Name**: Ayesha Khan
   - **Email**: ayesha@example.com
   - **Phone**: 0300-1234567
   - **Message**: Need emergency mosquito control in Lahore
   - **How did you hear about us**: Select "Search Engine"
3. Check the privacy policy checkbox
4. Click "Submit"

**Expected Result:**
- Success message appears: "Thank you! We'll contact you shortly."
- Form resets
- Booking is stored in backend

**API Verification:**
```bash
# Check if booking was created:
fetch('http://localhost:5000/api/bookings')
  .then(r => r.json())
  .then(console.log)
```

**You should see:**
```json
[
  {
    "_id": "...",
    "name": "Ayesha Khan",
    "email": "ayesha@example.com",
    "phone": "0300-1234567",
    "message": "Need emergency mosquito control in Lahore",
    "status": "pending",
    "createdAt": "..."
  }
]
```

---

### Scenario 3: Register a Service Provider

**Steps:**
1. Open browser console (F12)
2. Run this command to register a provider:

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
.then(console.log)
```

**Expected Result:**
- Provider object returned with `_id`
- Provider registered successfully

**Verify Provider:**
```javascript
// List all providers
fetch('http://localhost:5000/api/providers')
  .then(r => r.json())
  .then(console.log)
```

---

### Scenario 4: Search Providers by City

**Steps:**
1. In browser console, test provider search:

```javascript
// Search providers in Karachi
fetch('http://localhost:5000/api/providers?city=Karachi&verified=true')
  .then(r => r.json())
  .then(console.log)

// Search available providers
fetch('http://localhost:5000/api/providers?available=true')
  .then(r => r.json())
  .then(console.log)
```

**Expected Result:**
- Filtered list of providers matching criteria
- Hassan Ali should appear in Karachi results

---

### Scenario 5: View Analytics Dashboard

**Steps:**
1. Navigate to `/analytics` page in frontend
2. Or test API directly:

```javascript
// Get dashboard stats
fetch('http://localhost:5000/api/analytics/dashboard')
  .then(r => r.json())
  .then(console.log)
```

**Expected Result:**
```json
{
  "totalBookings": 1,
  "totalProviders": 1,
  "pendingBookings": 1,
  "completedBookings": 0,
  "completionRate": "0.0"
}
```

---

### Scenario 6: Service Demand Analysis

**Steps:**
1. Test service demand analytics:

```javascript
// Get demand by city
fetch('http://localhost:5000/api/analytics/demand?city=Lahore')
  .then(r => r.json())
  .then(console.log)

// Get demand by service type
fetch('http://localhost:5000/api/analytics/demand?serviceType=Mosquito%20Control')
  .then(r => r.json())
  .then(console.log)
```

**Expected Result:**
- Demand data showing booking counts by city/service type

---

### Scenario 7: Location Intelligence

**Steps:**
1. Test location intelligence:

```javascript
// Get location intelligence for a city
fetch('http://localhost:5000/api/analytics/location?city=Karachi')
  .then(r => r.json())
  .then(console.log)
```

**Expected Result:**
```json
{
  "providerDensity": 1,
  "serviceGaps": [],
  "demandHotspots": [...],
  "coverage": {
    "totalAreas": 1,
    "providersPerArea": 1
  }
}
```

---

### Scenario 8: Complete Booking Flow

**Steps:**
1. Create multiple bookings to simulate real usage:

```javascript
// Booking 1: Emergency pest control
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
    details: "Dengue outbreak in neighborhood, need immediate fogging"
  })
})
.then(r => r.json())
.then(console.log)

// Booking 2: Regular cleaning
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
    details: "Monthly maintenance required"
  })
})
.then(r => r.json())
.then(console.log)
```

2. View all bookings:
```javascript
fetch('http://localhost:5000/api/bookings')
  .then(r => r.json())
  .then(data => {
    console.log(`Total bookings: ${data.length}`);
    console.table(data);
  })
```

---

### Scenario 9: Provider Analytics

**Steps:**
1. First, get a provider ID from the providers list
2. Then get analytics for that provider:

```javascript
// Get provider analytics (replace PROVIDER_ID with actual ID)
fetch('http://localhost:5000/api/analytics/provider/PROVIDER_ID')
  .then(r => r.json())
  .then(console.log)
```

**Expected Result:**
- Provider details
- Booking statistics
- Earnings information

---

### Scenario 10: Frontend Navigation Test

**Steps:**
1. Navigate through all pages:
   - Homepage (`/`)
   - Services (`/services`)
   - About (`/about`)
   - Providers (`/providers`)
   - Analytics (`/analytics`)
   - Book (`/book`)

2. Test features:
   - Click navigation links
   - Test responsive design (resize browser)
   - Check form submissions
   - Verify API calls in Network tab (F12 → Network)

---

## 🧪 Quick API Test Script

Save this as `test-api.js` and run with `bun test-api.js`:

```javascript
const API_URL = 'http://localhost:5000';

async function testAPI() {
  console.log('🧪 Testing SafaiPak API...\n');

  // Test 1: Health Check
  try {
    const health = await fetch(`${API_URL}/`).then(r => r.json());
    console.log('✅ Health Check:', health);
  } catch (e) {
    console.error('❌ Health Check Failed:', e.message);
  }

  // Test 2: Get Services
  try {
    const services = await fetch(`${API_URL}/api/services`).then(r => r.json());
    console.log(`✅ Services: ${services.length} categories found`);
  } catch (e) {
    console.error('❌ Services Failed:', e.message);
  }

  // Test 3: Create Booking
  try {
    const booking = await fetch(`${API_URL}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: "Test User",
        phone: "0300-0000000",
        email: "test@example.com",
        city: "Lahore",
        serviceType: "Pest Control",
        urgency: "normal"
      })
    }).then(r => r.json());
    console.log('✅ Booking Created:', booking._id);
  } catch (e) {
    console.error('❌ Booking Failed:', e.message);
  }

  // Test 4: List Bookings
  try {
    const bookings = await fetch(`${API_URL}/api/bookings`).then(r => r.json());
    console.log(`✅ Bookings: ${bookings.length} found`);
  } catch (e) {
    console.error('❌ List Bookings Failed:', e.message);
  }

  // Test 5: Register Provider
  try {
    const provider = await fetch(`${API_URL}/api/providers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: "Test Provider",
        email: "provider@example.com",
        phone: "021-1111111",
        city: "Karachi",
        specialization: ["Pest Control"],
        verified: true
      })
    }).then(r => r.json());
    console.log('✅ Provider Created:', provider._id);
  } catch (e) {
    console.error('❌ Provider Failed:', e.message);
  }

  // Test 6: Analytics
  try {
    const stats = await fetch(`${API_URL}/api/analytics/dashboard`).then(r => r.json());
    console.log('✅ Analytics:', stats);
  } catch (e) {
    console.error('❌ Analytics Failed:', e.message);
  }

  console.log('\n✨ All tests completed!');
}

testAPI();
```

---

## 📊 Expected Results Summary

After running all scenarios, you should have:

- ✅ **3+ Bookings** in the system
- ✅ **1+ Providers** registered
- ✅ **Services catalog** fully loaded
- ✅ **Analytics data** showing stats
- ✅ **Frontend** displaying all data correctly

---

## 🔍 Troubleshooting

### Backend not responding?
- Check if server is running: `http://localhost:5000`
- Check terminal for errors
- Verify port 5000 is not in use

### Frontend not loading?
- Check if Vite dev server is running
- Verify the port (usually 5173)
- Check browser console for errors

### API calls failing?
- Verify CORS is enabled (should be automatic)
- Check Network tab in browser DevTools
- Ensure backend is running before frontend

### Data not persisting?
- This is normal in memory mode
- Data resets when server restarts
- To persist: Set `USE_MEMORY_DB=false` and use MongoDB

---

## 🎯 Success Criteria

Your application is working correctly if:

1. ✅ Frontend loads with purple gradient design
2. ✅ Services page shows all 4 categories
3. ✅ Booking form submits successfully
4. ✅ API endpoints return JSON data
5. ✅ Providers can be registered
6. ✅ Analytics show dashboard stats
7. ✅ All pages navigate correctly

---

**Happy Testing! 🚀**

