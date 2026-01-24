// جندي الخلفية - Service Worker لجيش الأرباح 😈
self.addEventListener('push', function(event) {
    if (event.data) {
        try {
            const data = event.data.json();
            const options = {
                body: data.body,
                icon: 'og-image.jpg', // صورتك الاحترافية ستظهر كأيقونة للإشعار
                badge: 'og-image.jpg', // أيقونة صغيرة في شريط الإشعارات
                vibrate: [100, 50, 100], // اهتزاز هاتف الضحية عند وصول الذكر
                data: {
                    url: data.url // الرابط اللي هينفتح لما يضغط على الإشعار
                },
                dir: 'rtl', // دعم اللغة العربية
                lang: 'ar'
            };

            event.waitUntil(
                self.registration.showNotification(data.title, options)
            );
        } catch (e) {
            console.error("خطأ في معالجة بيانات الإشعار:", e);
        }
    }
});

// عند الضغط على الإشعار، يتم توجيه الضحية للرابط المطلوب (إعلانك أو موقعك)
self.addEventListener('notificationclick', function(event) {
    event.notification.close(); // إغلاق الإشعار
    
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});
