import { Asset } from "../../Enums";

export interface ProductAssets {
  product_id: string;
  assets: {
    id: string;
    url: string;
    asset_type: Asset
  }[];
}
