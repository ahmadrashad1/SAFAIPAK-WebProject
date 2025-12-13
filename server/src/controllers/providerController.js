import Provider from "../models/Provider.js";
import { useMemoryStore } from "../config/db.js";
import memoryProviders from "../store/memoryProviders.js";

export const registerProvider = async (req, res) => {
  try {
    if (useMemoryStore) {
      const provider = memoryProviders.addProvider(req.body);
      return res.status(201).json(provider);
    }

    const provider = await Provider.create(req.body);
    return res.status(201).json(provider);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Could not register provider", error: error.message });
  }
};

export const listProviders = async (req, res) => {
  try {
    const { city, specialization, available, verified } = req.query;
    const query = {};

    if (city) query.city = new RegExp(city, "i");
    if (specialization) query.specialization = specialization;
    if (available !== undefined) query.available = available === "true";
    if (verified !== undefined) query.verified = verified === "true";

    if (useMemoryStore) {
      const providers = memoryProviders.listProviders(query);
      return res.json(providers);
    }

    const providers = await Provider.find(query)
      .sort({ rating: -1, totalJobs: -1 })
      .limit(100)
      .lean();
    return res.json(providers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch providers", error: error.message });
  }
};

export const getProvider = async (req, res) => {
  try {
    const { id } = req.params;

    if (useMemoryStore) {
      const provider = memoryProviders.getProvider(id);
      if (!provider) {
        return res.status(404).json({ message: "Provider not found" });
      }
      return res.json(provider);
    }

    const provider = await Provider.findById(id).lean();
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }
    return res.json(provider);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch provider", error: error.message });
  }
};

export const updateProvider = async (req, res) => {
  try {
    const { id } = req.params;

    if (useMemoryStore) {
      const provider = memoryProviders.updateProvider(id, req.body);
      if (!provider) {
        return res.status(404).json({ message: "Provider not found" });
      }
      return res.json(provider);
    }

    const provider = await Provider.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }
    return res.json(provider);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update provider", error: error.message });
  }
};

