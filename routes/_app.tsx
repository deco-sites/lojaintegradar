import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import TalkModal from "site/components/ui/TalkModal.tsx";
import Theme from "../sections/Theme/Theme.tsx";
import { Context } from "@deco/deco";
import TimeModal from "site/components/ui/TimeModal.tsx";
import SecondTimeModal from "site/components/ui/SecondTimeModal.tsx";

export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();
  
  return (<>
    {/* Include default fonts and css vars */}
    <Theme colorScheme="any" />

    {/* Include Icons and manifest */}
    <Head>
      {/* Enable View Transitions API */}
      <meta name="view-transition" content="same-origin" />
      <meta charSet="UTF-8"/>

      {/* --- OTIMIZAÇÕES CRÍTICAS DE PERFORMANCE --- */}
      {/* Preconnect aos domínios externos ANTES de qualquer CSS */}
      <link rel="preconnect" href="https://lojaintegradar.deco.site" />
      <link rel="preconnect" href="https://assets.decocache.com" />
      <link rel="preconnect" href="https://sites-lojaintegradar--szzpho.decocdn.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="dns-prefetch" href="https://unpkg.com" />
      <link rel="dns-prefetch" href="https://www.google.com" />
      <link rel="dns-prefetch" href="https://accounts.google.com" />
      {/* --- FIM OTIMIZAÇÕES CRÍTICAS --- */}

      {/* CSS Crítico: styles.css (necessário para renderização inicial) */}
      <link href={asset(`/styles.css?revision=${revision}`)} rel="stylesheet" />

      {/* ✅ PRELOAD APENAS DAS FONTES CRÍTICAS (usadas above-the-fold) */}
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
      <link 
        rel="preload" 
        href="https://lojaintegradar.deco.site/fonts/Lektorat/Lektorat-CompressedRegular.woff2" 
        as="font" 
        type="font/woff2" 
        crossOrigin="anonymous" 
      />

      {/* ✅ CSS DE FONTES E ADICIONAL INLINED (Eliminando bloqueio de renderização) */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Font Smoothing */
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

          /* ✅ APENAS FONTES CRÍTICAS (Bold, Book/Normal, Regular) */
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

          @font-face {
            font-family: 'Lektorat';
            src: url('https://lojaintegradar.deco.site/fonts/Lektorat/Lektorat-CompressedRegular.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }

          @font-face {
            font-family: 'Lektorat Display var';
            src: url('https://lojaintegradar.deco.site/fonts/Lektorat/Variable/LektoratDisplayVar.woff2') format('woff2');
            font-display: swap;
          }

          /* Additional CSS (anteriormente em arquivo separado) */
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

      {/* ✅ FONTES SECUNDÁRIAS CARREGADAS DE FORMA ASSÍNCRONA */}
      <link 
        rel="stylesheet" 
        href={asset("/fontStyles-extended.css")} 
        media="print" 
        onLoad="this.media='all'" 
      />
      <noscript>
        <link rel="stylesheet" href={asset("/fontStyles-extended.css")} />
      </noscript>

      {/* Preload LCP Image com fetchPriority high */}
      <link 
        rel="preload" 
        as="image" 
        href="https://assets.decocache.com/lojaintegradar/d3c45778-c9c9-4d69-a012-3cbf03347621/bg-header-new.webp"
        imageSrcSet="https://sites-lojaintegradar--szzpho.decocdn.com/live/invoke/website/loaders/image.ts?src=https%3A%2F%2Fassets.decocache.com%2Flojaintegradar%2Fd3c45778-c9c9-4d69-a012-3cbf03347621%2Fbg-header-new.webp&fit=cover&width=1920&height=1080 1920w, https://sites-lojaintegradar--szzpho.decocdn.com/live/invoke/website/loaders/image.ts?src=https%3A%2F%2Fassets.decocache.com%2Flojaintegradar%2Fd3c45778-c9c9-4d69-a012-3cbf03347621%2Fbg-header-new.webp&fit=cover&width=3840&height=2160 3840w"
        fetchPriority="high"
      />

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />
      
      {/* AOS CSS carregado com baixa prioridade (mantido como estava) */}
      <link 
        rel="preload" 
        href="https://unpkg.com/aos@2.3.1/dist/aos.css" 
        as="style" 
        onLoad="this.onload=null;this.rel='stylesheet'" 
      />
      <noscript>
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
      </noscript>
    </Head>

    {/* Rest of Preact tree */}
    <ctx.Component />
    <TalkModal />
    <TimeModal />
    <SecondTimeModal />
    
    {/* AOS Library - Carregado depois do conteúdo principal */}
    <script defer src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script defer dangerouslySetInnerHTML={{
      __html: `
      window.addEventListener('load', function() {
        if (typeof AOS !== 'undefined') {
          AOS.init({startEvent: 'load'});
        }
      });
      `}}>
    </script>
    
    {/* Propagação de UTMs - Otimizado */}
    <script defer dangerouslySetInnerHTML={{__html: `
      (function() {
        const params = new URLSearchParams(window.location.search);
        const utms = {};
        for (const [key, value] of params.entries()) {
          if (key.startsWith('utm_')) {
            utms[key] = value;
          }
        }
        if (Object.keys(utms).length > 0) {
          document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('a').forEach(link => {
              if (link.href && link.hostname === window.location.hostname) {
                const url = new URL(link.href);
                Object.entries(utms).forEach(([key, value]) => {
                  url.searchParams.set(key, value);
                });
                link.href = url.toString();
              }
            });
          });
        }
      })();
    `}}/>
    
    {/* reCAPTCHA v3 e Google Sign-In - Carregamento sob demanda (lazy load) */}
    <script defer dangerouslySetInnerHTML={{
      __html: `
        (function() {
          let loaded = false;
          const loadScripts = function() {
            if (loaded) return;
            loaded = true;
            
            // reCAPTCHA
            const recaptcha = document.createElement('script');
            recaptcha.src = 'https://www.google.com/recaptcha/api.js?render=6LdRdTErAAAAAJTiQW_hUzJxve5303X3lyy1UjA_';
            recaptcha.defer = true;
            document.head.appendChild(recaptcha);
            
            // Google Sign-In
            const gsi = document.createElement('script');
            gsi.src = 'https://accounts.google.com/gsi/client';
            gsi.defer = true;
            gsi.onload = function() {
              const btn = document.querySelector('.nsm7Bb-HzV7m-LgbsSe');
              if (btn) btn.style.border = 'none';
            };
            document.head.appendChild(gsi);
            
            // Remove listeners
            window.removeEventListener('scroll', loadScripts);
            window.removeEventListener('mousemove', loadScripts);
            window.removeEventListener('touchstart', loadScripts);
            window.removeEventListener('click', loadScripts);
          };
          
          // Carrega ao primeiro sinal de interação do usuário
          const events = ['scroll', 'mousemove', 'touchstart', 'click'];
          events.forEach(event => {
            window.addEventListener(event, loadScripts, { once: true, passive: true });
          });
          
          // Fallback: carrega após 5 segundos caso não haja interação
          setTimeout(loadScripts, 5000);
        })();
      `}}>
    </script>
  </>);
});
