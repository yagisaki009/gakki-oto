/* オフライン用：一度ひらいたら端末に保存して、電波がなくても動くようにする */
var CACHE = 'gakki-oto-v2';
var FILES = ['./', 'index.html', 'data.js', 'manifest.webmanifest', 'icon-180.png', 'icon-512.png', 'art/piano.png', 'art/guitar.png', 'art/violin.png', 'art/drum.png', 'art/tambourine.png', 'art/mokkin.png', 'art/tekkin.png', 'art/recorder.png', 'art/flute.png', 'art/trumpet.png', 'art/trombone.png', 'art/sax.png', 'art/clarinet.png', 'art/harmonica.png', 'art/ocarina.png', 'art/koto.png', 'art/shamisen.png', 'art/taiko.png', 'art/maracas.png', 'art/triangle.png', 'songs_real/clarinet_1.m4a', 'songs_real/clarinet_2.m4a', 'songs_real/clarinet_3.m4a', 'songs_real/clarinet_4.m4a', 'songs_real/clarinet_5.m4a', 'songs_real/drum_1.m4a', 'songs_real/drum_2.m4a', 'songs_real/drum_3.m4a', 'songs_real/drum_4.m4a', 'songs_real/drum_5.m4a', 'songs_real/flute_1.m4a', 'songs_real/flute_2.m4a', 'songs_real/flute_3.m4a', 'songs_real/flute_4.m4a', 'songs_real/flute_5.m4a', 'songs_real/guitar_1.m4a', 'songs_real/guitar_2.m4a', 'songs_real/guitar_3.m4a', 'songs_real/guitar_4.m4a', 'songs_real/guitar_5.m4a', 'songs_real/harmonica_1.m4a', 'songs_real/harmonica_2.m4a', 'songs_real/harmonica_3.m4a', 'songs_real/harmonica_4.m4a', 'songs_real/harmonica_5.m4a', 'songs_real/koto_1.m4a', 'songs_real/koto_2.m4a', 'songs_real/koto_3.m4a', 'songs_real/koto_4.m4a', 'songs_real/koto_5.m4a', 'songs_real/maracas_1.m4a', 'songs_real/maracas_2.m4a', 'songs_real/maracas_3.m4a', 'songs_real/maracas_4.m4a', 'songs_real/maracas_5.m4a', 'songs_real/mokkin_1.m4a', 'songs_real/mokkin_2.m4a', 'songs_real/mokkin_3.m4a', 'songs_real/mokkin_4.m4a', 'songs_real/mokkin_5.m4a', 'songs_real/ocarina_1.m4a', 'songs_real/ocarina_2.m4a', 'songs_real/ocarina_3.m4a', 'songs_real/ocarina_4.m4a', 'songs_real/ocarina_5.m4a', 'songs_real/piano_1.m4a', 'songs_real/piano_2.m4a', 'songs_real/piano_3.m4a', 'songs_real/piano_4.m4a', 'songs_real/piano_5.m4a', 'songs_real/recorder_1.m4a', 'songs_real/recorder_2.m4a', 'songs_real/recorder_3.m4a', 'songs_real/recorder_4.m4a', 'songs_real/recorder_5.m4a', 'songs_real/sax_1.m4a', 'songs_real/sax_2.m4a', 'songs_real/sax_3.m4a', 'songs_real/sax_4.m4a', 'songs_real/sax_5.m4a', 'songs_real/shamisen_1.m4a', 'songs_real/shamisen_2.m4a', 'songs_real/shamisen_3.m4a', 'songs_real/shamisen_4.m4a', 'songs_real/shamisen_5.m4a', 'songs_real/taiko_1.m4a', 'songs_real/taiko_2.m4a', 'songs_real/taiko_3.m4a', 'songs_real/taiko_4.m4a', 'songs_real/taiko_5.m4a', 'songs_real/tambourine_1.m4a', 'songs_real/tambourine_2.m4a', 'songs_real/tambourine_3.m4a', 'songs_real/tambourine_4.m4a', 'songs_real/tambourine_5.m4a', 'songs_real/tekkin_1.m4a', 'songs_real/tekkin_2.m4a', 'songs_real/tekkin_3.m4a', 'songs_real/tekkin_4.m4a', 'songs_real/tekkin_5.m4a', 'songs_real/triangle_1.m4a', 'songs_real/triangle_2.m4a', 'songs_real/triangle_3.m4a', 'songs_real/triangle_4.m4a', 'songs_real/triangle_5.m4a', 'songs_real/trombone_1.m4a', 'songs_real/trombone_2.m4a', 'songs_real/trombone_3.m4a', 'songs_real/trombone_4.m4a', 'songs_real/trombone_5.m4a', 'songs_real/trumpet_1.m4a', 'songs_real/trumpet_2.m4a', 'songs_real/trumpet_3.m4a', 'songs_real/trumpet_4.m4a', 'songs_real/trumpet_5.m4a', 'songs_real/violin_1.m4a', 'songs_real/violin_2.m4a', 'songs_real/violin_3.m4a', 'songs_real/violin_4.m4a', 'songs_real/violin_5.m4a'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    /* 同じサイトのほかのアプリ（電車・まち・がっき）の保存データは消さない。自分の古い版だけ消す */
    var mine = CACHE.replace(/v\d+$/, '');
    return Promise.all(keys.map(function (k) { if (k !== CACHE && k.indexOf(mine) === 0) return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
/* 保存してあるものをすぐ返す（電波が弱くても待たない）。裏で新しい版があれば取っておく */
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  e.respondWith(caches.open(CACHE).then(function (c) {
    return c.match(req, { ignoreSearch: true }).then(function (hit) {
      var net = fetch(req).then(function (res) {
        if (res && res.ok && res.status === 200 && req.url.indexOf(self.location.origin) === 0) c.put(req, res.clone());
        return res;
      });
      if (hit) { net['catch'](function () {}); return hit; }
      return net['catch'](function () { return c.match('index.html'); });
    });
  }));
});
