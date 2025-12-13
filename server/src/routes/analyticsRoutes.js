import { Router } from "express";
import {
  getDashboardStats,
  getServiceDemand,
  getProviderAnalytics,
  getLocationIntelligence,
} from "../controllers/analyticsController.js";

const router = Router();

router.get("/dashboard", getDashboardStats);
router.get("/demand", getServiceDemand);
router.get("/provider/:providerId", getProviderAnalytics);
router.get("/location", getLocationIntelligence);

export default router;

