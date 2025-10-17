import { Asset } from "../../Enums";

export interface ProductAssets {
  product_id: string;
  assets: {
    id: string;
    url: string;
    s3_key: string;
    asset_type: string | Asset;
  }[];
}
