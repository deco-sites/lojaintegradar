import { Head } from "$fresh/runtime.ts";
import { useScript } from "deco/hooks/useScript.ts";

export default function CustomGTM() {
    // Função inline otimizada para GTM
    const loadGTM = (gtmId: string) => {
        if (window.dataLayer) return; // Evita carregamento duplicado
        
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
        });
        
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
        document.head.appendChild(script);
    };

    return (
        <>
            <Head>
                {/* DNS Prefetch (mais leve que preconnect para scripts não críticos) */}
                <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
                <link rel="dns-prefetch" href="https://www.google-analytics.com" />
            </Head>

            {/* Lazy load GTM: carrega após interação ou timeout */}
            <script 
                type="module"
                dangerouslySetInnerHTML={{
                    __html: useScript(loadGTM, "GTM-5ZPJ4T"),
                }}
            />

            <script
                type="module"
                dangerouslySetInnerHTML={{
                    __html: `
                        (function() {
                            const events = ['scroll', 'mousemove', 'touchstart', 'click'];
                            const loadGTMOnce = () => {
                                events.forEach(e => window.removeEventListener(e, loadGTMOnce));
                                ${useScript(loadGTM, "GTM-5ZPJ4T")}
                            };
                            events.forEach(e => window.addEventListener(e, loadGTMOnce, { once: true, passive: true }));
                            setTimeout(loadGTMOnce, 3000);
                        })();
                    `
                }}
            />

            {/* NoScript fallback */}
            <noscript>
                <iframe
                    src="https://www.googletagmanager.com/ns.html?id=GTM-5ZPJ4T"
                    height="0"
                    width="0"
                    style={{ display: "none", visibility: "hidden" }}
                />
            </noscript>
        </>
    );
}