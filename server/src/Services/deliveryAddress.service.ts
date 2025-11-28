import { prisma } from "../Configs/prisma";
import { DeliveryAddressRequest } from "../DTO/Requests";
import { DeliveryAddressResponse } from "../DTO/Responses";
import { AppError } from "../Utilities";


export class DeliveryAddressService {
  // -------------------------------------------------
  // CREATE
  // -------------------------------------------------
  static async create(
    data: DeliveryAddressRequest
  ): Promise<DeliveryAddressResponse> {
    // If address is default, unset other defaults
    if (data.isDefault) {
      await prisma.deliveryAddress.updateMany({
        where: { userId: data.userId, isDefault: true },
        data: { isDefault: false },
      });
    }

    const address = await prisma.deliveryAddress.create({
      data: {
        userId: data.userId,
        fullName: data.fullName,
        phone: data.phone,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        country: data.country,
        landmark: data.landmark,
        isDefault: data.isDefault ?? false,
      },
    });

    return address;
  }

  // -------------------------------------------------
  // GET ALL FOR A USER
  // -------------------------------------------------
  static async getAll(userId: string): Promise<DeliveryAddressResponse[]> {
    return prisma.deliveryAddress.findMany({
      where: { userId, deletedAt: null },
      orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
    });
  }

  // -------------------------------------------------
  // GET ONE BY ID
  // -------------------------------------------------
  static async getById(
    id: string,
    userId: string
  ): Promise<DeliveryAddressResponse> {
    const address = await prisma.deliveryAddress.findFirst({
      where: { id, userId, deletedAt: null },
    });

    if (!address) throw new AppError("Address not found", 404);

    return address;
  }

  // -------------------------------------------------
  // UPDATE
  // -------------------------------------------------
  static async update(
    id: string,
    userId: string,
    data: Partial<DeliveryAddressRequest>
  ): Promise<DeliveryAddressResponse> {
    const existing = await prisma.deliveryAddress.findFirst({
      where: { id, userId, deletedAt: null },
    });

    if (!existing) throw new AppError("Address not found", 404);

    // If new default is set → unset others
    if (data.isDefault) {
      await prisma.deliveryAddress.updateMany({
        where: { userId, isDefault: true },
        data: { isDefault: false },
      });
    }

    const updated = await prisma.deliveryAddress.update({
      where: { id },
      data,
    });

    return updated;
  }

  // -------------------------------------------------
  // SET DEFAULT ADDRESS
  // -------------------------------------------------
  static async setDefault(id: string, userId: string): Promise<void> {
    const address = await prisma.deliveryAddress.findFirst({
      where: { id, userId, deletedAt: null },
    });

    if (!address) throw new AppError("Address not found", 404);

    await prisma.$transaction([
      prisma.deliveryAddress.updateMany({
        where: { userId, isDefault: true },
        data: { isDefault: false },
      }),
      prisma.deliveryAddress.update({
        where: { id },
        data: { isDefault: true },
      }),
    ]);
  }

  // -------------------------------------------------
  // SOFT DELETE
  // -------------------------------------------------
  static async delete(id: string, userId: string): Promise<void> {
    const address = await prisma.deliveryAddress.findFirst({
      where: { id, userId, deletedAt: null },
    });

    if (!address) throw new AppError("Address not found", 404);

    await prisma.deliveryAddress.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
