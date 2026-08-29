import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";
import { useOrders } from "../context/OrderContext"; // Import useOrders
import { 
  ArrowLeft, 
  QrCode, 
  Building, 
  CheckCircle,
  Copy,
  Clock,
  AlertCircle,
  Tag,
  X
} from "lucide-react";
import { validatePromoCode, calculateDiscount } from "../context/promo";
import type { Promo } from "../context/promo";

// Tipe untuk metode pembayaran
type PaymentMethod = "qris" | "bca" | "bri" | "mandiri" | "bni";

// Data bank
const bankData = {
  bca: {
    name: "Bank BCA",
    accountNumber: "1234567890",
    accountName: "PT Nusantara Mart",
  },
  bri: {
    name: "Bank BRI",
    accountNumber: "0987654321",
    accountName: "PT Nusantara Mart",
  },
  mandiri: {
    name: "Bank Mandiri",
    accountNumber: "1122334455",
    accountName: "PT Nusantara Mart",
  },
  bni: {
    name: "Bank BNI",
    accountNumber: "5544332211",
    accountName: "PT Nusantara Mart",
  }
};

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useCart();
  const { addOrder } = useOrders(); // Gunakan useOrders
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("qris");
  const [step, setStep] = useState<"payment" | "confirmation">("payment");
  const [copied, setCopied] = useState<string | null>(null);
  
  // State untuk promo
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<Promo | null>(null);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");
  const [showPromoInput, setShowPromoInput] = useState(false);

  const [selectedAddressId, setSelectedAddressId] = useState<string>("home");
  const checkoutRef = useRef<HTMLDivElement>(null);

  // Alamat tersimpan
  const savedAddresses = [
    { id: 'home', label: 'Rumah', name: 'Ferdi', phone: '08123456789', address: 'Jl. Kemerdekaan No. 45', city: 'Sidoarjo', postalCode: '61256', notes: 'Pagar warna putih' },
    { id: 'office', label: 'Kantor', name: 'Ferdi', phone: '08123456789', address: 'Gedung Tech Lt. 3, Jl. Pahlawan', city: 'Surabaya', postalCode: '60111', notes: 'Titip di satpam' }
  ];

  // State untuk form
  const [formData, setFormData] = useState({
    name: savedAddresses[0].name,
    email: "ferdi@example.com",
    phone: savedAddresses[0].phone,
    address: savedAddresses[0].address,
    city: savedAddresses[0].city,
    postalCode: savedAddresses[0].postalCode,
    notes: savedAddresses[0].notes
  });

  // Efek GSAP saat ganti step
  useEffect(() => {
    if (checkoutRef.current) {
      gsap.fromTo(checkoutRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [step]);

  // Format harga
  const formatRupiah = (price: number) => {
    return price.toLocaleString('id-ID');
  };

  // Hitung diskon jika ada promo
  const discount = appliedPromo ? calculateDiscount(appliedPromo, totalPrice) : 0;
  
  // Hitung total
  const shippingCost = 15000;
  const serviceFee = 2000;
  const totalAfterDiscount = totalPrice - discount;
  const tax = Math.round(totalAfterDiscount * 0.11); // PPN 11%
  const totalPayment = totalAfterDiscount + shippingCost + serviceFee + tax;

  // Handle apply promo
  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      setPromoError("Masukkan kode promo");
      return;
    }

    const promo = validatePromoCode(promoCode.toUpperCase(), totalPrice);
    
    if (promo) {
      setAppliedPromo(promo);
      setPromoSuccess(`Promo ${promo.code} berhasil diterapkan! Anda hemat Rp ${formatRupiah(calculateDiscount(promo, totalPrice))}`);
      setPromoError("");
      setPromoCode("");
      setShowPromoInput(false);
      
      // Hilangkan notifikasi setelah 3 detik
      setTimeout(() => setPromoSuccess(""), 3000);
    } else {
      setPromoError("Kode promo tidak valid atau tidak memenuhi syarat");
      setAppliedPromo(null);
    }
  };

  // Handle remove promo
  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoSuccess("Promo dibatalkan");
    setTimeout(() => setPromoSuccess(""), 3000);
  };

  // Copy ke clipboard
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  // Handle input form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validasi form
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.postalCode) {
      alert("Harap isi semua field yang wajib diisi");
      return;
    }
    setStep("confirmation");
  };

  // Handle payment complete - SIMPAN ORDER KE HISTORY
  const handlePaymentComplete = () => {
    // Buat order items dari cart
    const orderItems = cartItems.map(item => ({
      product: item.product,
      quantity: item.quantity,
      price: item.product.price
    }));

    // Simpan order ke history
    addOrder({
      items: orderItems,
      subtotal: totalPrice,
      discount: discount,
      shippingCost: shippingCost,
      tax: tax,
      serviceFee: serviceFee,
      total: totalPayment,
      promoCode: appliedPromo?.code,
      paymentMethod: paymentMethod,
      shippingAddress: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        notes: formData.notes
      }
    });

    // Tampilkan pesan sukses
    alert("Pembayaran berhasil! Pesanan Anda telah disimpan di history.");
    
    // Kosongkan keranjang
    clearCart();
    
    // Navigasi ke halaman history
    navigate("/order-history");
  };

  // Jika keranjang kosong
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Keranjang Belanja Kosong</h2>
          <p className="text-gray-600 mb-6">Silahkan tambahkan produk terlebih dahulu</p>
          <button
            onClick={() => navigate("/")}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium transition"
          >
            Kembali Berbelanja
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Tombol Kembali */}
        <button
          onClick={() => step === "payment" ? navigate(-1) : setStep("payment")}
          className="flex items-center gap-2 text-gray-600 hover:text-green-600 mb-6 transition"
        >
          <ArrowLeft size={20} />
          <span className="text-sm md:text-base">
            {step === "payment" ? "Kembali ke Keranjang" : "Kembali ke Pembayaran"}
          </span>
        </button>

        {/* Progress Step */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === "payment" ? "bg-green-500 text-white" : "bg-green-100 text-green-600"
            }`}>
              1
            </div>
            <div className={`w-20 h-1 ${
              step === "confirmation" ? "bg-green-500" : "bg-gray-200"
            }`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === "confirmation" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
            }`}>
              2
            </div>
          </div>
          <div className="ml-4 flex gap-8">
            <span className={step === "payment" ? "text-green-600 font-semibold" : "text-gray-400"}>
              Pembayaran
            </span>
            <span className={step === "confirmation" ? "text-green-600 font-semibold" : "text-gray-400"}>
              Konfirmasi
            </span>
          </div>
        </div>

        {/* Notifikasi Promo */}
        {promoSuccess && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-2">
            <CheckCircle size={18} className="text-green-600" />
            <span className="text-sm">{promoSuccess}</span>
          </div>
        )}

        {step === "payment" ? (
          /* STEP 1: FORM DATA PENGIRIMAN */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" ref={checkoutRef}>
            {/* Form Data Diri */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Data Pengiriman</h2>
                
                {/* Selector Multi-Alamat */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Pilih Alamat Pengiriman</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {savedAddresses.map(addr => (
                      <div 
                        key={addr.id}
                        onClick={() => {
                          setSelectedAddressId(addr.id);
                          setFormData({...addr, email: formData.email});
                        }}
                        className={`p-3 border-2 rounded-xl cursor-pointer transition ${selectedAddressId === addr.id ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-sm">{addr.label}</span>
                          {selectedAddressId === addr.id && <CheckCircle size={16} className="text-green-500" />}
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-1">{addr.address}</p>
                      </div>
                    ))}
                    <div 
                        onClick={() => {
                          setSelectedAddressId('new');
                          setFormData({ name: "", email: formData.email, phone: "", address: "", city: "", postalCode: "", notes: "" });
                        }}
                        className={`p-3 border-2 border-dashed rounded-xl cursor-pointer flex flex-col items-center justify-center text-gray-500 hover:text-green-600 hover:border-green-300 transition ${selectedAddressId === 'new' ? 'border-green-500 text-green-600 bg-green-50' : 'border-gray-300'}`}
                      >
                        <span className="font-bold text-sm">+ Alamat Baru</span>
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                        placeholder="contoh@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nomor Telepon <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alamat Lengkap <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="address"
                      required
                      rows={3}
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                      placeholder="Masukkan alamat lengkap"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kota <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                        placeholder="Kota"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kode Pos <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                        placeholder="Kode Pos"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Catatan Tambahan
                    </label>
                    <textarea
                      name="notes"
                      rows={2}
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                      placeholder="Catatan untuk kurir (opsional)"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition mt-4"
                  >
                    Lanjutkan ke Pembayaran
                  </button>
                </form>
              </div>
            </div>

            {/* Ringkasan Belanja dengan Promo */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Ringkasan Belanja</h2>
                
                {/* Daftar Produk */}
                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.product.name} x{item.quantity}
                      </span>
                      <span className="font-medium">
                        Rp {formatRupiah(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bagian Promo */}
                <div className="border-t border-gray-100 pt-4 mb-4">
                  {!appliedPromo ? (
                    <>
                      {!showPromoInput ? (
                        <button
                          onClick={() => setShowPromoInput(true)}
                          className="flex items-center gap-2 text-green-600 hover:text-green-700 transition"
                        >
                          <Tag size={16} />
                          <span className="text-sm font-medium">Punya kode promo?</span>
                        </button>
                      ) : (
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Masukkan Kode Promo
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={promoCode}
                              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                              placeholder="Contoh: SAYUR20"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-500 uppercase"
                              autoFocus
                            />
                            <button
                              onClick={handleApplyPromo}
                              className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition whitespace-nowrap"
                            >
                              Gunakan
                            </button>
                            <button
                              onClick={() => setShowPromoInput(false)}
                              className="p-2 text-gray-400 hover:text-gray-600"
                            >
                              <X size={18} />
                            </button>
                          </div>
                          {promoError && (
                            <p className="text-xs text-red-500">{promoError}</p>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Tag size={16} className="text-green-600" />
                          <span className="font-semibold text-green-700 text-sm">
                            {appliedPromo.code}
                          </span>
                        </div>
                        <button
                          onClick={handleRemovePromo}
                          className="text-red-500 hover:text-red-700"
                          title="Batalkan promo"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-green-600">
                        {appliedPromo.discountType === "percentage" 
                          ? `Diskon ${appliedPromo.discountValue}%`
                          : `Diskon Rp ${appliedPromo.discountValue.toLocaleString('id-ID')}`
                        }
                      </p>
                      {appliedPromo.maxDiscount && (
                        <p className="text-xs text-gray-500 mt-1">
                          Maks. potongan Rp {appliedPromo.maxDiscount.toLocaleString('id-ID')}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Perhitungan Harga */}
                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">Rp {formatRupiah(totalPrice)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Diskon</span>
                      <span>- Rp {formatRupiah(discount)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ongkos Kirim</span>
                    <span className="font-medium">Rp {formatRupiah(shippingCost)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pajak (11%)</span>
                    <span className="font-medium">Rp {formatRupiah(tax)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Biaya Layanan</span>
                    <span className="font-medium">Rp {formatRupiah(serviceFee)}</span>
                  </div>
                  
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Total</span>
                    <span className="text-green-600">Rp {formatRupiah(totalPayment)}</span>
                  </div>
                </div>

                {/* Info Hemat jika ada diskon */}
                {discount > 0 && (
                  <div className="mt-4 p-2 bg-green-50 rounded-lg text-center">
                    <p className="text-xs text-green-700">
                      🎉 Anda hemat Rp {formatRupiah(discount)} dengan promo {appliedPromo?.code}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* STEP 2: PILIH METODE PEMBAYARAN */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" ref={checkoutRef}>
            {/* Metode Pembayaran */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Pilih Metode Pembayaran</h2>
                
                {/* QRIS */}
                <div 
                  className={`border-2 rounded-xl p-4 mb-4 cursor-pointer transition ${
                    paymentMethod === "qris" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-300"
                  }`} 
                  onClick={() => setPaymentMethod("qris")}
                >
                  <div className="flex items-center gap-3">
                    <QrCode className="text-green-600" size={24} />
                    <div className="flex-1">
                      <h3 className="font-semibold">QRIS</h3>
                      <p className="text-sm text-gray-500">Pembayaran via QRIS (semua aplikasi perbankan)</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      paymentMethod === "qris" ? "border-green-500 bg-green-500" : "border-gray-300"
                    }`}>
                      {paymentMethod === "qris" && <CheckCircle size={16} className="text-white" />}
                    </div>
                  </div>

                  {paymentMethod === "qris" && (
                    <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                      <div className="flex flex-col items-center">
                        <div className="w-48 h-48 bg-gray-200 mb-4 flex items-center justify-center">
                          <QrCode size={120} className="text-gray-600" />
                        </div>
                        <p className="text-sm text-gray-600 text-center">
                          Scan QR Code di atas menggunakan aplikasi perbankan Anda
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          Total pembayaran: Rp {formatRupiah(totalPayment)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bank Transfer */}
                {Object.entries(bankData).map(([key, bank]) => (
                  <div 
                    key={key}
                    className={`border-2 rounded-xl p-4 mb-4 cursor-pointer transition ${
                      paymentMethod === key ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-300"
                    }`}
                    onClick={() => setPaymentMethod(key as PaymentMethod)}
                  >
                    <div className="flex items-center gap-3">
                      <Building className="text-green-600" size={24} />
                      <div className="flex-1">
                        <h3 className="font-semibold">{bank.name}</h3>
                        <p className="text-sm text-gray-500">Transfer via {bank.name}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        paymentMethod === key ? "border-green-500 bg-green-500" : "border-gray-300"
                      }`}>
                        {paymentMethod === key && <CheckCircle size={16} className="text-white" />}
                      </div>
                    </div>

                    {paymentMethod === key && (
                      <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Bank</span>
                            <span className="font-semibold">{bank.name}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">No. Rekening</span>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{bank.accountNumber}</span>
                              <button
                                onClick={() => copyToClipboard(bank.accountNumber, key)}
                                className="p-1 hover:bg-gray-100 rounded"
                              >
                                <Copy size={16} className="text-gray-500" />
                              </button>
                            </div>
                          </div>
                          {copied === key && (
                            <p className="text-xs text-green-600">✓ Nomor rekening disalin</p>
                          )}
                          <div className="flex justify-between">
                            <span className="text-gray-600">Atas Nama</span>
                            <span className="font-semibold">{bank.accountName}</span>
                          </div>
                          <div className="mt-3 pt-3 border-t">
                            <p className="text-sm text-gray-600">
                              Total Pembayaran: <span className="font-bold text-green-600">Rp {formatRupiah(totalPayment)}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Tombol Konfirmasi */}
                <div className="mt-6 space-y-3">
                  <button
                    onClick={handlePaymentComplete}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition"
                  >
                    Konfirmasi Pembayaran
                  </button>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                    <Clock size={16} />
                    <span>Pembayaran akan diverifikasi maksimal 1x24 jam</span>
                  </div>

                  <div className="flex items-start gap-2 text-sm text-gray-500">
                    <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                    <span>
                      Pastikan Anda telah melakukan pembayaran sebelum mengkonfirmasi.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ringkasan Pesanan */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Ringkasan Pesanan</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>Rp {formatRupiah(totalPrice)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Diskon ({appliedPromo?.code})</span>
                      <span>- Rp {formatRupiah(discount)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Ongkir</span>
                    <span>Rp {formatRupiah(shippingCost)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Pajak</span>
                    <span>Rp {formatRupiah(tax)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Layanan</span>
                    <span>Rp {formatRupiah(serviceFee)}</span>
                  </div>
                  
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Total</span>
                    <span className="text-green-600">Rp {formatRupiah(totalPayment)}</span>
                  </div>
                </div>

                {/* Data Pengiriman */}
                <div className="border-t border-gray-100 pt-4">
                  <h3 className="font-semibold mb-2">Data Pengiriman</h3>
                  <p className="text-sm text-gray-600">{formData.name}</p>
                  <p className="text-sm text-gray-600">{formData.phone}</p>
                  <p className="text-sm text-gray-600">{formData.address}</p>
                  <p className="text-sm text-gray-600">{formData.city} {formData.postalCode}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}