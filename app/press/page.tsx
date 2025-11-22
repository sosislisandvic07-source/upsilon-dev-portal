// src/app/press/page.tsx
import Link from 'next/link';

const PRIMARY_COLOR = '#4F46E5'; // Indigo 600

export default function PressKitPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-300 font-sans antialiased pt-20">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
                <h1 className="text-5xl font-extrabold text-white mb-4 border-b border-indigo-500 pb-2">
                    Basın Odası (Press Kit)
                </h1>
                <p className="text-xl text-gray-400 mb-12 max-w-3xl">
                    Upsilon Dev Studio'nun resmi medya varlıklarına, marka kimliğine ve en son basın bültenlerine buradan ulaşabilirsiniz.
                </p>

                {/* MARKA KİMLİĞİ VE LOGOLAR */}
                <div className="mb-12 border border-gray-700 p-8 rounded-xl bg-gray-800">
                    <h2 className="text-3xl font-bold text-indigo-400 mb-6">Marka Kimliği Varlıkları</h2>
                    <p className="text-gray-400 mb-4">Logo, tipografi ve renk kodlarını içeren tam basın kitini indirin.</p>
                    
                    <a href="/assets/press_kit.zip" download
                       className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition duration-200 inline-block">
                        Komple Press Kit İndir (ZIP)
                    </a>

                    <div className="mt-8 grid md:grid-cols-3 gap-6">
                        {/* Renk Kodu Örnekleri */}
                        <div className="p-4 rounded-lg bg-gray-700">
                            <h3 className="font-semibold text-white mb-2">Ana Vurgu Rengi</h3>
                            <div style={{ backgroundColor: PRIMARY_COLOR }} className="h-12 rounded mb-2"></div>
                            <p className="text-sm font-mono text-indigo-400">#4F46E5 (Indigo 600)</p>
                        </div>
                        <div className="p-4 rounded-lg bg-gray-700">
                            <h3 className="font-semibold text-white mb-2">Arka Plan</h3>
                            <div style={{ backgroundColor: '#111827' }} className="h-12 rounded mb-2"></div>
                            <p className="text-sm font-mono text-gray-400">#111827 (Gray 900)</p>
                        </div>
                    </div>
                </div>

                {/* HABERLER VE BÜLTENLER */}
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">Son Basın Bültenleri</h2>
                    
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-800 rounded-lg flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-white">Project Nova Alpha Test Başarısı</h3>
                                <p className="text-sm text-gray-500">Yayın Tarihi: 20 Kasım 2025</p>
                            </div>
                            <a href="#" className="text-indigo-400 hover:underline">
                                Bülteni Oku →
                            </a>
                        </div>
                         <div className="p-4 bg-gray-800 rounded-lg flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-white">Roblox Geliştirici Ortaklığı Duyurusu</h3>
                                <p className="text-sm text-gray-500">Yayın Tarihi: 5 Eylül 2025</p>
                            </div>
                            <a href="#" className="text-indigo-400 hover:underline">
                                Bülteni Oku →
                            </a>
                        </div>
                    </div>
                </div>

            </main>
            <footer className="py-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                © 2025 Upsilon Dev Studio. Tüm Hakları Saklıdır.
            </footer>
        </div>
    );
}