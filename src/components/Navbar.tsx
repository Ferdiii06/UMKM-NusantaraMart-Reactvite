import { useCart } from '../context/useCart';
import { useState } from 'react';
import { productsData } from '../data/products';

function Navbar() {
    const { totalCount, cartItems, removeFromCart } = useCart();
    const [showCart, setShowCart] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState<typeof productsData>([]);
    const [showSearchResults, setShowSearchResults] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchInput.trim()) {
            const results = productsData.filter(product =>
                product.name.toLowerCase().includes(searchInput.toLowerCase())
            );
            setSearchResults(results);
            setShowSearchResults(true);
        } else {
            setSearchResults([]);
            setShowSearchResults(false);
        }
    };

    return (
        <>
            {/* Navbar Utama: Logo, Search, Cart */}
            <div className='flex flex-col md:flex-row items-center justify-between p-4 bg-gray-100 gap-4 relative z-50'>
                <h1 className='text-2xl md:text-3xl font-bold text-green-600'>NusaMart</h1>
                
                <header className='flex items-center w-full md:w-auto gap-3 justify-between md:justify-end'>
                    {/* Pencarian dengan Dropdown Hasil */}
                    <div className="flex-1 md:flex-none relative">
                        <form className="flex items-center gap-2" onSubmit={handleSearch}>
                            <input 
                                className="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-green-500 transition-all" 
                                type="search" 
                                placeholder="Cari produk..." 
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                onFocus={() => searchInput && setShowSearchResults(true)}
                            />
                        </form>

                        {/* HASIL PENCARIAN (Menyelesaikan Error "Unused Variable") */}
                        {showSearchResults && (
                            <div className="absolute top-full left-0 w-full md:w-80 bg-white shadow-xl rounded-lg mt-2 z-[60] max-h-80 overflow-y-auto border border-gray-100">
                                {searchResults.length > 0 ? (
                                    <ul className="divide-y divide-gray-100">
                                        {searchResults.map((product) => (
                                            <li 
                                                key={product.id} 
                                                className="p-3 hover:bg-green-50 cursor-pointer flex items-center gap-3"
                                                onClick={() => setShowSearchResults(false)}
                                            >
                                                <img src={product.image} alt={product.name} className="w-10 h-10 object-contain" />
                                                <div>
                                                    <p className="text-sm font-semibold">{product.name}</p>
                                                    <p className="text-xs text-green-600 font-bold">Rp {product.price.toLocaleString('id-ID')}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="p-4 text-center text-gray-500 text-sm">Produk tidak ditemukan</div>
                                )}
                                <button 
                                    className="w-full py-2 bg-gray-50 text-xs text-gray-400 border-t hover:text-red-500"
                                    onClick={() => setShowSearchResults(false)}
                                >
                                    Tutup
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Tombol Keranjang */}
                    <div className="relative">
                        <button 
                            onClick={() => setShowCart(!showCart)} 
                            className="p-2 hover:bg-gray-200 rounded-full transition relative"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13l-1.5-7M16 21a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {totalCount > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                    {totalCount}
                                </span>
                            )}
                        </button>

                        {/* Dropdown Keranjang */}
                        {showCart && (
                            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white shadow-2xl rounded-xl p-4 z-[70] border border-gray-100">
                                <div className="flex justify-between items-center mb-4 border-b pb-2">
                                    <h3 className="text-lg font-bold">Keranjang</h3>
                                    <button onClick={() => setShowCart(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
                                </div>
                                {cartItems.length === 0 ? (
                                    <p className="text-gray-500 text-sm py-4 text-center">Kosong</p>
                                ) : (
                                    <div className="max-h-60 overflow-y-auto mb-4">
                                        <ul className="space-y-3">
                                            {cartItems.map((item) => (
                                                <li key={item.product.id} className="flex justify-between items-center text-sm gap-2">
                                                    <span className="truncate flex-1 font-medium">{item.product.name} (x{item.quantity})</span>
                                                    <button onClick={() => removeFromCart(item.product.id)} className="text-red-500 text-xs">Hapus</button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {cartItems.length > 0 && (
                                    <button className="w-full bg-green-600 text-white py-2.5 rounded-lg font-bold hover:bg-green-700 transition">
                                        Checkout
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </header>
            </div>

            {/* Navigasi Link (Scrollable di Mobile) */}
            <nav className="w-full bg-white border-b border-gray-200 overflow-x-auto whitespace-nowrap scrollbar-hide sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-start md:justify-center items-center h-14 space-x-8 md:space-x-12">
                        {['Beranda', 'Kategori', 'Produk', 'Promo', 'Kontak'].map((item) => (
                            <a 
                                key={item}
                                href={item === 'Beranda' ? '/' : `/${item}`} 
                                className="text-gray-800 font-semibold text-sm hover:text-green-600 transition-colors py-4 border-b-2 border-transparent hover:border-green-600"
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;