// src/app/about/page.tsx
import Link from 'next/link';
import React from 'react';

const PRIMARY_COLOR_CLASS = 'text-indigo-400';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-300 font-sans antialiased pt-20">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
                <h1 className={`text-5xl font-extrabold text-white mb-4 ${PRIMARY_COLOR_CLASS}`}>
                    Kurumsal Kimlik: Roblox Dünyasının Mimarı
                </h1>
                <p className="text-xl text-gray-400 mb-12 max-w-3xl">
                    **ROBLOX'ta harita, 3D model ve özelleştirilmiş scriptler tasarlayıp satmaya odaklanan** Upsilon Dev Studio, dijital vizyonunuzu gerçeğe dönüştürür. **Onlarca projede edindiğimiz uzmanlık**, kaliteye ve yenilikçiliğe olan bağlılığımızın sonucudur.
                </p>

                {/* VİZYON & MİSYON */}
                <div className="grid md:grid-cols-2 gap-12 mb-16 border-t border-gray-700 pt-10">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-4">Vizyonumuz</h2>
                        <p className="text-lg text-gray-400">
                            Roblox platformunda teknik mükemmelliği ve yaratıcı sınırları zorlayarak, oyuncuların hayran kaldığı ve toplulukların benimsediği dijital deneyimler yaratmak.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-4">Misyonumuz</h2>
                        <p className="text-lg text-gray-400">
                            Müşterilerimizle şeffaf bir iş birliği içinde çalışmak, her projede hızlı teslimat, yüksek kalite ve platformun gerektirdiği disiplini önceliklendirmek.
                        </p>
                    </div>
                </div>

                {/* TEMEL DEĞERLER */}
                <div className="mt-16">
                    <h2 className="text-4xl font-bold text-white mb-8 border-b border-indigo-400 pb-2 inline-block">
                        Temel Değerlerimiz
                    </h2>
                    <ul className="grid md:grid-cols-3 gap-8">
                        {['Roblox Uzmanlığı', 'Teknik Disiplin', 'Hızlı Teslimat', 'Özgün Tasarım', 'Topluluk Odaklılık', 'Şeffaflık'].map((value, index) => (
                            <li key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                                <span className={`text-2xl font-extrabold ${PRIMARY_COLOR_CLASS}`}>{index + 1}.</span>
                                <h3 className="text-xl font-semibold text-white mt-2">{value}</h3>
                            </li>
                        ))}
                    </ul>
                </div>

                 {/* STÜDYO TARİHÇESİ */}
                 <div className="mt-16 border-t border-gray-700 pt-10">
                    <h2 className="text-4xl font-bold text-white mb-8">Stüdyo Tarihi: Dönüm Noktaları</h2>
                    <div className="relative border-l border-gray-700 space-y-8 pl-8">
                        <div className="relative">
                            <div className="absolute w-3 h-3 bg-indigo-500 rounded-full mt-1.5 -left-4 border border-gray-900"></div>
                            <h3 className="text-xl font-semibold text-white">2022: Roblox Geliştirme Odaklı Kuruluş</h3>
                            <p className="text-gray-400">Küçük bir ekip olarak Roblox platformunda özel proje geliştirmeye başladık.</p>
                        </div>
                        <div className="relative">
                            <div className="absolute w-3 h-3 bg-indigo-500 rounded-full mt-1.5 -left-4 border border-gray-900"></div>
                            <h3 className="text-xl font-semibold text-white">2024: Dinamik Portalı Açma</h3>
                            <p className="text-gray-400">Talepleri yönetmek ve projelerimizi sergilemek için kendi kurumsal dinamik portalımızı yayına aldık.</p>
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