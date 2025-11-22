// src/app/page.tsx (Tüm içeriği bu kodla değiştirin)

import Link from 'next/link';
import { supabase } from '@/lib/supabase'; 
import React from 'react';

// ----------------------------------------------------
// TİP TANIMLARI
// ----------------------------------------------------
interface ProjectProps {
    title: string;
    slug: string;
    status: string;
    description: string;
    hero_image_url?: string; 
    id: number;
}

// ----------------------------------------------------
// VERİ ÇEKME FONKSİYONU
// ----------------------------------------------------
async function getFeaturedProjects(): Promise<ProjectProps[]> {
  const { data: projects, error } = await supabase
    .from('projects')
    .select('id, title, slug, description, status, hero_image_url')
    .eq('status', 'PUBLISHED')
    .order('release_date', { ascending: false })
    .limit(3); 

  if (error) {
    console.error("Proje çekilirken hata oluştu:", error); 
    return [];
  }
  return projects as ProjectProps[];
}

// ----------------------------------------------------
// BİLEŞENLER
// ----------------------------------------------------
const PRIMARY_COLOR_CLASS = 'text-indigo-400';

const ProjectCard: React.FC<ProjectProps> = ({ title, slug, status, description }) => (
    <Link href={`/projects/${slug}`} legacyBehavior>
        <a className="block bg-gray-800 p-6 rounded-lg shadow-xl hover:shadow-2xl hover:bg-gray-700 transition duration-300 transform hover:-translate-y-1">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${status === 'PUBLISHED' ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'} uppercase`}>
                {status}
            </span>
            <h3 className="text-2xl font-bold text-white mt-4">{title}</h3>
            <p className="text-gray-400 mt-2 line-clamp-3">{description}</p>
        </a>
    </Link>
);

// HATA ÇÖZÜMÜ: EKSİK HEADER BİLEŞENİ BURADA TANIMLANDI.
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

function CinematicHero() {
    return (
        <div className="relative flex flex-col items-center justify-center h-[90vh] text-center overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
            
            <div 
                className="relative z-20 space-y-6 transition-opacity duration-1000 ease-in-out"
                style={{ opacity: 1, transform: 'translateY(0)', animation: 'fadeInUp 1.5s ease-out' }}
            >
                <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white uppercase">
                    UPSILON <span className={PRIMARY_COLOR_CLASS}>DEV</span> STUDIO
                </h1>
                <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto">
                    Hayal Gücünüzü Gerçeğe Dönüştürüyoruz: Roblox için Harita, Model ve Script Mimarisi.
                </p>
                <Link href="/about" legacyBehavior>
                    <a className="inline-block px-8 py-3 mt-4 text-lg font-bold text-white bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105">
                        Hakkımızda Daha Fazlası
                    </a>
                </Link>
            </div>
            
            <div className="absolute bottom-10 z-20">
                <svg className="w-6 h-6 text-white animate-bounce" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M19 9l-7 7-7-7"></path>
                </svg>
            </div>
        </div>
    );
}

// ----------------------------------------------------
// ANA SAYFA BİLEŞENİ
// ----------------------------------------------------
export default async function HomePage() {
    const projects = await getFeaturedProjects();

    return (
        <div className="min-h-screen bg-gray-900 font-sans antialiased">
            
            <Header />

            <CinematicHero />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
                <h2 className="text-4xl font-extrabold text-white mb-8 border-b border-indigo-500 pb-2 inline-block">
                    {projects && projects.length > 0 ? 'Aktif Projelerimiz' : 'Aktif Proje Bulunmamaktadır'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects?.map((project) => (
                        <ProjectCard key={project.id} {...project} />
                    ))}
                </div>

            </main>
            <footer className="py-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                © 2025 Upsilon Dev Studio. Tüm Hakları Saklıdır.
            </footer>
        </div>
    );
}