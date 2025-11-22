// src/app/status/page.tsx
'use client'; 

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import React from 'react';

// Tip Tanımları
interface Order {
    id: number;
    order_slug: string;
    client_contact: string;
    item_description: string;
    status: 'RECEIVED' | 'IN_PROGRESS' | 'READY' | 'DELIVERED';
    updated_at: string;
}

const STATUS_MAP = {
    RECEIVED: { label: 'Talep Alındı (Gözden Geçiriliyor)', color: 'bg-gray-600' },
    IN_PROGRESS: { label: 'İşlem Devam Ediyor (Yapım Aşamasında)', color: 'bg-yellow-600' },
    READY: { label: 'Teslimata Hazır (Onay Bekleniyor)', color: 'bg-blue-600' },
    DELIVERED: { label: 'Teslim Edildi', color: 'bg-green-600' },
};

function Header() {
    return (
        <header className="fixed w-full z-50 bg-gray-900/80 backdrop-blur-sm shadow-md">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <div className="text-2xl font-extrabold text-white">
                    <span className="text-indigo-400">UPSILON</span> DEV STUDIO
                </div>
                <div className="space-x-8 hidden md:flex">
                    <Link href="/" className="text-gray-300 hover:text-white transition duration-150">ANA SAYFA</Link>
                    <Link href="/projects" className="text-gray-300 hover:text-white transition duration-150">PROJELER</Link>
                    <Link href="/about" className="text-gray-300 hover:text-white transition duration-150">KURUMSAL</Link>
                    <Link href="/request" className="text-gray-300 hover:text-white transition duration-150">TALEP OLUŞTUR</Link>
                </div>
                <a href="#" target="_blank" className="px-5 py-2 border border-indigo-400 text-indigo-400 rounded-lg hover:bg-indigo-500 hover:text-white transition duration-200">
                    TOPLULUĞA KATIL
                </a>
            </nav>
        </header>
    );
}

export default function OrderStatusPage() {
    const [slug, setSlug] = useState('');
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setOrder(null);
        setError('');

        if (!slug) {
            setError('Lütfen takip kodunu giriniz.');
            setLoading(false);
            return;
        }

        try {
            const { data, error: fetchError } = await supabase
                .from('orders')
                .select('*')
                .eq('order_slug', slug.toUpperCase())
                .single();

            if (fetchError && fetchError.code === 'PGRST116') {
                setError('Bu takip koduyla bir sipariş bulunamadı.');
            } else if (fetchError) {
                console.error(fetchError);
                setError('Bir hata oluştu, lütfen daha sonra tekrar deneyin.');
            } else {
                setOrder(data as Order);
            }
        } catch (err) {
            setError('Beklenmeyen bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-300 pt-20">
            <Header />
            
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-4xl font-bold text-indigo-400 mb-8">Sipariş Takip Merkezi</h1>
                <p className="text-lg text-gray-400 mb-8">
                    Sipariş durumunuzu görmek için size verilen özel takip kodunu giriniz.
                </p>

                <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg mb-12 flex">
                    <input
                        type="text"
                        placeholder="Takip Kodu (Örn: UDS-001)"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="flex-grow p-3 rounded-l-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-indigo-500"
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-r-lg hover:bg-indigo-500 transition duration-200 disabled:bg-indigo-800"
                        disabled={loading}
                    >
                        {loading ? 'Yükleniyor...' : 'Durumu Sorgula'}
                    </button>
                </form>

                {error && (
                    <div className="bg-red-900 text-white p-4 rounded-lg mb-4">Hata: {error}</div>
                )}

                {order && (
                    <div className="bg-gray-800 p-8 rounded-lg shadow-2xl">
                        <h2 className="text-3xl font-bold text-white mb-4">Takip Edilen Sipariş: {order.order_slug}</h2>
                        <p className="text-gray-400 mb-6">Talep Edilen Ürün: **{order.item_description}**</p>
                        
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-white mb-4">Mevcut Durum</h3>
                            <div className={`p-4 rounded-lg text-center font-bold text-white ${STATUS_MAP[order.status]?.color || 'bg-red-700'}`}>
                                {STATUS_MAP[order.status]?.label || 'Bilinmeyen Durum'}
                            </div>
                            <p className="text-sm text-gray-500 mt-2">Son Güncelleme: {new Date(order.updated_at).toLocaleString()}</p>
                        </div>
                    </div>
                )}
            </main>
            <footer className="py-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                © 2025 Upsilon Dev Studio. Tüm Hakları Saklıdır.
            </footer>
        </div>
    );
}