import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import TalkModal from "site/components/ui/TalkModal.tsx";
import Theme from "../sections/Theme/Theme.tsx";
import { Context } from "@deco/deco";
import TimeModal from "site/components/ui/TimeModal.tsx";
import SecondTimeModal from "site/components/ui/SecondTimeModal.tsx";

// Helper script for loading on interaction
const loadOnInteraction = `
  const scriptLoader = (src, async = true, defer = true) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = async;
    script.defer = defer;
    document.head.appendChild(script);
  };
  
  const loadScripts = () => {
    // List of scripts to load
    scriptLoader("https://www.google.com/recaptcha/api.js?render=6LdRdTErAAAAAJTiQW_hUzJxve5303X3lyy1UjA_");
    scriptLoader("https://accounts.google.com/gsi/client");
    
    // Remove listeners after firing
    window.removeEventListener("scroll", loadScripts, { once: true });
    window.removeEventListener("mousemove", loadScripts, { once: true });
    window.removeEventListener("touchstart", loadScripts, { once: true });
  };
  
  // Add listeners for the first user interaction
  window.addEventListener("scroll", loadScripts, { once: true });
  window.addEventListener("mousemove", loadScripts, { once: true });
  window.addEventListener("touchstart", loadScripts, { once: true });
`;


export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();
  return (<>
    {/* Include default fonts and css vars */}
    <Theme colorScheme="any" />

    {/* Include Icons and manifest */}
    <Head>
      {/* --- OTIMIZAÇÕES --- */}
      {/* Pré-conecta a domínios de terceiros para acelerar o carregamento */}
      <link rel="preconnect" href="https://unpkg.com" />
      <link rel="preconnect" href="https://www.google.com" />
      <link rel="preconnect" href="https://accounts.google.com" />
      
      {/* --- FIM DAS OTIMIZAÇÕES --- */}

      {/* Enable View Transitions API */}
      <meta name="view-transition" content="same-origin" />

      {/* Tailwind v3 CSS file */}
      <link href={asset(`/styles.css?revision=${revision}`)} rel="stylesheet" />
      <meta charSet="UTF-8"/>
      <link rel="stylesheet" href={asset("/fontStyles.css")} />
      <link rel="stylesheet" href={asset("/aditionalCss.css")} />

      {/* Preload IMG (Já está correto!) */}
      <link 
          rel="preload" 
          as="image" 
          href="https://assets.decocache.com/lojaintegradar/d3c45778-c9c9-4d69-a012-3cbf03347621/bg-header-new.webp"
          imagesrcset="https://sites-lojaintegradar--szzpho.decocdn.com/live/invoke/website/loaders/image.ts?src=https%3A%2F%2Fassets.decocache.com%2Flojaintegradar%2Fd3c45778-c9c9-4d69-a012-3cbf03347621%2Fbg-header-new.webp&fit=cover&width=1920&height=1080 1920w, https://sites-lojaintegradar--szzpho.decocdn.com/live/invoke/website/loaders/image.ts?src=https%3A%2F%2Fassets.decocache.com%2Flojaintegradar%2Fd3c45778-c9c9-4d69-a012-3cbf03347621%2Fbg-header-new.webp&fit=cover&width=3840&height=2160 3840w"
          fetchPriority="high"
        />

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />
      <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
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
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script dangerouslySetInnerHTML={{
      __html: `
      AOS.init({startEvent: 'load'});
      `}}>
    </script>
    
    <script defer dangerouslySetInnerHTML={{__html: `
      const params = new URLSearchParams(window.location.search);
      const utms = {};
      for (const [key, value] of params.entries()) {
        if (key.startsWith('utm_')) {
          utms[key] = value;
        }
      }
      document.querySelectorAll('a').forEach(link => {
        if (link.href) {
          const url = new URL(link.href, window.location.origin);
          Object.entries(utms).forEach(([key, value]) => {
            url.searchParams.set(key, value);
          });
          link.href = url.toString();
        }
      });
    `}}/>
    
    {/* OTIMIZAÇÃO: Carrega scripts do Google na primeira interação do usuário */}
    <script dangerouslySetInnerHTML={{ __html: loadOnInteraction }} />
  </>);
});