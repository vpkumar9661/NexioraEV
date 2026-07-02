import { Router } from "express";
import {
  createVehicleSchema,
  vehicleFilterSchema,
  type VehicleFilterInput,
} from "@nexiora/shared/schemas";
import { authenticate, authorize } from "../middleware/authenticate.js";
import { validate } from "../middleware/validate.js";
import {
  createVehicle,
  getVehicleById,
  listVehicles,
} from "../services/vehicle.service.js";
import { successResponse } from "../utils/response.js";

export const vehicleRouter = Router();

vehicleRouter.get("/", validate(vehicleFilterSchema, "query"), async (req, res, next) => {
  try {
    const result = await listVehicles(req.query as unknown as VehicleFilterInput);
    res.json(successResponse(result));
  } catch (error) {
    next(error);
  }
});

vehicleRouter.get("/:id", async (req, res, next) => {
  try {
    const vehicle = await getVehicleById(req.params.id!);
    res.json(successResponse(vehicle));
  } catch (error) {
    next(error);
  }
});

vehicleRouter.post(
  "/",
  authenticate,
  authorize("DEALER", "ADMIN"),
  validate(createVehicleSchema),
  async (req, res, next) => {
    try {
      const vehicle = await createVehicle(req.user!.id, req.body);
      res.status(201).json(successResponse(vehicle, "Vehicle listed successfully"));
    } catch (error) {
      next(error);
    }
  },
);
