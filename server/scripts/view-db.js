// Database Viewer Script
// Run with: bun server/scripts/view-db.js

import axios from "axios";

const API_URL = "http://localhost:5000";

async function viewDatabase() {
  console.log("🔍 SafaiPak Database Viewer\n");
  console.log("=" .repeat(50));

  try {
    // Check API health
    const health = await axios.get(`${API_URL}/`);
    console.log("✅ API Status:", health.data.status);
    console.log("📦 Service:", health.data.service);
    console.log("");

    // Get Bookings
    console.log("📋 BOOKINGS");
    console.log("-".repeat(50));
    const bookings = await axios.get(`${API_URL}/api/bookings`);
    if (bookings.data.length === 0) {
      console.log("No bookings found");
    } else {
      console.log(`Total: ${bookings.data.length} bookings\n`);
      bookings.data.forEach((booking, i) => {
        console.log(`${i + 1}. ${booking.name} (${booking.city})`);
        console.log(`   Service: ${booking.serviceType || booking.message || "N/A"}`);
        console.log(`   Status: ${booking.status} | Urgency: ${booking.urgency || "normal"}`);
        console.log(`   Created: ${new Date(booking.createdAt).toLocaleString()}`);
        console.log(`   ID: ${booking._id}`);
        console.log("");
      });
    }

    // Get Providers
    console.log("\n👨‍🔧 PROVIDERS");
    console.log("-".repeat(50));
    const providers = await axios.get(`${API_URL}/api/providers`);
    if (providers.data.length === 0) {
      console.log("No providers found");
    } else {
      console.log(`Total: ${providers.data.length} providers\n`);
      providers.data.forEach((provider, i) => {
        console.log(`${i + 1}. ${provider.name} (${provider.city})`);
        console.log(`   Email: ${provider.email} | Phone: ${provider.phone}`);
        console.log(`   Specialization: ${provider.specialization?.join(", ") || "N/A"}`);
        console.log(`   Verified: ${provider.verified ? "✅" : "❌"} | Available: ${provider.available ? "✅" : "❌"}`);
        console.log(`   Rating: ${provider.rating || 0} | Jobs: ${provider.totalJobs || 0}`);
        console.log(`   ID: ${provider._id}`);
        console.log("");
      });
    }

    // Get Analytics
    console.log("\n📊 ANALYTICS");
    console.log("-".repeat(50));
    const stats = await axios.get(`${API_URL}/api/analytics/dashboard`);
    console.log(`Total Bookings: ${stats.data.totalBookings}`);
    console.log(`Pending: ${stats.data.pendingBookings}`);
    console.log(`Completed: ${stats.data.completedBookings}`);
    console.log(`Total Providers: ${stats.data.totalProviders}`);
    console.log(`Completion Rate: ${stats.data.completionRate}%`);

    // Service Demand
    console.log("\n📈 SERVICE DEMAND");
    console.log("-".repeat(50));
    const demand = await axios.get(`${API_URL}/api/analytics/demand`);
    if (demand.data.length === 0) {
      console.log("No demand data");
    } else {
      demand.data.forEach((item) => {
        console.log(`${item.city} - ${item.serviceType}: ${item.count} bookings`);
      });
    }

  } catch (error) {
    console.error("❌ Error:", error.message);
    if (error.code === "ECONNREFUSED") {
      console.error("\n⚠️  Backend server is not running!");
      console.error("Start it with: cd server && bun dev");
    }
  }
}

viewDatabase();

