import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import { useScript } from "deco/hooks/useScript.ts";
import TalkModal from "site/components/ui/TalkModal.tsx";
import Theme from "../sections/Theme/Theme.tsx";
import { Context } from "@deco/deco";
import TimeModal from "site/components/ui/TimeModal.tsx";
import SecondTimeModal from "site/components/ui/SecondTimeModal.tsx";

export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();
  
  return (<>
    <Theme colorScheme="any" />

    <Head>
      <meta name="view-transition" content="same-origin" />
      <meta charSet="UTF-8"/>

      {/* === OTIMIZAÇÕES CRÍTICAS DE PERFORMANCE === */}
      {/* Apenas preconnect para domínio de assets crítico */}
      <link rel="preconnect" href="https://assets.decocache.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://lojaintegradar.deco.site" />
      
      {/* Preload do CSS crítico */}
      <link 
        rel="preload" 
        href={asset(`/styles.css?revision=${revision}`)} 
        as="style"
      />
      <link 
        href={asset(`/styles.css?revision=${revision}`)} 
        rel="stylesheet"
      />

      {/* === FONTES OTIMIZADAS === */}
      {/* Preload apenas das fontes críticas (above-the-fold) */}
      <link 
        rel="preload" 
        href="https://lojaintegradar.deco.site/fonts/GalaxieCopernicus/GalaxieCopernicus-Bold.woff2" 
        as="font" 
        type="font/woff2" 
        crossOrigin="anonymous" 
      />
      <link 
        rel="preload" 
        href="https://lojaintegradar.deco.site/fonts/GalaxieCopernicus/GalaxieCopernicus-Book.woff2" 
        as="font" 
        type="font/woff2" 
        crossOrigin="anonymous" 
      />

      {/* CSS Inline Crítico - APENAS para above-the-fold */}
      <style dangerouslySetInnerHTML={{
        __html: `
          html {
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
            font-synthesis: none;
            scroll-behavior: smooth;
            height: 100%;
            margin: 0;
          }
          
          body {
            height: 100%;
            margin: 0;
          }

          /* Fontes CRÍTICAS com font-display: optional para evitar CLS */}
          @font-face {
            font-family: 'Galaxie Copernicus';
            src: url('https://lojaintegradar.deco.site/fonts/GalaxieCopernicus/GalaxieCopernicus-Bold.woff2') format('woff2');
            font-weight: 700;
            font-style: normal;
            font-display: optional;
          }

          @font-face {
            font-family: 'Galaxie Copernicus';
            src: url('https://lojaintegradar.deco.site/fonts/GalaxieCopernicus/GalaxieCopernicus-Book.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
            font-display: optional;
          }
        `
      }} />

      {/* Fontes secundárias: lazy load com media="print" trick */}
      <link 
        rel="stylesheet" 
        href={asset("/fontStyles-extended.css")} 
        media="print" 
        onLoad="this.media='all';this.onload=null;" 
      />
      <noscript>
        <link rel="stylesheet" href={asset("/fontStyles-extended.css")} />
      </noscript>

      {/* CSS de third-party (Google, reCAPTCHA): lazy load */}
      <link 
        rel="stylesheet" 
        href={asset("/third-party-styles.css")} 
        media="print" 
        onLoad="this.media='all';this.onload=null;" 
      />

      {/* Preload da imagem LCP (hero) - OTIMIZADO */}
      <link 
        rel="preload" 
        as="image" 
        href="https://assets.decocache.com/lojaintegradar/d3c45778-c9c9-4d69-a012-3cbf03347621/bg-header-new.webp"
        imageSrcSet="https://sites-lojaintegradar--szzpho.decocdn.com/live/invoke/website/loaders/image.ts?src=https%3A%2F%2Fassets.decocache.com%2Flojaintegradar%2Fd3c45778-c9c9-4d69-a012-3cbf03347621%2Fbg-header-new.webp&fit=cover&width=640&height=360 640w, https://sites-lojaintegradar--szzpho.decocdn.com/live/invoke/website/loaders/image.ts?src=https%3A%2F%2Fassets.decocache.com%2Flojaintegradar%2Fd3c45778-c9c9-4d69-a012-3cbf03347621%2Fbg-header-new.webp&fit=cover&width=1920&height=1080 1920w"
        fetchPriority="high"
      />

      <link rel="manifest" href={asset("/site.webmanifest")} />
    </Head>

    <ctx.Component />
    <TalkModal />
    <TimeModal />
    <SecondTimeModal />
    
    {/* === SCRIPTS OTIMIZADOS === */}
    
    {/* AOS Library: Lazy load CONDICIONAL apenas se houver elementos data-aos */}
    <script 
      type="module"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const hasAOSElements = () => document.querySelector('[data-aos]');
            
            if (!hasAOSElements()) return;
            
            let loaded = false;
            const loadAOS = () => {
              if (loaded || !hasAOSElements()) return;
              loaded = true;
              
              const link = document.createElement('link');
              link.rel = 'stylesheet';
              link.href = 'https://unpkg.com/aos@2.3.1/dist/aos.css';
              document.head.appendChild(link);
              
              const script = document.createElement('script');
              script.src = 'https://unpkg.com/aos@2.3.1/dist/aos.js';
              script.onload = () => {
                if (typeof AOS !== 'undefined') {
                  AOS.init({ 
                    startEvent: 'load',
                    once: true,
                    duration: 600
                  });
                }
              };
              document.body.appendChild(script);
              
              ['scroll', 'mousemove', 'touchstart'].forEach(e => 
                window.removeEventListener(e, loadAOS)
              );
            };
            
            ['scroll', 'mousemove', 'touchstart'].forEach(e => 
              window.addEventListener(e, loadAOS, { once: true, passive: true })
            );
            setTimeout(loadAOS, 5000);
          })();
        `
      }}
    />
    
    {/* Propagação de UTMs - OTIMIZADO com event delegation e requestIdleCallback */}
    <script 
      type="module"
      dangerouslySetInnerHTML={{
        __html: useScript(() => {
          const params = new URLSearchParams(window.location.search);
          const utms: Record<string, string> = {};
          
          for (const [key, value] of params.entries()) {
            if (key.startsWith('utm_')) {
              utms[key] = value;
            }
          }
          
          if (Object.keys(utms).length === 0) return;
          
          const updateLink = (link: HTMLAnchorElement) => {
            try {
              if (link.href && new URL(link.href).hostname === window.location.hostname) {
                const url = new URL(link.href);
                Object.entries(utms).forEach(([key, value]) => {
                  if (!url.searchParams.has(key)) {
                    url.searchParams.set(key, value);
                  }
                });
                link.href = url.toString();
              }
            } catch (e) {
              // Ignora links inválidos
            }
          };
          
          // Event delegation para links dinâmicos
          document.body.addEventListener('click', (e) => {
            const target = (e.target as HTMLElement).closest('a');
            if (target) updateLink(target as HTMLAnchorElement);
          }, { passive: true, capture: true });
          
          // Atualiza links existentes no idle
          if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
              document.querySelectorAll('a').forEach(link => 
                updateLink(link as HTMLAnchorElement)
              );
            }, { timeout: 2000 });
          } else {
            setTimeout(() => {
              document.querySelectorAll('a').forEach(link => 
                updateLink(link as HTMLAnchorElement)
              );
            }, 2000);
          }
        })
      }}
    />
  </>);
});
