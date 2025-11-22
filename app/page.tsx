// src/app/page.tsx (Tüm içeriği bununla değiştirin)

import Link from 'next/link';
// Buradaki yolu, lib klasörünün app ile aynı seviyede olduğunu varsayarak ayarlıyoruz
import { supabase } from '@/lib/supabase';

// ----------------------------------------------------
// VERİ ÇEKME FONKSİYONU
// ----------------------------------------------------
async function getFeaturedProjects() {
  // Supabase'den sadece PUBLISHED (Yayınlanmış) durumdaki projeleri çek
  const { data: projects, error } = await supabase
    .from('projects')
    .select('title, slug, description, status, hero_image_url')
    .eq('status', 'PUBLISHED') // Sadece yayınlanmış olanlar
    .order('release_date', { ascending: false })
    .limit(3); 

  if (error) {
    console.error("Proje çekilirken hata oluştu:", error); 
    return [];
  }
  return projects;
}

// ----------------------------------------------------
// ANA BİLEŞEN VE TASARIM
// ----------------------------------------------------
const PRIMARY_COLOR_CLASS = 'text-indigo-400';

export default async function Home() {
  // Veriyi burada çekiyoruz
  const projects = await getFeaturedProjects();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 font-sans antialiased">

      {/* 1. NAVİGASYON BARI */}
      <header className="fixed w-full z-50 bg-gray-900/80 backdrop-blur-sm shadow-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-extrabold text-white">
            <span className={PRIMARY_COLOR_CLASS}>UPSILON</span> DEV STUDIO
          </div>
          <div className="space-x-8 hidden md:flex">
            <Link href="/projects" className="text-gray-300 hover:text-white transition duration-150">PROJELER</Link>
            <Link href="/devlog" className="text-gray-300 hover:text-white transition duration-150">DEVLOG</Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition duration-150">KURUMSAL</Link>
            <Link href="/support" className="text-gray-300 hover:text-white transition duration-150">DESTEK</Link>
          </div>
          <a href="#" target="_blank" className="px-5 py-2 border border-indigo-400 text-indigo-400 rounded-lg hover:bg-indigo-500 hover:text-white transition duration-200">
            TOPLULUĞA KATIL
          </a>
        </nav>
      </header>

      {/* 2. SİNEMATİK AÇILIŞ ALANI */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ background: 'linear-gradient(rgba(17,24,39,0.2), rgba(17,24,39,1)), url("/images/hero-placeholder.jpg")', backgroundBlendMode: 'darken', backgroundColor: '#000' }}>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <p className={`text-lg font-medium mb-3 ${PRIMARY_COLOR_CLASS}`}>100 YILLIK TECRÜBE İLE İNŞA EDİLDİ</p>
          <h1 className="text-7xl md:text-9xl font-extrabold text-white tracking-tight drop-shadow-lg mb-6">
            UPSILON PORTAL
          </h1>
          <p className="text-xl font-light text-gray-400 mx-auto mb-10">
            Sadece bir stüdyo değil; geliştiriciler, oyuncular ve içerik üreticileri için tam entegre bir ekosistem.
          </p>

          <Link href="/projects/featured-project" className="inline-block px-10 py-4 text-xl font-bold bg-indigo-600 text-white rounded-xl shadow-2xl hover:bg-indigo-500 transform hover:scale-105 transition duration-300 ease-in-out">
            EN YENİ PROJEYİ KEŞFET
          </Link>
        </div>
      </section>

      {/* 3. ÖNE ÇIKAN PROJELER (DİNAMİK) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 border-b-2 border-indigo-400 inline-block pb-1">
          Öne Çıkan Projeler
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.length > 0 ? (
            projects.map((project) => (
              // PROJE KARTI
              <div key={project.slug} className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition duration-300 ease-in-out">

                {/* Kart Görseli */}
                <div className="h-48 bg-gray-700 flex items-center justify-center">
                   {project.hero_image_url ? <img src={project.hero_image_url} alt={project.title} className="w-full h-full object-cover"/> : <span className="text-gray-400 text-lg">Görsel Yok</span>}
                </div>

                <div className="p-6">
                  <span className={`text-sm font-semibold mb-2 block ${PRIMARY_COLOR_CLASS}`}>
                    {project.status}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-base mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <Link href={`/projects/${project.slug}`} className="font-semibold text-indigo-400 hover:text-indigo-300 transition duration-150">
                    Detayları Gör →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-3">Şu anda yayınlanmış öne çıkan bir proje bulunmamaktadır.</p>
          )}
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="py-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        © 2025 Upsilon Dev Studio. Tüm Hakları Saklıdır. | <Link href="/press" className="hover:text-indigo-400">Basın Odası</Link> | <Link href="/terms" className="hover:text-indigo-400">Gizlilik</Link>
      </footer>
    </div>
  );
}