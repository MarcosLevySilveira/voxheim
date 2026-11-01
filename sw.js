const V="voxheim-v14";const A="voxheim-audio-1";const FILES=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","icon-180.png","icon-maskable.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V&&x!==A).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{ if(e.request.method!=="GET") return; const u=new URL(e.request.url); if(u.origin!==location.origin) return;
  if(e.request.mode==="navigate"){ e.respondWith(fetch(e.request).then(r=>{ const c=r.clone(); caches.open(V).then(x=>x.put("index.html",c)); return r; }).catch(()=>caches.match("index.html"))); return; }
  if(u.pathname.indexOf("/audio/")>=0){ e.respondWith(caches.open(A).then(c=>c.match(e.request).then(hit=>{ const net=fetch(e.request).then(r=>{ if(r.ok) c.put(e.request,r.clone()); return r; }); return hit||net; }))); return; }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))); });
