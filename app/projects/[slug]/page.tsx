// src/app/projects/[slug]/page.tsx (Tüm içeriği bu kodla değiştirin)

'use client'; // Hata çözümü: Sayfayı Tarayıcı Koduna dönüştürdük

import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { notFound, useParams } from 'next/navigation'; // Dinamik URL parametrelerini çeker
import React, { useState, useEffect } from 'react';

// ----------------------------------------------------
// TİP TANIMLARI
// ----------------------------------------------------
interface Project {
    title: string;
    description: string;
    status: string;
    release_date: string;
    hero_image_url?: string;
    slug: string; // Ekstra güvenlik için ekliyoruz
}

// ----------------------------------------------------
// BİLEŞENLER
// ----------------------------------------------------
const PRIMARY_COLOR_CLASS = 'text-neon-purple';

// Header bileşeni
function Header() {
    return (
        <header className="fixed w-full z-50 bg-bg-primary/90 backdrop-blur-sm shadow-md border-b border-white/[0.05]">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <div className="text-2xl font-extrabold text-white">
                    <span className={PRIMARY_COLOR_CLASS}>UPSILON</span> DEV STUDIO
                </div>
                <div className="space-x-8 hidden md:flex">
                    <Link href="/" className="text-text-light hover:text-white transition duration-150">ANA SAYFA</Link>
                    <Link href="/projects" className="text-text-light hover:text-white transition duration-150">PROJELER</Link>
                    <Link href="/status" className="text-text-light hover:text-white transition duration-150">TAKİP ET</Link>
                </div>
                <a href="/request" className="px-5 py-2 border border-neon-purple text-neon-purple rounded-lg hover:bg-neon-purple hover:text-bg-primary transition duration-200 font-semibold">
                    TALEP OLUŞTUR
                </a>
            </nav>
        </header>
    );
}


export default function ProjectDetailPage() {
    const params = useParams();
    const slug = params.slug as string; // URL'den slug değerini al

    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Client Side Fetching (Veri Çekme)
    useEffect(() => {
        if (!slug) return;

        async function fetchProject() {
            setLoading(true);
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('slug', slug)
                .single();

            if (error || !data) {
                setError(true);
                // Bu noktada notFound() çalışmaz, çünkü Client Component'iz.
                setLoading(false);
                return;
            }

            setProject(data as Project);
            setLoading(false);
        }

        fetchProject();
    }, [slug]); // Slug değiştiğinde tekrar çalışır

    if (loading) {
        return (
            <div className="min-h-screen bg-bg-primary font-sans antialiased pt-20 flex items-center justify-center">
                <Header />
                <div className="text-xl text-neon-purple">Yükleniyor...</div>
            </div>
        );
    }

    if (error || !project) {
        // Hata durumunda özel 404 sayfamıza yönlendiririz
        return (
            <div className="min-h-screen bg-bg-primary font-sans antialiased pt-20 flex flex-col items-center justify-center">
                <Header />
                <h1 className="text-3xl text-red-500 mt-20">Proje Detayları Yüklenemedi veya Bulunamadı.</h1>
                <Link href="/projects" className="mt-4 text-neon-purple hover:underline">Tüm Projelere Geri Dön</Link>
            </div>
        );
    }
    
    // Proje başarıyla yüklendi
    const projectTitle = project.title || "Proje Detayı";

    return (
        <div className="min-h-screen bg-bg-primary font-sans antialiased pt-20">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
                {/* Proje Başlığı ve Durumu */}
                <h1 className="text-6xl font-extrabold text-white mb-2">{projectTitle}</h1>
                <span className={`text-lg font-semibold px-4 py-1 rounded-full ${project.status === 'PUBLISHED' ? 'bg-green-600 text-bg-primary' : 'bg-yellow-600 text-bg-primary'} uppercase`}>
                    {project.status}
                </span>

                {/* Ana Görsel / Video */}
                <div className="mt-8 mb-16 h-96 bg-bg-card rounded-xl flex items-center justify-center border border-gray-700">
                    {project.hero_image_url ? (
                        <img src={project.hero_image_url} alt={projectTitle} className="w-full h-full object-cover rounded-xl" />
                    ) : (
                        <span className="text-gray-500 text-2xl">Görsel Alanı</span>
                    )}
                </div>

                {/* Proje Detayları ve Açıklama */}
                <div className="grid md:grid-cols-3 gap-12">
                    <div className="md:col-span-2">
                        <h2 className="text-4xl font-bold text-indigo-400 mb-6 border-b border-gray-700 pb-2">Hakkında</h2>
                        <p className="text-lg text-text-light whitespace-pre-wrap">
                            {project.description || "Bu proje için detaylı bir açıklama girilmemiştir."}
                        </p>
                        
                        <div className="mt-12">
                            <h3 className="text-3xl font-bold text-white mb-4">Erişim</h3>
                            <a href="#" target="_blank" className="px-6 py-3 bg-neon-blue text-bg-primary font-bold rounded-lg hover:bg-neon-purple transition duration-200">
                                Roblox Oyununa Git →
                            </a>
                        </div>
                    </div>

                    {/* Teknik Özellikler ve Zaman Çizelgesi */}
                    <div className="md:col-span-1 bg-bg-card p-6 rounded-xl border border-gray-700">
                        <h3 className="text-2xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Teknikler.</h3>
                        <ul className="space-y-3 text-text-light">
                            <li className="flex justify-between"><span>Durum:</span> <span className="font-semibold text-neon-cyan">{project.status}</span></li>
                            <li className="flex justify-between">
                                <span>Yayın Tarihi:</span> 
                                <span className="font-semibold">
                                    {project.release_date ? new Date(project.release_date).toLocaleDateString() : 'Belirtilmemiş'}
                                </span>
                            </li>
                            <li className="flex justify-between"><span>Araçlar:</span> <span className="font-semibold">LUA, Blender, VS Code</span></li>
                            <li className="flex justify-between"><span>Yapımcı:</span> <span className="font-semibold">Ekip Adı</span></li>
                        </ul>
                    </div>
                </div>

            </main>
            <footer className="py-8 border-t border-white/[0.05] text-center text-text-deep text-sm">
                © 2025 Upsilon Dev Studio — Tüm Hakları Saklıdır.
            </footer>
        </div>
    );
}