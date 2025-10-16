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

      {/* Tailwind v3 CSS file */}
      <link href={asset(`/styles.css?revision=${revision}`)} rel="stylesheet" />
      <meta charset="UTF-8"/>
      <link rel="stylesheet" href={asset("/fontStyles.css")} />
      <link rel="stylesheet" href={asset("/aditionalCss.css")} />

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
      // Captura todos os parâmetros que começam com "utm_"
      for (const [key, value] of params.entries()) {
        if (key.startsWith('utm_')) {
          utms[key] = value;
        }
      }
      // Adiciona os utm ao href de todos os links
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
    
    <script defer dangerouslySetInnerHTML={{
      __html: `
        var fired = false;
        window.addEventListener('DOMContentLoaded', function () {
          
          if (fired === false) {
            var recaptchaScript = document.createElement('script');
            recaptchaScript.src = 'https://www.google.com/recaptcha/api.js?render=6LdRdTErAAAAAJTiQW_hUzJxve5303X3lyy1UjA_';
            recaptchaScript.defer = true;
            document.body.appendChild(recaptchaScript);
            fired = true;
           
            console.log('On scroll fired');
          }
        }, true);`}}>
    </script>
    <script dangerouslySetInnerHTML={{__html: `
      document.addEventListener("DOMContentLoaded", function () {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;

      document.head.appendChild(script);
    });`}}/>
  </>);
});
