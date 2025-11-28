export interface DeliveryAddressResponse {
  id: string;
  userId: string;

  fullName: string;
  phone: string;

  addressLine1: string;
  addressLine2?: string | null;

  city: string;
  state: string;
  pincode: string;
  country: string;

  landmark?: string | null;
  isDefault: boolean;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
