import Analytics from "../models/Analytics.js";
import Booking from "../models/Booking.js";
import Provider from "../models/Provider.js";
import { useMemoryStore } from "../config/db.js";
import memoryAnalytics from "../store/memoryAnalytics.js";
import memoryBookings from "../store/memoryBookings.js";
import memoryProviders from "../store/memoryProviders.js";

export const getDashboardStats = async (_req, res) => {
  try {
    if (useMemoryStore) {
      const stats = memoryAnalytics.getDashboardStats();
      return res.json(stats);
    }

    const totalBookings = await Booking.countDocuments();
    const totalProviders = await Provider.countDocuments({ verified: true });
    const pendingBookings = await Booking.countDocuments({ status: "pending" });
    const completedBookings = await Booking.countDocuments({
      status: "completed",
    });

    const stats = {
      totalBookings,
      totalProviders,
      pendingBookings,
      completedBookings,
      completionRate:
        totalBookings > 0
          ? ((completedBookings / totalBookings) * 100).toFixed(1)
          : 0,
    };

    return res.json(stats);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch stats", error: error.message });
  }
};

export const getServiceDemand = async (req, res) => {
  try {
    const { city, serviceType } = req.query;

    if (useMemoryStore) {
      const demand = memoryAnalytics.getServiceDemand({ city, serviceType });
      return res.json(demand);
    }

    const query = {};
    if (city) query.city = new RegExp(city, "i");
    if (serviceType) query.serviceType = serviceType;

    const bookings = await Booking.find(query)
      .select("serviceType city createdAt")
      .lean();

    const demand = bookings.reduce((acc, booking) => {
      const key = `${booking.city}-${booking.serviceType}`;
      if (!acc[key]) {
        acc[key] = { city: booking.city, serviceType: booking.serviceType, count: 0 };
      }
      acc[key].count++;
      return acc;
    }, {});

    return res.json(Object.values(demand));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch demand", error: error.message });
  }
};

export const getProviderAnalytics = async (req, res) => {
  try {
    const { providerId } = req.params;

    if (useMemoryStore) {
      const analytics = memoryAnalytics.getProviderAnalytics(providerId);
      return res.json(analytics);
    }

    const provider = await Provider.findById(providerId).lean();
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    const bookings = await Booking.find({
      providerId: providerId,
    }).lean();

    const analytics = {
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

    return res.json(analytics);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch analytics", error: error.message });
  }
};

export const getLocationIntelligence = async (req, res) => {
  try {
    const { city } = req.query;

    if (useMemoryStore) {
      const intelligence = memoryAnalytics.getLocationIntelligence(city);
      return res.json(intelligence);
    }

    const providers = await Provider.find(
      city ? { city: new RegExp(city, "i") } : {}
    ).lean();

    const bookings = await Booking.find(
      city ? { city: new RegExp(city, "i") } : {}
    ).lean();

    const intelligence = {
      providerDensity: providers.length,
      serviceGaps: [],
      demandHotspots: [],
      coverage: {
        totalAreas: new Set(bookings.map((b) => b.city)).size,
        providersPerArea: providers.length / Math.max(new Set(bookings.map((b) => b.city)).size, 1),
      },
    };

    return res.json(intelligence);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch intelligence", error: error.message });
  }
};

