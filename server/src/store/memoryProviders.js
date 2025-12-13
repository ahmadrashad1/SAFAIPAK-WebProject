const providers = [];

export const addProvider = (payload) => {
  const doc = {
    _id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
    ...payload,
    rating: payload.rating || 0,
    totalJobs: payload.totalJobs || 0,
    verified: payload.verified || false,
    available: payload.available !== undefined ? payload.available : true,
    status: payload.status || "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  providers.push(doc);
  return doc;
};

export const listProviders = (query = {}) => {
  let filtered = [...providers];

  if (query.city) {
    const cityRegex = new RegExp(query.city, "i");
    filtered = filtered.filter((p) => cityRegex.test(p.city));
  }

  if (query.specialization) {
    filtered = filtered.filter((p) =>
      p.specialization?.includes(query.specialization)
    );
  }

  if (query.available !== undefined) {
    filtered = filtered.filter((p) => p.available === query.available);
  }

  if (query.verified !== undefined) {
    filtered = filtered.filter((p) => p.verified === query.verified);
  }

  return filtered.sort((a, b) => b.rating - a.rating || b.totalJobs - a.totalJobs);
};

export const getProvider = (id) => {
  return providers.find((p) => p._id === id);
};

export const updateProvider = (id, updates) => {
  const index = providers.findIndex((p) => p._id === id);
  if (index === -1) return null;

  providers[index] = {
    ...providers[index],
    ...updates,
    updatedAt: new Date(),
  };
  return providers[index];
};

export default {
  addProvider,
  listProviders,
  getProvider,
  updateProvider,
};

