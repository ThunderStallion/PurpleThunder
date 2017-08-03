self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('the-magic-cache').then(function(cache) {
            return cache.addAll([
                '/',
                '/jquery.html',
                '/index.html',
                '/manifest.json',
                '/css/dark_theme.css',
                '/css/light_theme.css',
                'images/dark_background.jpg',
                '/js/createBoard.js',
                '/js/createBoard_jquery.js',
                '/images/cat1.png',
                '/images/cat2.png',
                '/images/cat3.jpg',
                '/images/cat4.png',
                '/images/cat5.png',
                '/images/cat6.png',
                '/images/cat7.png',
                '/images/cat8.png',
                '/images/cat9.png',
                '/images/cat10.png',
                '/images/cat11.png',
                '/images/cat12.png',
                '/images/sound1.png',
                '/images/sound2.png',
                '/images/sound3.png',
                '/images/sound4.png',
                '/images/sound5.png',
                '/images/sound6.png',
                '/images/sound7.png',
                '/images/sound8.png',
                '/images/sound9.png',
                '/images/sound10.png',
                '/images/sound11.png',
                '/images/sound12.png',
                '/audio/cat1.wav',
                '/audio/cat2.wav',
                '/audio/cat3.wav',
                '/audio/cat4.wav',
                '/audio/cat5.wav',
                '/audio/cat6.wav',
                '/audio/cat7.wav',
                '/audio/cat8.wav',
                '/audio/cat9.wav',
                '/audio/cat10.wav',
                '/audio/cat11.wav',
                '/audio/cat12.wav',
                '/audio/applause.wav',
                '/audio/bassc2.wav',
                '/audio/bassc3.wav',
                '/audio/bassloop.wav',
                '/audio/boom.wav',
                '/audio/contrac2.wav',
                '/audio/fatsynslap.wav',
                '/audio/guitarc4.wav',
                '/audio/hihat.wav',
                '/audio/hornc5.wav',
                '/audio/pianoc6.wav',
                '/audio/snare.wav'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
