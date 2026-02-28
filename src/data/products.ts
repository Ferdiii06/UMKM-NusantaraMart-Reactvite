export type Product = {
  id: number;
  name: string;
  weight: string;
  price: number;
  image: string;
};

export const productsData: Product[] = [
  {
    id: 1,
    name: "Frozen Pratha",
    weight: "250 gram",
    price: 21.000,
    image: "https://i.pinimg.com/736x/19/c1/81/19c181befe00e43a6f0e3bc27569ec5b.jpg",
  },
  {
    id: 2,
    name: "Wortel",
    weight: "500 gram",
    price: 3.000,
    image: "https://i.pinimg.com/736x/9c/a1/7b/9ca17bb3d143055226e6ceeac70b255b.jpg",
  },
  {
    id: 3,
    name: "beras Maknyuss",
    weight: "5 kg",
    price: 78.000,
    image: "https://i.pinimg.com/736x/6a/81/31/6a81314e632ad1ccb12475ddeadde42e.jpg",
  },
  {
    id: 4,
    name: "Bundle Pack Sop",
    weight: "Wortel, Sawi, Kentang, Bawang",
    price: 8.000,
    image: "https://i.pinimg.com/1200x/d9/b3/cf/d9b3cf3ff9b5484d4676d2ef837203ae.jpg",
  },
  {
    id: 5,
    name: "Lafonte Spaghetti",
    weight: "280 gram",
    price: 9.800,
    image: "https://i.pinimg.com/1200x/ad/1d/f9/ad1df9ad0d45e2a664ad809fd1a17288.jpg",
  },
  {
    id: 6,
    name: "Minyak Bimoli",
    weight: "2 liter",
    price: 35.000,
    image: "https://i.pinimg.com/1200x/b1/ce/60/b1ce602a8777fcee57f81e7234a70e2d.jpg",
  },
  {
    id: 7,
    name: "Pepsodent",
    weight: "200 gram",
    price: 8.000,
    image: "https://i.pinimg.com/736x/ea/d1/36/ead136c8f3dbadf892652a2ffdedf355.jpg",
  },
  {
    id: 8,
    name: "Milk Life",
    weight: "1 liter",
    price: 5.000,
    image: "https://i.pinimg.com/736x/d5/67/35/d56735aabfd5438113f4903a66a8f5b7.jpg",
  }
];
