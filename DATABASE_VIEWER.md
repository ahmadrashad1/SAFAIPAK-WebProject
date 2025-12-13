# 📊 Database Viewer Guide

## Current Setup

Your system is currently using **in-memory storage** (data resets when server restarts).

## Option 1: View Data via API (Current - In-Memory)

### View All Bookings
```bash
# In browser or terminal
curl http://localhost:5000/api/bookings
```

Or in browser console:
```javascript
fetch('http://localhost:5000/api/bookings')
  .then(r => r.json())
  .then(data => {
    console.log('📋 All Bookings:');
    console.table(data);
  })
```

### View All Providers
```javascript
fetch('http://localhost:5000/api/providers')
  .then(r => r.json())
  .then(data => {
    console.log('👨‍🔧 All Providers:');
    console.table(data);
  })
```

### View Dashboard Stats
```javascript
fetch('http://localhost:5000/api/analytics/dashboard')
  .then(r => r.json())
  .then(stats => {
    console.log('📊 Dashboard Stats:');
    console.log(stats);
  })
```

---

## Option 2: Switch to MongoDB (Persistent Storage)

### Step 1: Install MongoDB

**Windows:**
1. Download from: https://www.mongodb.com/try/download/community
2. Install MongoDB Community Server
3. MongoDB will run as a Windows service automatically

**Or use MongoDB Atlas (Cloud - Free):**
- Sign up at: https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get connection string

### Step 2: Create `.env` File

Create `server/.env` file:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/safaipak
USE_MEMORY_DB=false
```

### Step 3: Restart Backend

```bash
cd server
bun dev
```

You should see: `Connected to MongoDB` instead of "in-memory mode"

---

## Option 3: Query MongoDB Directly

### Using MongoDB Shell (mongosh)

```bash
# Connect to database
mongosh mongodb://127.0.0.1:27017/safaipak

# View all collections
show collections

# View all bookings
db.bookings.find().pretty()

# View all providers
db.providers.find().pretty()

# Count bookings
db.bookings.countDocuments()

# Find pending bookings
db.bookings.find({ status: "pending" }).pretty()

# Find bookings by city
db.bookings.find({ city: "Lahore" }).pretty()
```

### Using MongoDB Compass (GUI Tool)

1. Download: https://www.mongodb.com/try/download/compass
2. Connect to: `mongodb://127.0.0.1:27017`
3. Select database: `safaipak`
4. Browse collections visually

---

## Option 4: Create Database Viewer Page

I can create a database viewer page in your admin dashboard that shows all data in a nice format.

---

## Quick Commands

### Check Current Mode
```bash
# Check backend terminal output
# Should say: "Using in-memory store" or "Connected to MongoDB"
```

### View Data via API (Works for both modes)
```bash
# Bookings
curl http://localhost:5000/api/bookings | json_pp

# Providers  
curl http://localhost:5000/api/providers | json_pp

# Analytics
curl http://localhost:5000/api/analytics/dashboard | json_pp
```

---

## Which Option Should You Use?

- **Option 1 (API)**: Quick, works immediately, no setup needed
- **Option 2 (MongoDB)**: Persistent storage, data survives restarts
- **Option 3 (MongoDB Shell)**: Direct database access, powerful queries
- **Option 4 (Viewer Page)**: Visual interface, easy to use

**Recommendation**: Start with Option 1 (API) to see current data, then switch to MongoDB (Option 2) for persistent storage.

