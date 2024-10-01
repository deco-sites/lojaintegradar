import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import TalkModal from "site/components/ui/TalkModal.tsx";
import Theme from "../sections/Theme/Theme.tsx";
import { Context } from "@deco/deco";
import CreateStoreModal from "site/islands/CreateStoreModal.tsx";
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

    </Head>

    {/* Rest of Preact tree */}
    <ctx.Component />
    <TalkModal />
    <CreateStoreModal />
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script dangerouslySetInnerHTML={{
      __html: `
      AOS.init({startEvent: 'load'});
      `}}>
    </script>
  </>);
});
