import { Head } from "$fresh/runtime.ts";

export default function VarifyScript() {
  return <>
    <Head>
      <script>
        window.varify = window.varify || {};
        window.varify.iid = 4357;
      </script>
      <script src="https://app.varify.io/varify.js"></script>
    </Head>
  </>
}