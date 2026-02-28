import React from 'react';

export default function Contact() {
  const [form, setForm] = React.useState({ name: '', email: '', address: '', message: '' });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { name, email, address, message } = form;
    const subject = encodeURIComponent(`Permintaan Pengiriman dari ${name}`);
    let bodyText = `Nama: ${name}\nAlamat: ${address}\nEmail: ${email}\n\n`;
    bodyText += message;
    const body = encodeURIComponent(bodyText);
    // send to support and CC the customer email so they get a copy
    window.location.href = `mailto:support@nusantara-mart.id?cc=${encodeURIComponent(email)}&subject=${subject}&body=${body}`;
  }

  return (
    <section className="w-full bg-white py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Pengiriman</h2>
        <p className="text-gray-600 mb-8">
          Kami siap membantu Anda! Silakan hubungi kami untuk pertanyaan atau informasi
          pengiriman.
        </p>
        <div className="grid grid-cols-1  gap-8">
          <div className='flex flex-col items-center text-center'>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Info Pengiriman</h3>
            <p className="text-gray-600">Kami melayani pengiriman di seluruh Indonesia.</p>
            <ul className="text-gray-600 list-disc list-inside mt-2">
              <li>Waktu pengiriman: 3-5 hari kerja</li>
              <li>Biaya tergantung jarak dan berat</li>
              <li>Tracking tersedia melalui email/telepon</li>
            </ul>
          </div>
        </div>

        {/* contact form with delivery address */}
        <form onSubmit={handleSubmit} className="mt-12 max-w-lg mx-auto text-left">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Pengiriman & Kontak</h3>
          <div className="flex flex-col gap-4">
            <input
              required
              type="text"
              placeholder="Nama"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="border p-3 rounded"
            />
            <input
              required
              type="email"
              placeholder="Email Anda"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="border p-3 rounded"
            />
            <input
              required
              type="text"
              placeholder="Alamat Pengiriman"
              value={form.address}
              onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
              className="border p-3 rounded"
            />
            <textarea
              placeholder="Pesan / Instruksi Tambahan"
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="border p-3 rounded h-32"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
            >
              Kirim Permintaan
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

