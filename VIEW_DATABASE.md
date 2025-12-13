# 🔍 How to View Your Database

## Current Status

Your system is using **in-memory storage** (data resets on server restart).

---

## 🚀 Quick Methods to View Data

### Method 1: Browser Console (Easiest)

Open browser console (F12) and run:

```javascript
// View all bookings
fetch('http://localhost:5000/api/bookings')
  .then(r => r.json())
  .then(data => {
    console.log(`📋 Total Bookings: ${data.length}`);
    console.table(data);
  })

// View all providers
fetch('http://localhost:5000/api/providers')
  .then(r => r.json())
  .then(data => {
    console.log(`👨‍🔧 Total Providers: ${data.length}`);
    console.table(data);
  })

// View analytics
fetch('http://localhost:5000/api/analytics/dashboard')
  .then(r => r.json())
  .then(stats => {
    console.log('📊 Dashboard Stats:', stats);
  })
```

### Method 2: Command Line Script

```bash
cd server
bun view-db
```

This will show all data in a formatted way.

### Method 3: Direct API Calls

```bash
# View bookings (PowerShell)
Invoke-WebRequest -Uri "http://localhost:5000/api/bookings" | Select-Object -ExpandProperty Content

# Or use curl if available
curl http://localhost:5000/api/bookings
```

### Method 4: Admin Dashboard

Go to `http://localhost:5174` - the admin dashboard shows all bookings in a table.

---

## 💾 Switch to MongoDB (Persistent Storage)

### Step 1: Install MongoDB

**Option A: Local MongoDB**
1. Download: https://www.mongodb.com/try/download/community
2. Install MongoDB Community Server
3. It runs automatically as a Windows service

**Option B: MongoDB Atlas (Cloud - Free)**
1. Sign up: https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string

### Step 2: Configure Backend

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

Look for: `Connected to MongoDB` (not "in-memory mode")

---

## 🗄️ Query MongoDB Directly

### Using MongoDB Shell (mongosh)

```bash
# Install mongosh if not installed
# Download from: https://www.mongodb.com/try/download/shell

# Connect
mongosh mongodb://127.0.0.1:27017/safaipak

# Commands:
show collections
db.bookings.find().pretty()
db.providers.find().pretty()
db.bookings.countDocuments()
db.bookings.find({ status: "pending" }).pretty()
db.bookings.find({ city: "Lahore" }).pretty()
```

### Using MongoDB Compass (GUI)

1. Download: https://www.mongodb.com/try/download/compass
2. Connect to: `mongodb://127.0.0.1:27017`
3. Select database: `safaipak`
4. Browse collections visually

---

## 📊 Quick Reference

| Method | Command | Best For |
|--------|---------|----------|
| Browser Console | `fetch('http://localhost:5000/api/bookings')` | Quick viewing |
| Script | `bun view-db` | Formatted output |
| Admin Dashboard | `http://localhost:5174` | Visual interface |
| MongoDB Shell | `mongosh` | Direct queries |
| MongoDB Compass | GUI tool | Visual browsing |

---

## ✅ Recommended Approach

1. **For quick viewing**: Use browser console (Method 1)
2. **For formatted output**: Use `bun view-db` script (Method 2)
3. **For persistent storage**: Switch to MongoDB (Method 4)
4. **For advanced queries**: Use MongoDB Shell or Compass

---

**Try the browser console method first - it's the quickest!** 🚀

