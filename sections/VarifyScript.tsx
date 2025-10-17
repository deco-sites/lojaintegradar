import { Head } from "$fresh/runtime.ts";

export default function VarifyScript() {
  return <>
    <Head>
      {/* OTIMIZAÇÃO: Pré-conecta ao domínio do Varify para acelerar o carregamento do script */}
      <link rel="preconnect" href="https://app.varify.io" />

      <script dangerouslySetInnerHTML={{__html: `
        window.varify = window.varify || {};
        window.varify.iid = 4357;`}}/>

      {/* OTIMIZAÇÃO: "async" e "defer" carregam o script em segundo plano sem bloquear a página */}
      <script async defer src="https://app.varify.io/varify.js"></script>
    </Head>
  </>
}