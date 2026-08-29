export type Product = {
  id: number;
  name: string;
  weight: string;
  price: number;
  image: string;
  description?: string;
  category: string; // Ubah dari opsional menjadi required (hapus tanda ?)
};

export const productsData: Product[] = [
  // FROZEN FOODS
  {
    id: 1,
    name: "Frozen Pratha",
    weight: "250 gram",
    price: 21000,
    image: "/flash1.svg",
    description: "Frozen pratha siap saji, praktis dan lezat.",
    category: "Frozen Food"
  },
  {
    id: 2,
    name: "Krispi Nugget Ayam",
    weight: "500 gram",
    price: 48000,
    image: "/flash2.svg",
    description: "Nugget ayam crispy, terbuat dari daging ayam pilihan.",
    category: "Frozen Food"
  },
  {
    id: 3,
    name: "Sosis Sapi Keju",
    weight: "250 gram",
    price: 50000,
    image: "/flash3.svg",
    description: "Sosis sapi berkualitas, siap masak untuk berbagai olahan.",
    category: "Frozen Food"
  },
  {
    id: 4,
    name: "Siomay Ayam",
    weight: "500 gram",
    price: 42000,
    image: "/flash4.svg",
    description: "Dimsum ayam dengan kulit tipis, siap kukus.",
    category: "Frozen Food"
  },
  {
    id: 5,
    name: "Kentang Goreng",
    weight: "1 kg",
    price: 32000,
    image: "https://i.pinimg.com/736x/8c/99/f6/8c99f61fa5a4d9aae48e6672a3b51828.jpg",
    description: "Kentang goreng beku, crispy dan lezat.",
    category: "Frozen Food"
  },
  {
    id: 6,
    name: "Bakso Sapi",
    weight: "500 gram",
    price: 30000,
    image: "https://i.pinimg.com/736x/46/7a/72/467a7215429ca76a4cd29e1bc9d5659c.jpg",
    description: "Bakso sapi kenyal, cocok untuk bakso kuah atau goreng.",
    category: "Frozen Food"
  },
  {
    id: 7,
    name: "Otak-Otak",
    weight: "250 gram",
    price: 20000,
    image: "https://i.pinimg.com/1200x/94/57/11/9457115f026fe6dd6f60fb9eda880cd0.jpg",
    description: "Otak-otak ikan, siap bakar atau goreng.",
    category: "Frozen Food"
  },
  {
    id: 8,
    name: "Pizza Mini",
    weight: "500 gram",
    price: 27000,
    image: "https://i.pinimg.com/736x/39/1f/c5/391fc59b91c242e176efb29d900d7ab0.jpg",
    description: "Pizza mini frozen, siap dipanggang untuk camilan lezat.",
    category: "Frozen Food"
  },
  {
    id: 9,
    name: "Cireng Isi",
    weight: "250 gram",
    price: 23000,
    image: "https://i.pinimg.com/1200x/3b/33/17/3b33179ebe7775b0f52548780736a15e.jpg",
    description: "Cireng isi ayam pedas, siap goreng.",
    category: "Frozen Food"
  },
  {
    id: 10,
    name: "Piscok",
    weight: "300 gram",
    price: 18000,
    image: "https://i.pinimg.com/1200x/8e/96/d6/8e96d65965b73e5122c15e4f74a7dc09.jpg",
    description: "Pisang cokelat frozen, siap goreng untuk camilan manis.",
    category: "Frozen Food"
  },

  // SAYURAN
  {
    id: 11,
    name: "Wortel",
    weight: "500 gram",
    price: 3000,
    image: "https://i.pinimg.com/736x/9c/a1/7b/9ca17bb3d143055226e6ceeac70b255b.jpg",
    description: "Wortel segar langsung dari petani. Kaya vitamin A dan serat.",
    category: "Sayuran"
  },
  {
    id: 12,
    name: "Kentang",
    weight: "1 kg",
    price: 12000,
    image: "https://i.pinimg.com/736x/1e/0a/a2/1e0aa218671b6e8f9c29648f9b729a28.jpg",
    description: "Kentang lokal berkualitas, cocok untuk berbagai masakan.",
    category: "Sayuran"
  },
  {
    id: 13,
    name: "Tomat",
    weight: "500 gram",
    price: 5000,
    image: "https://i.pinimg.com/control1/1200x/29/40/61/294061c8da24641b45df7c7f672faf32.jpg",
    description: "Tomat segar, cocok untuk sayur atau jus.",
    category: "Sayuran"
  },
  {
    id: 14,
    name: "Bawang Merah",
    weight: "250 gram",
    price: 8000,
    image: "https://i.pinimg.com/1200x/ca/c6/fe/cac6fecef55f0230ba45e8df9352c446.jpg",
    description: "Bawang merah segar, bumbu dapur wajib.",
    category: "Sayuran"
  },
  {
    id: 15,
    name: "Bawang Putih",
    weight: "250 gram",
    price: 9000,
    image: "https://i.pinimg.com/736x/e0/d4/af/e0d4af286c7e714be1c3df2b0ffb43c3.jpg",
    description: "Bawang putih kualitas terbaik untuk bumbu masakan.",
    category: "Sayuran"
  },
  {
    id: 16,
    name: "Cabai Merah",
    weight: "250 gram",
    price: 15000,
    image: "https://i.pinimg.com/1200x/82/b7/29/82b729fb22b9e2fd02a08d995c1ffbd7.jpg",
    description: "Cabai merah segar, pedasnya nampol.",
    category: "Sayuran"
  },
  {
    id: 17,
    name: "Bayam",
    weight: "200 gram",
    price: 2500,
    image: "https://i.pinimg.com/736x/86/78/c2/8678c2798bbba0dd966a369dc074a142.jpg",
    description: "Bayam segar, kaya zat besi untuk kesehatan.",
    category: "Sayuran"
  },
  {
    id: 18,
    name: "Kangkung",
    weight: "200 gram",
    price: 2500,
    image: "https://i.pinimg.com/736x/10/10/eb/1010eb02f235cab544776d9e73777bd3.jpg",
    description: "Kangkung segar, cocok untuk tumis.",
    category: "Sayuran"
  },
  {
    id: 19,
    name: "Brokoli",
    weight: "300 gram",
    price: 8000,
    image: "https://i.pinimg.com/736x/1f/b5/2b/1fb52b1cd5d1b28a9c934dfb39a6b50c.jpg",
    description: "Brokoli segar, kaya antioksidan.",
    category: "Sayuran"
  },
  {
    id: 20,
    name: "Kol",
    weight: "500 gram",
    price: 4000,
    image: "https://i.pinimg.com/736x/51/23/44/5123441660081d5ef55f9c4731ce5c93.jpg",
    description: "Kol segar, cocok untuk sayur sop atau lalapan.",
    category: "Sayuran"
  },

  // BERAS & SEMBAKO
  {
    id: 21,
    name: "Beras Maknyuss",
    weight: "5 kg",
    price: 78000,
    image: "https://i.pinimg.com/736x/6a/81/31/6a81314e632ad1ccb12475ddeadde42e.jpg",
    description: "Beras kualitas premium, pulen dan wangi.",
    category: "Beras"
  },
  {
    id: 22,
    name: "Beras Rojolele",
    weight: "5 kg",
    price: 75000,
    image: "https://i.pinimg.com/1200x/38/f2/b5/38f2b5ca429cdc8140c7f0eb328bfc17.jpg",
    description: "Beras rojolele asli, pulen dan enak.",
    category: "Beras"
  },
  {
    id: 23,
    name: "Minyak Goreng",
    weight: "2 liter",
    price: 35000,
    image: "https://i.pinimg.com/1200x/b1/ce/60/b1ce602a8777fcee57f81e7234a70e2d.jpg",
    description: "Minyak goreng berkualitas untuk memasak.",
    category: "Sembako"
  },
  {
    id: 24,
    name: "Gula Pasir",
    weight: "1 kg",
    price: 15000,
    image: "https://i.pinimg.com/736x/b6/31/ea/b631ea3c2e7d701f54edad1b6f421389.jpg",
    description: "Gula pasir putih, manis dan berkualitas.",
    category: "Sembako"
  },
  {
    id: 25,
    name: "Tepung Terigu",
    weight: "1 kg",
    price: 12000,
    image: "https://i.pinimg.com/736x/80/e1/e1/80e1e180bf7fe9ce5a08029c2cd6abc7.jpg",
    description: "Tepung terigu serbaguna untuk berbagai kebutuhan.",
    category: "Sembako"
  },
  {
    id: 26,
    name: "Telur Ayam",
    weight: "1 kg",
    price: 28000,
    image: "https://i.pinimg.com/736x/d1/d0/6d/d1d06d6fc1036c03ce2ec14b5e2e5019.jpg",
    description: "Telur ayam segar, protein berkualitas.",
    category: "Sembako"
  },
  {
    id: 27,
    name: "Kecap Manis",
    weight: "500 ml",
    price: 18000,
    image: "https://i.pinimg.com/1200x/3b/c3/05/3bc30503012a2742644e8fa42a5e7e77.jpg",
    description: "Kecap manis untuk bumbu masakan.",
    category: "Sembako"
  },
  {
    id: 28,
    name: "Saos Sambal",
    weight: "500 ml",
    price: 15000,
    image: "https://i.pinimg.com/736x/19/cf/13/19cf137e053b4ef4aef5571a0b302042.jpg",
    description: "Saos sambal pedas mantap.",
    category: "Sembako"
  },
  {
    id: 29,
    name: "Mie Instan",
    weight: "1 dus",
    price: 45000,
    image: "https://i.pinimg.com/1200x/78/89/2c/78892cf447c5078c885aaccf234b3ec3.jpg",
    description: "Mie instan favorit keluarga.",
    category: "Sembako"
  },
  {
    id: 30,
    name: "Kopi Bubuk",
    weight: "200 gram",
    price: 25000,
    image: "https://i.pinimg.com/736x/a9/9e/c8/a99ec8cb4e1cd3a5a85152bcd0e09c65.jpg",
    description: "Kopi bubuk asli, aroma khas.",
    category: "Minuman"
  },

  // MINUMAN
  {
    id: 31,
    name: "Susu UHT",
    weight: "1 liter",
    price: 15000,
    image: "https://i.pinimg.com/736x/d5/67/35/d56735aabfd5438113f4903a66a8f5b7.jpg",
    description: "Susu UHT segar, kaya kalsium.",
    category: "Minuman"
  },
  {
    id: 32,
    name: "Teh Botol",
    weight: "500 ml",
    price: 5000,
    image: "https://i.pinimg.com/736x/28/23/df/2823dffed0678e426c678fbc42409687.jpg",
    description: "Teh botol siap minum, segar.",
    category: "Minuman"
  },
  {
    id: 33,
    name: "Air Mineral",
    weight: "600 ml",
    price: 3000,
    image: "https://i.pinimg.com/736x/f7/15/62/f71562e1099d6d8a7fa5ba1bcfb6f587.jpg",
    description: "Air mineral murni, segar.",
    category: "Minuman"
  },
  {
    id: 34,
    name: "Jus Jeruk",
    weight: "250 ml",
    price: 8000,
    image: "https://i.pinimg.com/736x/fd/37/bb/fd37bb31b3aecdc433b6267e0b71a627.jpg",
    description: "Jus jeruk asli, vitamin C.",
    category: "Minuman"
  },
  {
    id: 35,
    name: "Kopi Sachet",
    weight: "1 dus (20 pcs)",
    price: 20000,
    image: "https://i.pinimg.com/736x/be/95/f2/be95f248ab662d1a2c2523944a9d10fa.jpg",
    description: "Kopi sachet praktis, 20 pcs.",
    category: "Minuman"
  },

  // SNACKS
  {
    id: 36,
    name: "Keripik Singkong",
    weight: "200 gram",
    price: 12000,
    image: "https://i.pinimg.com/1200x/94/7c/77/947c77c8304048e5f825b6220fcbc28f.jpg",
    description: "Keripik singkong gurih, renyah.",
    category: "Snacks"
  },
  {
    id: 37,
    name: "Silverqueen Cokelat",
    weight: "100 gram",
    price: 15000,
    image: "https://i.pinimg.com/1200x/10/6a/e7/106ae78f8460fecbe2c34ffef71d4246.jpg",
    description: "Cokelat batang manis, lezat.",
    category: "Snacks"
  },
  {
    id: 38,
    name: "Biskuit Roma Sari Gandum",
    weight: "250 gram",
    price: 10000,
    image: "https://i.pinimg.com/1200x/d6/71/a1/d671a106858bfe17d8058fb6c22479ab.jpg",
    description: "Biskuit renyah, cocok untuk camilan.",
    category: "Snacks"
  },
  {
    id: 39,
    name: "Kerupuk Udang",
    weight: "200 gram",
    price: 8000,
    image: "https://i.pinimg.com/1200x/0d/66/f4/0d66f49e2f1e2c27b5820c3e99bee69a.jpg",
    description: "Kerupuk udang gurih, renyah.",
    category: "Snacks"
  },
  {
    id: 40,
    name: "Permen Karet",
    weight: "100 gram",
    price: 5000,
    image: "https://i.pinimg.com/736x/bf/87/29/bf87290575d630dd7b0eaff2a2ca085e.jpg",
    description: "Permen aneka rasa, manis segar.",
    category: "Snacks"
  },
  {
    id: 41,
    name: "Kacang Atom",
    weight: "200 gram",
    price: 10000,
    image: "https://i.pinimg.com/736x/17/b5/ec/17b5ec4f6992166e20507fb3f636665e.jpg",
    description: "Kacang atom gurih, renyah.",
    category: "Snacks"
  },
  {
    id: 42,
    name: "Wafer Cokelat",
    weight: "150 gram",
    price: 12000,
    image: "https://i.pinimg.com/1200x/f7/e5/45/f7e545784b78aef4c7c94daeb762390f.jpg",
    description: "Wafer cokelat crispy, lezat.",
    category: "Snacks"
  },

  // KEBUTUHAN RUMAH
  {
    id: 43,
    name: "Sabun Mandi",
    weight: "100 gram",
    price: 5000,
    image: "https://i.pinimg.com/736x/9e/60/ca/9e60ca31ea54ec1c575143fe85a00651.jpg",
    description: "Sabun mandi segar, wangi tahan lama.",
    category: "Kebutuhan Rumah"
  },
  {
    id: 44,
    name: "Pasta Gigi",
    weight: "200 gram",
    price: 8000,
    image: "https://i.pinimg.com/1200x/7e/52/55/7e5255ab2ca67531c6fa900669a2272f.jpg",
    description: "Pasta gigi dengan formula aktif melindungi gigi.",
    category: "Kebutuhan Rumah"
  },
  {
    id: 45,
    name: "Sikat Gigi",
    weight: "1 pcs",
    price: 5000,
    image: "https://i.pinimg.com/1200x/a7/a9/ac/a7a9ac7a9077f56f07512c87fa6ec94d.jpg",
    description: "Sikat gigi lembut, nyaman di mulut.",
    category: "Kebutuhan Rumah"
  },
  {
    id: 46,
    name: "Shampo",
    weight: "100 ml",
    price: 7000,
    image: "https://i.pinimg.com/736x/7d/c9/1e/7dc91ebd6f18a22721256dc83a3e266d.jpg",
    description: "Shampo dengan vitamin untuk rambut sehat.",
    category: "Kebutuhan Rumah"
  },
  {
    id: 47,
    name: "Sabun Cuci Piring",
    weight: "500 ml",
    price: 10000,
    image: "https://i.pinimg.com/736x/ed/7c/99/ed7c999af0de5b7a07a0c072f06e60bc.jpg",
    description: "Sabun cuci piring, bersihkan lemak.",
    category: "Kebutuhan Rumah"
  },
  {
    id: 48,
    name: "Deterjen",
    weight: "500 gram",
    price: 15000,
    image: "https://i.pinimg.com/736x/e8/42/87/e84287b225075290d41cd533020e8ed9.jpg",
    description: "Deterjen bubuk, wangi tahan lama.",
    category: "Kebutuhan Rumah"
  },
  {
    id: 49,
    name: "Pembersih Lantai",
    weight: "500 ml",
    price: 12000,
    image: "https://i.pinimg.com/736x/55/94/1a/55941a465747f99f5346ba6da2c15e1a.jpg",
    description: "Pembersih lantai, wangi dan bersih.",
    category: "Kebutuhan Rumah"
  },
  {
    id: 50,
    name: "Pengharum Ruangan",
    weight: "200 ml",
    price: 15000,
    image: "https://i.pinimg.com/736x/d2/f8/87/d2f8878c07ea9b46e3ae635ad6711cd9.jpg",
    description: "Pengharum ruangan, wangi tahan lama.",
    category: "Kebutuhan Rumah"
  }
];

// Fungsi helper untuk mendapatkan semua kategori yang unik
export const getAllCategories = (): string[] => {
  const categories = productsData.map(product => product.category);
  return [...new Set(categories)];
};

// Fungsi untuk mendapatkan produk berdasarkan kategori
export const getProductsByCategory = (category: string): Product[] => {
  return productsData.filter(product => product.category === category);
};