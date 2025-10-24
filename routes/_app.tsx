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
      {/* DNS Prefetch para domínios de assets (mais leve que preconnect) */}
      <link rel="dns-prefetch" href="https://lojaintegradar.deco.site" />
      <link rel="dns-prefetch" href="https://assets.decocache.com" />
      <link rel="dns-prefetch" href="https://sites-lojaintegradar--szzpho.decocdn.com" />
      <link rel="dns-prefetch" href="https://unpkg.com" />
      
      {/* Preconnect APENAS para recursos críticos acima da dobra */}
      <link rel="preconnect" href="https://lojaintegradar.deco.site" crossOrigin="anonymous" />
      
      {/* CSS Crítico com cache busting */}
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

      {/* CSS Inline Crítico */}
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

          /* Apenas fontes CRÍTICAS inline */
          @font-face {
            font-family: 'Galaxie Copernicus';
            src: url('https://lojaintegradar.deco.site/fonts/GalaxieCopernicus/GalaxieCopernicus-Bold.woff2') format('woff2');
            font-weight: 700;
            font-style: normal;
            font-display: swap;
          }

          @font-face {
            font-family: 'Galaxie Copernicus';
            src: url('https://lojaintegradar.deco.site/fonts/GalaxieCopernicus/GalaxieCopernicus-Book.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }

          /* CSS Adicional Crítico */
          .typingCircles {
            position: relative;
            gap: 5px;
          }
          
          .typingCircles span {
            content: '';
            animation: blink 1.5s infinite;
            animation-fill-mode: both;
            height: 10px;
            width: 10px;
            background: #3b5998;
            left: 0;
            top: 0;
            border-radius: 50%;
          }
          
          .typingCircles span:nth-child(2) {
            animation-delay: .2s;
          }
          
          .typingCircles span:nth-child(3) {
            animation-delay: .4s;
          }

          @keyframes blink {
            0% { opacity: .1; }
            20% { opacity: 1; }
            100% { opacity: .1; }
          }

          .g_id_signin {
            display: flex;
            justify-content: center;
          }

          .nsm7Bb-HzV7m-LgbsSe {
            border: none !important;
          }

          .grecaptcha-badge {
            visibility: hidden;
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

      {/* Preload da imagem LCP (hero) */}
      <link 
        rel="preload" 
        as="image" 
        href="https://assets.decocache.com/lojaintegradar/d3c45778-c9c9-4d69-a012-3cbf03347621/bg-header-new.webp"
        imageSrcSet="https://sites-lojaintegradar--szzpho.decocdn.com/live/invoke/website/loaders/image.ts?src=https%3A%2F%2Fassets.decocache.com%2Flojaintegradar%2Fd3c45778-c9c9-4d69-a012-3cbf03347621%2Fbg-header-new.webp&fit=cover&width=1920&height=1080 1920w, https://sites-lojaintegradar--szzpho.decocdn.com/live/invoke/website/loaders/image.ts?src=https%3A%2F%2Fassets.decocache.com%2Flojaintegradar%2Fd3c45778-c9c9-4d69-a012-3cbf03347621%2Fbg-header-new.webp&fit=cover&width=3840&height=2160 3840w"
        fetchPriority="high"
      />

      <link rel="manifest" href={asset("/site.webmanifest")} />
    </Head>

    <ctx.Component />
    <TalkModal />
    <TimeModal />
    <SecondTimeModal />
    
    {/* === SCRIPTS OTIMIZADOS === */}
    
    {/* AOS Library: Lazy load após interação */}
    <script 
      type="module"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            let loaded = false;
            const loadAOS = () => {
              if (loaded) return;
              loaded = true;
              
              // Carrega CSS do AOS
              const link = document.createElement('link');
              link.rel = 'stylesheet';
              link.href = 'https://unpkg.com/aos@2.3.1/dist/aos.css';
              document.head.appendChild(link);
              
              // Carrega JS do AOS
              const script = document.createElement('script');
              script.src = 'https://unpkg.com/aos@2.3.1/dist/aos.js';
              script.onload = () => {
                if (typeof AOS !== 'undefined') {
                  AOS.init({ startEvent: 'load' });
                }
              };
              document.body.appendChild(script);
              
              // Remove listeners
              ['scroll', 'mousemove', 'touchstart'].forEach(e => 
                window.removeEventListener(e, loadAOS)
              );
            };
            
            // Carrega após interação ou 4 segundos
            ['scroll', 'mousemove', 'touchstart'].forEach(e => 
              window.addEventListener(e, loadAOS, { once: true, passive: true })
            );
            setTimeout(loadAOS, 4000);
          })();
        `
      }}
    />
    
    {/* Propagação de UTMs - Otimizado */}
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
          
          const updateLinks = () => {
            document.querySelectorAll('a').forEach(link => {
              try {
                if (link.href && new URL(link.href).hostname === window.location.hostname) {
                  const url = new URL(link.href);
                  Object.entries(utms).forEach(([key, value]) => {
                    url.searchParams.set(key, value);
                  });
                  link.href = url.toString();
                }
              } catch (e) {
                // Ignora links inválidos
              }
            });
          };
          
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', updateLinks);
          } else {
            updateLinks();
          }
        })
      }}
    />
    
    {/* reCAPTCHA v3 e Google Sign-In: Lazy load otimizado */}
    <script 
      type="module"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            let loaded = false;
            const loadGoogleScripts = () => {
              if (loaded) return;
              loaded = true;
              
              // DNS Prefetch dinâmico
              const prefetch1 = document.createElement('link');
              prefetch1.rel = 'dns-prefetch';
              prefetch1.href = 'https://www.google.com';
              document.head.appendChild(prefetch1);
              
              const prefetch2 = document.createElement('link');
              prefetch2.rel = 'dns-prefetch';
              prefetch2.href = 'https://accounts.google.com';
              document.head.appendChild(prefetch2);
              
              // reCAPTCHA
              const recaptcha = document.createElement('script');
              recaptcha.src = 'https://www.google.com/recaptcha/api.js?render=6LdRdTErAAAAAJTiQW_hUzJxve5303X3lyy1UjA_';
              recaptcha.defer = true;
              document.head.appendChild(recaptcha);
              
              // Google Sign-In
              const gsi = document.createElement('script');
              gsi.src = 'https://accounts.google.com/gsi/client';
              gsi.defer = true;
              gsi.onload = () => {
                const btn = document.querySelector('.nsm7Bb-HzV7m-LgbsSe');
                if (btn) btn.style.border = 'none';
              };
              document.head.appendChild(gsi);
              
              // Limpa listeners
              ['scroll', 'mousemove', 'touchstart', 'click'].forEach(e => 
                window.removeEventListener(e, loadGoogleScripts)
              );
            };
            
            // Carrega ao primeiro sinal de interação
            ['scroll', 'mousemove', 'touchstart', 'click'].forEach(e => {
              window.addEventListener(e, loadGoogleScripts, { once: true, passive: true });
            });
            
            // Fallback: 5 segundos
            setTimeout(loadGoogleScripts, 5000);
          })();
        `
      }}
    />
  </>);
});
