// src/app/admin/page.tsx
'use client'; 

import Link from 'next/link';
import { useState } from 'react';

export default function AdminLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Gerçek entegrasyon burada başlayacak (Supabase Auth/Özel API ile)
        alert('Giriş denemesi başarılı. (Gerçek Giriş Mantığı Henüz Uygulanmadı)');
        console.log('Giriş bilgileri:', username, password);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-300 flex flex-col items-center justify-center">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
                <h1 className="text-3xl font-bold text-indigo-400 mb-6 text-center">Yönetim Paneli Girişi</h1>
                <p className="text-sm text-gray-400 mb-8 text-center">
                    Bu alan sadece Upsilon Dev Studio yetkilileri içindir.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Kullanıcı Adı</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                               className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Şifre</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                               className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>
                    <button type="submit"
                            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition duration-200">
                        Giriş Yap
                    </button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <Link href="/" className="text-indigo-400 hover:text-indigo-300">
                        ← Ana Sayfaya Dön
                    </Link>
                </div>
            </div>
        </div>
    );
}