// src/app/team/page.tsx
import Link from 'next/link';

const teamMembers = [
    {
        name: "Emre Gümüş",
        role: "Kurucu & Baş Yazılımcı (LUA Architect)",
        description: "Yüzlerce Roblox projesine imza atmış, sistem mimarisi ve optimizasyonda uzmanlaşmıştır. Stüdyonun teknik lideridir.",
        contact_id: "Emre#0001",
    },
    {
        name: "Merve Çelik",
        role: "Harita & 3D Model Uzmanı (Builder/Artist)",
        description: "Epic ve detaylı harita tasarımları, özgün 3D assetler ve çevre modellemede yeteneklidir. Görsel standartları belirler.",
        contact_id: "Merve#1234",
    },
    {
        name: "Can Tekin",
        role: "Kalite Kontrol & Proje Yöneticisi (QC/Manager)",
        description: "Müşteri taleplerinin doğru anlaşılması, teslimat kalitesinin kontrolü ve zamanında proje yönetiminden sorumludur.",
        contact_id: "CanTkn#5678",
    },
];

const PRIMARY_COLOR_CLASS = 'text-indigo-400';

// Basitleştirilmiş Header bileşeni
function Header() {
    return (
        <header className="fixed w-full z-50 bg-gray-900/80 backdrop-blur-sm shadow-md">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <div className="text-2xl font-extrabold text-white">
                    <span className={PRIMARY_COLOR_CLASS}>UPSILON</span> DEV STUDIO
                </div>
                <div className="space-x-8 hidden md:flex">
                    <Link href="/projects" className="text-gray-300 hover:text-white transition duration-150">PROJELER</Link>
                    <Link href="/about" className="text-gray-300 hover:text-white transition duration-150">HAKKIMIZDA</Link>
                    <Link href="/team" className="text-gray-300 hover:text-white transition duration-150">EKİP</Link>
                    <Link href="/status" className="text-gray-300 hover:text-white transition duration-150">TAKİP ET</Link>
                    <Link href="/request" className="text-gray-300 hover:text-white transition duration-150">TALEP OLUŞTUR</Link>
                </div>
                <a href="#" target="_blank" className="px-5 py-2 border border-indigo-400 text-indigo-400 rounded-lg hover:bg-indigo-500 hover:text-white transition duration-200">
                    TOPLULUĞA KATIL
                </a>
            </nav>
        </header>
    );
}

export default function TeamPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-300 font-sans antialiased pt-20">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
                <h1 className={`text-5xl font-extrabold text-white mb-4 ${PRIMARY_COLOR_CLASS}`}>
                    Ekibimiz: Roblox Uzmanları
                </h1>
                <p className="text-xl text-gray-400 mb-12 max-w-3xl">
                    Her biri kendi alanında uzman, projenizin her aşamasında en yüksek kaliteyi hedefleyen çekirdek kadromuz.
                </p>

                {/* EKİP ÜYELERİ KARTLARI */}
                <div className="grid md:grid-cols-3 gap-10">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="bg-gray-800 p-8 rounded-xl shadow-2xl transition duration-300 hover:shadow-indigo-500/30 border border-gray-700 hover:border-indigo-500">
                            <h2 className="text-2xl font-bold text-white mb-2">{member.name}</h2>
                            <p className={`${PRIMARY_COLOR_CLASS} font-semibold mb-4 text-lg`}>{member.role}</p>
                            
                            <p className="text-gray-400 mb-6">{member.description}</p>
                            
                            <div className="flex justify-between items-center border-t border-gray-700 pt-4 mt-4">
                                <span className="text-sm text-gray-500">İletişim ID: {member.contact_id}</span>
                                <Link href="/request" className="text-indigo-400 font-semibold hover:underline">
                                    Proje Başlat →
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