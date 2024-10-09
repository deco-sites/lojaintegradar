import { useScript } from "deco/hooks/useScript.ts";

const onLoad = () => {
    document.addEventListener("DOMContentLoaded", function () {
        // Função para rolar suavemente até o elemento alvo
        function scrollToHash() {
            const hash = window.location.hash.toLowerCase();
            if (hash) {
                const targetElement = document.querySelector(hash) as HTMLElement | undefined | null;
                if (targetElement) {
                    targetElement.scrollIntoView();
                }
            }
        }

        // Chama a função ao carregar a página
        scrollToHash();
    });
};

export default function ScrollOnLoadScript() {
    return <div>
        <script
            type="module"
            dangerouslySetInnerHTML={{ __html: useScript(onLoad) }}
        />

    </div>
}