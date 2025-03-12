import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import TalkModal from "site/components/ui/TalkModal.tsx";
import Theme from "../sections/Theme/Theme.tsx";
import { Context } from "@deco/deco";
import CreateStoreModal from "site/islands/CreateStoreModal.tsx";
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

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />
      <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{
        __html: `html {
          scroll-behavior: smooth;
          }`}} />
      <style dangerouslySetInnerHTML={{
        __html: `
        @font-face {
            font-family: "Galaxie Copernicus";
            src: url("/fonts/GalaxieCopernicus-Bold.otf") format("opentype");
            font-weight: 700;
            font-style: normal;
        }

        @font-face {
            font-family: "Galaxie Copernicus";
            src: url("/fonts/GalaxieCopernicus-BoldItalic.otf") format("opentype");
            font-weight: 700;
            font-style: italic;
        }

        @font-face {
            font-family: "Galaxie Copernicus";
            src: url("/fonts/GalaxieCopernicus-Medium.otf") format("opentype");
            font-weight: 500;
            font-style: normal;
        }

        @font-face {
            font-family: "Galaxie Copernicus";
            src: url("/fonts/GalaxieCopernicus-MediumItalic.otf") format("opentype");
            font-weight: 500;
            font-style: italic;
        }

        @font-face {
            font-family: "Galaxie Copernicus";
            src: url("/fonts/GalaxieCopernicus-Extrabold.otf") format("opentype");
            font-weight: 800;
            font-style: normal;
        }

        @font-face {
            font-family: "Galaxie Copernicus";
            src: url("/fonts/GalaxieCopernicus-ExtraboldItalic.otf") format("opentype");
            font-weight: 800;
            font-style: italic;
        }

        @font-face {
            font-family: "Galaxie Copernicus";
            src: url("/fonts/GalaxieCopernicus-Heavy.otf") format("opentype");
            font-weight: 900;
            font-style: normal;
        }

        @font-face {
            font-family: "Galaxie Copernicus";
            src: url("/fonts/GalaxieCopernicus-HeavyItalic.otf") format("opentype");
            font-weight: 900;
            font-style: italic;
        }

        @font-face {
            font-family: "Galaxie Copernicus";
            src: url("/fonts/GalaxieCopernicus-Semibold.otf") format("opentype");
            font-weight: 600;
            font-style: normal;
        }

        @font-face {
            font-family: "Galaxie Copernicus";
            src: url("/fonts/GalaxieCopernicus-SemiboldItalic.otf") format("opentype");
            font-weight: 600;
            font-style: italic;
        }

      `}} />
    </Head>

    {/* Rest of Preact tree */}
    <ctx.Component />
    <TalkModal />
    <CreateStoreModal />
    <TimeModal />
    <SecondTimeModal />
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script dangerouslySetInnerHTML={{
      __html: `
      AOS.init({startEvent: 'load'});
      `}}>
    </script>

    <script defer dangerouslySetInnerHTML={{
      __html: `
        var fired = false;
        window.addEventListener('DOMContentLoaded', function () {
          
          if (fired === false) {
            var recaptchaScript = document.createElement('script');
            recaptchaScript.src = 'https://www.google.com/recaptcha/api.js?render=6LfheeYUAAAAAI0qgRFQjLgyj3HmMp1TXLNK2R18';
            recaptchaScript.defer = true;
            document.body.appendChild(recaptchaScript);
            fired = true;
           
            console.log('On scroll fired');
          }
        }, true);`}}>
    </script>
  </>);
});
