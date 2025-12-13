// Quick API Test Script for SafaiPak
const API_URL = 'http://localhost:5000';

async function testAPI() {
  console.log('🧪 Testing SafaiPak API...\n');

  // Test 1: Health Check
  try {
    const health = await fetch(`${API_URL}/`).then(r => r.json());
    console.log('✅ Health Check:', health.status);
  } catch (e) {
    console.error('❌ Health Check Failed:', e.message);
    console.log('⚠️  Make sure backend is running on port 5000');
    return;
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
        urgency: "normal",
        message: "Test booking from API test"
      })
    }).then(r => r.json());
    console.log('✅ Booking Created:', booking._id || booking.name);
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
        verified: true,
        available: true
      })
    }).then(r => r.json());
    console.log('✅ Provider Created:', provider._id || provider.name);
  } catch (e) {
    console.error('❌ Provider Failed:', e.message);
  }

  // Test 6: Analytics
  try {
    const stats = await fetch(`${API_URL}/api/analytics/dashboard`).then(r => r.json());
    console.log('✅ Analytics:', `Total: ${stats.totalBookings} bookings, ${stats.totalProviders} providers`);
  } catch (e) {
    console.error('❌ Analytics Failed:', e.message);
  }

  console.log('\n✨ All tests completed!');
  console.log('\n📝 Next Steps:');
  console.log('1. Open http://localhost:5173 in your browser');
  console.log('2. Navigate to /book page and submit a booking');
  console.log('3. Check /services page to see all services');
  console.log('4. View /analytics page for dashboard stats');
}

testAPI().catch(console.error);

