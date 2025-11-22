// src/app/team/page.tsx
import Link from 'next/link';

// Örnek Ekip Verisi (Discord üzerinden alabilirsiniz)
const teamMembers = [
    {
        name: "Upsilon Alpha",
        role: "Kurucu & Baş Yazılımcı (LUA Architect)",
        description: "Yüzlerce Roblox projesine imza atmış, sistem mimarisi ve optimizasyonda uzmanlaşmıştır. Stüdyonun teknik lideridir.",
        contact: "discord: u_alpha",
    },
    {
        name: "Nova Beta",
        role: "Harita & 3D Model Uzmanı (Builder/Artist)",
        description: "Epic ve detaylı harita tasarımları, özgün 3D assetler ve çevre modellemede yeteneklidir. Görsel standartları belirler.",
        contact: "discord: nova_beta",
    },
    {
        name: "Gamma Delta",
        role: "Kalite Kontrol & Proje Yöneticisi (QC/Manager)",
        description: "Müşteri taleplerinin doğru anlaşılması, teslimat kalitesinin kontrolü ve zamanında proje yönetiminden sorumludur.",
        contact: "discord: gamma_d",
    },
];

const PRIMARY_COLOR_CLASS = 'text-indigo-400';

export default function TeamPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-300 font-sans antialiased pt-20">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
                <h1 className={`text-5xl font-extrabold text-white mb-4 ${PRIMARY_COLOR_CLASS}`}>
                    Ekibimiz: Upsilon Dev'in Gücü
                </h1>
                <p className="text-xl text-gray-400 mb-12 max-w-3xl">
                    Roblox platformunun dinamiklerini derinlemesine bilen, alanında uzman profesyonellerden oluşan çekirdek kadromuzla tanışın.
                </p>

                {/* EKİP ÜYELERİ KARTLARI */}
                <div className="grid md:grid-cols-3 gap-10">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="bg-gray-800 p-8 rounded-xl shadow-2xl transition duration-300 hover:shadow-indigo-500/30 border border-gray-700 hover:border-indigo-500">
                            <h2 className="text-2xl font-bold text-white mb-2">{member.name}</h2>
                            <p className={`${PRIMARY_COLOR_CLASS} font-semibold mb-4 text-lg`}>{member.role}</p>
                            
                            <p className="text-gray-400 mb-6">{member.description}</p>
                            
                            <div className="flex justify-between items-center text-sm text-gray-500">
                                <span className="font-mono">{member.contact}</span>
                                <Link href="/request" className="text-indigo-400 hover:text-indigo-300 underline">
                                    Proje Başlat
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* YENİ İŞ İLANI */}
                <div className="mt-16 p-10 bg-indigo-900/40 border border-indigo-700 rounded-xl text-center">
                    <h3 className="text-3xl font-bold text-white mb-3">Roblox Geliştirici Ağına Katılın</h3>
                    <p className="text-lg text-indigo-200 mb-5">
                        Eğer sen de LUA Scripting veya 3D modellemede yetenekliysen, Discord topluluğumuzdan bize ulaşarak ekibimize katılabilirsin.
                    </p>
                    <a href="#" target="_blank" className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition duration-200">
                        TOPLULUĞA KATIL
                    </a>
                </div>

            </main>
             <footer className="py-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                © 2025 Upsilon Dev Studio. Tüm Hakları Saklıdır.
            </footer>
        </div>
    );
}