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
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="preconnect" href="https://unpkg.com" />
      <link rel="preconnect" href="https://www.google.com" />
      <link rel="preconnect" href="https://accounts.google.com" />
      <link rel="preconnect" href="https://assets.decocache.com" />
      <link rel="preconnect" href="https://sites-lojaintegradar--szzpho.decocdn.com" />
      {/* --- FIM OTIMIZAÇÕES CRÍTICAS --- */}

      {/* CSS files */}
      <link href={asset(`/styles.css?revision=${revision}`)} rel="stylesheet" />
      <link rel="stylesheet" href={asset("/fontStyles.css")} />
      <link rel="stylesheet" href={asset("/aditionalCss.css")} />

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
      
      {/* AOS CSS carregado com baixa prioridade */}
      <link rel="preload" href="https://unpkg.com/aos@2.3.1/dist/aos.css" as="style" onLoad="this.onload=null;this.rel='stylesheet'" />
      <noscript><link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" /></noscript>
      
      <style dangerouslySetInnerHTML={{
        __html: `
        html {
          scroll-behavior: smooth;
        }
        html, body {
          height: 100%;
          margin: 0;
        }
        .grecaptcha-badge {
          visibility: hidden;
        }
      `}} />
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
