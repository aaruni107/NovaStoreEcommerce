export interface Product {
  id: number;

  name: string;
  slug: string;
  description?: string;

  brand: string;
  category: string;

  image: string;
  images?: string[];

  price: number;
  salePrice?: number | null;

  rating: number;
  reviewCount: number;

  stock?: number;

  badge?: "New" | "Sale" | "Hot";

  featured?: boolean;
  page?: number;
  instock?: string;
  reviews?: Review[];
}
export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}
