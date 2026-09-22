export const categories = [
  {
    id: 'home-living',
    name: 'Home & Living',
    tagline: 'Furniture, decor & everyday comfort',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
  },
  {
    id: 'electronics',
    name: 'Electronics',
    tagline: 'Audio, gadgets & smart devices',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80',
  },
  {
    id: 'fashion',
    name: 'Fashion',
    tagline: 'Apparel, footwear & accessories',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
  },
  {
    id: 'kitchen',
    name: 'Kitchen & Dining',
    tagline: 'Cookware, appliances & tableware',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80',
  },
  {
    id: 'beauty',
    name: 'Beauty & Personal Care',
    tagline: 'Skincare, grooming & wellness',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80',
  },
  {
    id: 'outdoor',
    name: 'Outdoor & Sport',
    tagline: 'Gear for the world outside',
    image: 'https://images.unsplash.com/photo-1533561797500-4fad4750814e?w=800&q=80',
  },
];

export function getCategory(id) {
  return categories.find((c) => c.id === id);
}
