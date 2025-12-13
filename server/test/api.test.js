process.env.USE_MEMORY_DB = "true";

import { test, expect } from "bun:test";
import request from "supertest";
import app from "../src/app.js";

test("GET /api/services returns catalog", async () => {
  const res = await request(app).get("/api/services");
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBeGreaterThan(0);
});

test("POST /api/bookings creates booking (memory store)", async () => {
  const payload = {
    name: "Test User",
    phone: "0300-1234567",
    email: "t@example.com",
    city: "Lahore",
    serviceType: "Mosquito & Dengue Control",
    urgency: "normal",
    details: "Test booking",
  };

  const res = await request(app).post("/api/bookings").send(payload);
  expect(res.status).toBe(201);
  expect(res.body?.name).toBe(payload.name);
  expect(res.body?.serviceType).toBe(payload.serviceType);
});

test("GET /api/bookings lists recent bookings", async () => {
  const res = await request(app).get("/api/bookings");
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

