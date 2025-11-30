import { Request, Response, NextFunction } from "express";
import { DeliveryAddressService } from "../Services/deliveryAddress.service";
import { DeliveryAddressRequest, DeliveryAddressSchema } from "../DTO/Requests";
import { AppError } from "../Utilities";

export class DeliveryAddressController {
    // -------------------------------------------------
    // CREATE
    // -------------------------------------------------
    static async create(req: Request, res: Response, next: NextFunction) {

            const parsed = DeliveryAddressSchema.safeParse(req.body);
            if (!parsed.success) {
                throw new AppError("Some Data is missing.", 400, parsed.error.issues)
            }

            const address = parsed.data;
            const result = await DeliveryAddressService.create(address);
            return res.status(201).json(result);

    }

  // -------------------------------------------------
  // GET ALL FOR USER
  // -------------------------------------------------
  static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user.id;

            const addresses = await DeliveryAddressService.getAll(userId);

            return res.status(200).json({
                message: "Addresses fetched successfully",
                data: addresses,
            });
        } catch (error) {
            next(error);
        }
    }

    // -------------------------------------------------
    // GET ONE BY ID
    // -------------------------------------------------
    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user.id;
            const { id } = req.params;

            const address = await DeliveryAddressService.getById(id, userId);

            return res.status(200).json({
                message: "Address fetched successfully",
                data: address,
            });
        } catch (error) {
            next(error);
        }
    }

    // -------------------------------------------------
    // UPDATE
    // -------------------------------------------------
    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            // partial validation allowed
            const parsed = DeliveryAddressSchema.partial().parse(req.body);

            const updated = await DeliveryAddressService.update(id, userId, parsed);

            return res.status(200).json({
                message: "Address updated successfully",
                data: updated,
            });
        } catch (error) {
            next(error);
        }
    }

    // -------------------------------------------------
    // SET DEFAULT
    // -------------------------------------------------
    static async setDefault(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            await DeliveryAddressService.setDefault(id, userId);

            return res.status(200).json({
                message: "Default address updated",
            });
        } catch (error) {
            next(error);
        }
    }

    // -------------------------------------------------
    // DELETE (SOFT DELETE)
    // -------------------------------------------------
    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            await DeliveryAddressService.delete(id, userId);

            return res.status(200).json({
                message: "Address deleted successfully",
            });
        } catch (error) {
            next(error);
        }
    }
}
