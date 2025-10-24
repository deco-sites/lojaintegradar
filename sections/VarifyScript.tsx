import { Head } from "$fresh/runtime.ts";
import { useScript } from "deco/hooks/useScript.ts";

export default function VarifyScript() {
  // Função inline para carregar Varify sob demanda
  const loadVarify = (iid: number) => {
    if (window.varify?.loaded) return;
    
    window.varify = window.varify || {};
    window.varify.iid = iid;
    window.varify.loaded = true;
    
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://app.varify.io/varify.js';
    document.head.appendChild(script);
  };

  return (
    <>
      <Head>
        {/* DNS Prefetch em vez de preconnect */}
        <link rel="dns-prefetch" href="https://app.varify.io" />
      </Head>

      {/* Lazy load Varify: carrega após interação ou timeout */}
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const loadVarifyOnce = () => {
                ${useScript(loadVarify, 4357)}
                ['scroll', 'mousemove', 'touchstart', 'click'].forEach(e => 
                  window.removeEventListener(e, loadVarifyOnce)
                );
              };
              
              ['scroll', 'mousemove', 'touchstart', 'click'].forEach(e => 
                window.addEventListener(e, loadVarifyOnce, { once: true, passive: true })
              );
              
              setTimeout(loadVarifyOnce, 4000);
            })();
          `
        }}
      />
    </>
  );
}
