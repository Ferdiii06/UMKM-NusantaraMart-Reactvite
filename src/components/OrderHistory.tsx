import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import { FileDown, ArrowLeft, CheckCircle, Clock, ChevronDown } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import gsap from "gsap";

export default function OrderHistory() {
  const { orders } = useOrders();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  
  // Refs for each order card to capture for PDF
  const orderRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const detailsRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const formatRupiah = (price: number) => {
    return price.toLocaleString('id-ID');
  };

  const handleDownloadInvoice = async (orderId: string, orderNumber: string) => {
    const element = orderRefs.current[orderId];
    if (!element) return;
    
    try {
      // Sembunyikan elemen yang tidak perlu masuk PDF (misal: tombol download itu sendiri)
      const downloadBtn = element.querySelector('.download-btn') as HTMLElement;
      if (downloadBtn) downloadBtn.style.display = 'none';

      const canvas = await html2canvas(element, { scale: 2 });
      
      // Kembalikan tombol
      if (downloadBtn) downloadBtn.style.display = 'flex';

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Invoice_${orderNumber}.pdf`);
    } catch (error) {
      console.error("Gagal membuat PDF", error);
      alert("Terjadi kesalahan saat mengunduh invoice.");
    }
  };

  const toggleOrderDetails = (orderId: string) => {
    const isExpanding = expandedOrderId !== orderId;
    
    // Collapse currently expanded if there is one
    if (expandedOrderId && expandedOrderId !== orderId) {
      const currentRef = detailsRefs.current[expandedOrderId];
      if (currentRef) {
        gsap.to(currentRef, { height: 0, opacity: 0, duration: 0.3, ease: "power2.inOut" });
      }
    }

    const targetRef = detailsRefs.current[orderId];
    if (targetRef) {
      if (isExpanding) {
        setExpandedOrderId(orderId);
        gsap.fromTo(targetRef, 
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" }
        );
      } else {
        gsap.to(targetRef, { 
          height: 0, opacity: 0, duration: 0.3, ease: "power2.inOut",
          onComplete: () => setExpandedOrderId(null)
        });
      }
    } else {
      setExpandedOrderId(isExpanding ? orderId : null);
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Belum Ada Pesanan</h2>
          <p className="text-gray-600 mb-6">Anda belum pernah melakukan pemesanan.</p>
          <Link
            to="/"
            className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium transition"
          >
            Mulai Belanja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-10">
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition">
            <ArrowLeft size={20} />
            <span className="font-medium">Kembali ke Beranda</span>
          </Link>
          <h2 className="text-2xl font-bold text-gray-800">Riwayat Pesanan</h2>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div 
              key={order.id} 
              ref={(el) => { orderRefs.current[order.id] = el; }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-4 mb-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    {new Date(order.date).toLocaleDateString('id-ID', {
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </p>
                  <p className="font-bold text-gray-800">{order.orderNumber}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {order.status === 'pending' ? <Clock size={16} /> : <CheckCircle size={16} />}
                    <span className="capitalize">{order.status === 'pending' ? 'Menunggu Pembayaran' : order.status}</span>
                  </div>
                  
                  <button
                    onClick={() => handleDownloadInvoice(order.id, order.orderNumber)}
                    className="download-btn flex items-center gap-2 bg-gray-800 hover:bg-black text-white px-4 py-1.5 rounded-full text-sm font-medium transition"
                  >
                    <FileDown size={16} />
                    <span className="hidden md:inline">Invoice PDF</span>
                  </button>

                  <button 
                    onClick={() => toggleOrderDetails(order.id)}
                    className="download-btn p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition"
                  >
                    <ChevronDown size={20} className={`transform transition-transform duration-300 ${expandedOrderId === order.id ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Accordion Content */}
              <div 
                ref={(el) => { detailsRefs.current[order.id] = el; }} 
                className="overflow-hidden"
                style={{ height: 0, opacity: 0 }}
              >
                <div className="pt-2">
                  <div className="space-y-3 mb-6">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover rounded-lg border border-gray-200" />
                      <div>
                        <p className="font-medium text-gray-800">{item.product.name}</p>
                        <p className="text-gray-500">{item.quantity} x Rp {formatRupiah(item.price)}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-800">
                      Rp {formatRupiah(item.quantity * item.price)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="space-y-2 text-sm text-gray-600 mb-4 border-b border-gray-200 pb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>Rp {formatRupiah(order.subtotal)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Diskon ({order.promoCode})</span>
                      <span>- Rp {formatRupiah(order.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Ongkos Kirim</span>
                    <span>Rp {formatRupiah(order.shippingCost)}</span>
                  </div>
                  {order.tax && (
                    <div className="flex justify-between">
                      <span>Pajak (11%)</span>
                      <span>Rp {formatRupiah(order.tax)}</span>
                    </div>
                  )}
                  {order.serviceFee && (
                    <div className="flex justify-between">
                      <span>Biaya Layanan</span>
                      <span>Rp {formatRupiah(order.serviceFee)}</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-800 text-lg">Total Pembayaran</span>
                  <span className="font-bold text-green-600 text-xl">Rp {formatRupiah(order.total)}</span>
                </div>
                <div className="mt-2 text-sm text-gray-500 text-right">
                  Metode: <span className="uppercase font-semibold">{order.paymentMethod}</span>
                </div>
              </div>
              
              <div className="mt-4 text-sm">
                <p className="font-semibold text-gray-800 mb-1">Dikirim ke:</p>
                <p className="text-gray-600">{order.shippingAddress.name} ({order.shippingAddress.phone})</p>
                <p className="text-gray-600">{order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}</p>
              </div>

                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
