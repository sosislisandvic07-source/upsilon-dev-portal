// src/app/api/new-request/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // Supabase istemcisi

// Webhook URL'sini Vercel'den çekiyoruz
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

// Rastgele bir takip kodu oluşturma fonksiyonu
const generateSlug = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4 haneli sayı
    return `UDS-${randomNum}`;
};

export async function POST(request: NextRequest) {
    if (!DISCORD_WEBHOOK_URL) {
        return NextResponse.json({ message: 'Sunucu ayarları eksik. DISCORD_WEBHOOK_URL tanımlanmadı.' }, { status: 500 });
    }

    try {
        const body = await request.json();
        const { name, contact, type, details } = body;

        // 1. Supabase'e Yeni Sipariş Kaydı
        const slug = generateSlug();

        const { error: dbError } = await supabase
            .from('orders')
            .insert({
                order_slug: slug,
                client_contact: contact,
                item_description: details,
                status: 'RECEIVED',
                // Sadece gerekli alanları ekliyoruz
            });

        if (dbError) {
            console.error('Veritabanı Kayıt Hatası:', dbError);
            return NextResponse.json({ message: 'Veritabanı kaydı başarısız.' }, { status: 500 });
        }

        // 2. Discord Webhook Bildirimi
        const discordPayload = {
            content: "@here", // Ekibi etiketle
            embeds: [{
                title: "🚨 YENİ ROBLOX TALEP FORMU 🚨",
                description: `Yeni bir müşteri talebi geldi. Takip Kodu: **${slug}**`,
                color: 16750873, // Turuncu renk
                fields: [
                    { name: "Müşteri Adı", value: name, inline: true },
                    { name: "İletişim", value: contact, inline: true },
                    { name: "Talep Türü", value: type, inline: false },
                    { name: "Detaylar", value: details.substring(0, 1024), inline: false },
                    { name: "Takip Linki", value: `[Portaldan Takip Etmek İçin Tıkla](${request.nextUrl.origin}/status?code=${slug})`, inline: false },
                ],
                timestamp: new Date().toISOString(),
            }]
        };

        await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discordPayload),
        });

        // Takip kodunu müşteriye geri döndür
        return NextResponse.json({ message: 'Talep başarıyla alındı.', slug: slug }, { status: 200 });

    } catch (error) {
        console.error('API İşlem Hatası:', error);
        return NextResponse.json({ message: 'Sunucu hatası.' }, { status: 500 });
    }
}