import memoryBookings from "./memoryBookings.js";
import memoryProviders from "./memoryProviders.js";

export const getDashboardStats = () => {
  const bookings = memoryBookings.listBookings(1000);
  const providers = memoryProviders.listProviders({ verified: true });

  return {
    totalBookings: bookings.length,
    totalProviders: providers.length,
    pendingBookings: bookings.filter((b) => b.status === "pending").length,
    completedBookings: bookings.filter((b) => b.status === "completed").length,
    completionRate:
      bookings.length > 0
        ? ((bookings.filter((b) => b.status === "completed").length / bookings.length) * 100).toFixed(1)
        : 0,
  };
};

export const getServiceDemand = ({ city, serviceType }) => {
  const bookings = memoryBookings.listBookings(1000);
  let filtered = bookings;

  if (city) {
    const cityRegex = new RegExp(city, "i");
    filtered = filtered.filter((b) => cityRegex.test(b.city));
  }

  if (serviceType) {
    filtered = filtered.filter((b) => b.serviceType === serviceType);
  }

  const demand = {};
  filtered.forEach((booking) => {
    const key = `${booking.city}-${booking.serviceType}`;
    if (!demand[key]) {
      demand[key] = { city: booking.city, serviceType: booking.serviceType, count: 0 };
    }
    demand[key].count++;
  });

  return Object.values(demand);
};

export const getProviderAnalytics = (providerId) => {
  const provider = memoryProviders.getProvider(providerId);
  if (!provider) {
    return { error: "Provider not found" };
  }

  const bookings = memoryBookings.listBookings(1000).filter(
    (b) => b.providerId === providerId
  );

  return {
    provider: {
      name: provider.name,
      rating: provider.rating,
      totalJobs: provider.totalJobs,
    },
    bookings: {
      total: bookings.length,
      completed: bookings.filter((b) => b.status === "completed").length,
      pending: bookings.filter((b) => b.status === "pending").length,
    },
    earnings: {
      total: bookings
        .filter((b) => b.status === "completed")
        .reduce((sum, b) => sum + (b.amount || 0), 0),
    },
  };
};

export const getLocationIntelligence = (city) => {
  const providers = memoryProviders.listProviders(city ? { city } : {});
  const bookings = memoryBookings.listBookings(1000);

  let filteredBookings = bookings;
  if (city) {
    const cityRegex = new RegExp(city, "i");
    filteredBookings = bookings.filter((b) => cityRegex.test(b.city));
  }

  const cities = new Set(filteredBookings.map((b) => b.city));

  return {
    providerDensity: providers.length,
    serviceGaps: [],
    demandHotspots: Array.from(cities).map((c) => ({
      city: c,
      demand: filteredBookings.filter((b) => b.city === c).length,
    })),
    coverage: {
      totalAreas: cities.size,
      providersPerArea: cities.size > 0 ? providers.length / cities.size : 0,
    },
  };
};

export default {
  getDashboardStats,
  getServiceDemand,
  getProviderAnalytics,
  getLocationIntelligence,
};

