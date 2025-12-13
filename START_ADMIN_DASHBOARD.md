# 🚀 Starting the Admin Dashboard

## The Error You're Seeing

`ERR_CONNECTION_REFUSED` on `localhost:5174` means the admin dashboard server isn't running.

## ✅ Solution: Start the Admin Dashboard

### Option 1: Using Terminal (Recommended)

Open a **new terminal** and run:

```bash
cd D:\semester7\web_programming\semester_project_2.0\admin-dashboard
bun dev
```

You should see output like:
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5174/
  ➜  Network: use --host to expose
```

### Option 2: Check if Already Running

The server might already be starting in the background. Wait a few seconds and refresh your browser.

## 📋 Complete Setup Checklist

Make sure all three services are running:

### 1. Backend Server (Port 5000)
```bash
cd server
bun dev
```
✅ Check: Open `http://localhost:5000` - should show API info

### 2. Main Client (Port 5173)
```bash
cd client
bun dev
```
✅ Check: Open `http://localhost:5173` - should show SafaiPak homepage

### 3. Admin Dashboard (Port 5174)
```bash
cd admin-dashboard
bun dev
```
✅ Check: Open `http://localhost:5174` - should show admin dashboard

## 🔍 Troubleshooting

### Port 5174 Already in Use?

If you get a port conflict error:
1. Find what's using port 5174:
   ```bash
   netstat -ano | findstr :5174
   ```
2. Kill that process or change port in `admin-dashboard/vite.config.js`

### Still Not Working?

1. **Check dependencies:**
   ```bash
   cd admin-dashboard
   bun install
   ```

2. **Verify backend is running:**
   - Admin dashboard needs backend on port 5000
   - Check: `http://localhost:5000`

3. **Check browser console:**
   - Press F12
   - Look for errors in Console tab

## 🎯 Quick Test

Once admin dashboard is running:

1. Open `http://localhost:5174`
2. You should see:
   - "SafaiPak Admin Dashboard" header
   - Stats cards (Total Bookings, Pending, etc.)
   - Bookings table

If you see "Loading..." spinner, the backend might not be running.

## 📝 Summary

**Three separate applications:**
- **Backend**: `http://localhost:5000` (Express API)
- **Client**: `http://localhost:5173` (Main website)
- **Admin**: `http://localhost:5174` (Admin dashboard)

All three need to be running for full functionality!

