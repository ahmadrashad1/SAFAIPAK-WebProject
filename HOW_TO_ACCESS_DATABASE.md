# 🗄️ How to Access Your Database

## Current Setup: In-Memory Storage

Your database is currently using **in-memory storage** (data in RAM, resets on server restart).

---

## ✅ Method 1: View Data via API (Works Now)

### Option A: Browser Console

1. Open your browser
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Run these commands:

```javascript
// View all bookings
fetch('http://localhost:5000/api/bookings')
  .then(r => r.json())
  .then(data => {
    console.log('📋 Bookings:', data);
    console.table(data);
  })

// View all providers
fetch('http://localhost:5000/api/providers')
  .then(r => r.json())
  .then(data => {
    console.log('👨‍🔧 Providers:', data);
    console.table(data);
  })
```

### Option B: Command Line Script

```bash
cd server
bun view-db
```

This shows all data in a formatted way.

### Option C: Direct URL

Open in browser:
- Bookings: `http://localhost:5000/api/bookings`
- Providers: `http://localhost:5000/api/providers`
- Analytics: `http://localhost:5000/api/analytics/dashboard`

---

## 💾 Method 2: Switch to MongoDB (Persistent Database)

### Step 1: Install MongoDB

**Option A: Local MongoDB (Windows)**

1. Download MongoDB Community Server:
   - https://www.mongodb.com/try/download/community
   - Choose: Windows, MSI installer
   - Install with default settings
   - MongoDB will run as a Windows service automatically

2. Verify installation:
   ```bash
   mongosh --version
   ```

**Option B: MongoDB Atlas (Cloud - Free, No Installation)**

1. Go to: https://www.mongodb.com/cloud/atlas
2. Sign up (free)
3. Create a free cluster
4. Get connection string (looks like: `mongodb+srv://user:pass@cluster.mongodb.net/safaipak`)

### Step 2: Configure Backend

Create `server/.env` file:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/safaipak
USE_MEMORY_DB=false
```

**If using MongoDB Atlas, use:**
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/safaipak
USE_MEMORY_DB=false
```

### Step 3: Restart Backend

```bash
cd server
bun dev
```

Look for: `Connected to MongoDB` (not "in-memory mode")

---

## 🔍 Method 3: Access MongoDB Directly

### Using MongoDB Shell (mongosh)

```bash
# Connect to database
mongosh mongodb://127.0.0.1:27017/safaipak

# Or if MongoDB is running locally
mongosh
use safaipak
```

**Useful Commands:**

```javascript
// Show all collections
show collections

// View all bookings
db.bookings.find().pretty()

// View all providers
db.providers.find().pretty()

// Count documents
db.bookings.countDocuments()
db.providers.countDocuments()

// Find specific bookings
db.bookings.find({ status: "pending" }).pretty()
db.bookings.find({ city: "Lahore" }).pretty()

// Find providers by city
db.providers.find({ city: "Karachi" }).pretty()

// Sort bookings by date
db.bookings.find().sort({ createdAt: -1 }).pretty()

// Limit results
db.bookings.find().limit(10).pretty()
```

### Using MongoDB Compass (GUI Tool - Recommended)

1. **Download MongoDB Compass:**
   - https://www.mongodb.com/try/download/compass
   - Install it

2. **Connect:**
   - Open MongoDB Compass
   - Connection string: `mongodb://127.0.0.1:27017`
   - Click "Connect"

3. **Browse Database:**
   - Select database: `safaipak`
   - Click on `bookings` collection
   - View all documents in a nice table format
   - Click on `providers` collection
   - View all providers

**MongoDB Compass Features:**
- Visual data browser
- Filter and search
- Edit documents
- View indexes
- Run queries visually

---

## 📊 Quick Access Methods Summary

| Method | Command/URL | Best For |
|--------|-------------|----------|
| **Browser Console** | `fetch('http://localhost:5000/api/bookings')` | Quick viewing |
| **Command Script** | `bun view-db` | Formatted output |
| **Direct URL** | `http://localhost:5000/api/bookings` | Simple viewing |
| **Admin Dashboard** | `http://localhost:5174` | Visual interface |
| **MongoDB Shell** | `mongosh` | Direct queries |
| **MongoDB Compass** | GUI tool | Visual browsing |

---

## 🚀 Recommended: Start Here

### For Quick Viewing (No Setup):

1. **Open browser console (F12)**
2. **Run:**
   ```javascript
   fetch('http://localhost:5000/api/bookings')
     .then(r => r.json())
     .then(console.table)
   ```

### For Persistent Storage:

1. **Install MongoDB** (local or Atlas)
2. **Create `server/.env`** with `USE_MEMORY_DB=false`
3. **Restart backend**
4. **Use MongoDB Compass** to browse visually

---

## ✅ Check Current Mode

Look at your backend terminal output:
- `"Using in-memory store"` = In-memory mode
- `"Connected to MongoDB"` = MongoDB mode

---

**Easiest way right now: Open browser console and run the fetch command!** 🎯

