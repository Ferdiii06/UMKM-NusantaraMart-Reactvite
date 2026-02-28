// Tailwind menyediakan semua styling yang diperlukan

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-12 px-6 md:px-12">
            {/* Grid Configuration: 
                - grid-cols-1 (HP)
                - sm:grid-cols-2 (Tablet)
                - lg:grid-cols-4 (Laptop) 
            */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
                
                {/* Section 1: About */}
                <div>
                    <h3 className="text-lg font-bold mb-5 opacity-70 border-b border-gray-700 pb-2 w-fit">
                        About NusantaraMart
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-300">
                        <li>Marketplace Produk Lokal</li>
                        <li>UMKM Terbaik di Kota Sidoarjo</li>
                        <li>Sidoarjo - Indonesia</li>
                    </ul>
                </div>

                {/* Section 2: Account */}
                <div>
                    <h3 className="text-lg font-bold mb-5 opacity-70 border-b border-gray-700 pb-2 w-fit">
                        Account
                    </h3>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" className="hover:text-green-400 transition-colors">Benefit</a></li>
                        <li><a href="#" className="hover:text-green-400 transition-colors">Daftar Member</a></li>
                        <li><a href="#" className="hover:text-green-400 transition-colors">Kriteria Umum</a></li>
                        <li><a href="#" className="hover:text-green-400 transition-colors">Nikmati bonus afiliasi</a></li>
                    </ul>
                </div>

                {/* Section 3: Links */}
                <div>
                    <h3 className="text-lg font-bold mb-5 opacity-70 border-b border-gray-700 pb-2 w-fit">
                        Links
                    </h3>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" className="hover:text-green-400 transition-colors">Nusantara Mart Sidoarjo</a></li>
                        <li><a href="#" className="hover:text-green-400 transition-colors">Lapak Diskon</a></li>
                        <li><a href="#" className="hover:text-green-400 transition-colors">NDP</a></li>
                        <li><a href="#" className="hover:text-green-400 transition-colors">MC</a></li>
                    </ul>
                </div>

                {/* Section 4: Contact Address */}
                <div>
                    <h3 className="text-lg font-bold mb-5 opacity-70 border-b border-gray-700 pb-2 w-fit">
                        Contact Address
                    </h3>
                    <div className="text-sm space-y-4 text-gray-300">
                        <p>
                            <span className="font-bold block text-white">Nusantara Mart</span>
                            Jalan Raya Suko Sidoarjo <br /> ID : 123456
                        </p>
                        <p className="flex flex-col">
                            <span className="opacity-60">Email:</span>
                            <a href="mailto:NusaMart@gmail.com" className="hover:text-green-400">NusaMart@gmail.com</a>
                        </p>
                        <p className="flex flex-col">
                            <span className="opacity-60">Phone:</span>
                            <a href="tel:0811000000" className="hover:text-green-400">0811-XXXX-XXXX</a>
                        </p>
                    </div>
                </div>

            </div>

            {/* Bottom Copyright Area */}
            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-700 text-center text-xs text-gray-500">
                <p>&copy; {new Date().getFullYear()} Nusantara Mart Sidoarjo. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;