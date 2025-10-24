import { FreshContext } from "$fresh/server.ts";

export async function handler(request: Request, ctx: FreshContext) {
  const response = await ctx.next();
  const newUrl = new URL(request.url);
  
  // === NOVA OTIMIZAÇÃO: Cache Headers para Assets Estáticos ===
  const pathname = newUrl.pathname;
  
  // Cache agressivo para fontes (1 ano - imutáveis)
  if (pathname.endsWith('.woff2') || pathname.endsWith('.woff')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  // Cache para CSS e JS com versioning (7 dias)
  else if (pathname.endsWith('.css') || pathname.endsWith('.js')) {
    // Se tiver ?revision= na query, cache agressivo
    if (newUrl.searchParams.has('revision')) {
      response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    } else {
      // Caso contrário, cache moderado com revalidação
      response.headers.set('Cache-Control', 'public, max-age=604800, must-revalidate');
    }
  }
  
  // Cache para imagens (30 dias)
  else if (pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|avif|ico)$/i)) {
    response.headers.set('Cache-Control', 'public, max-age=2592000, immutable');
  }
  
  // Cache para outros assets estáticos do /static (1 ano)
  else if (pathname.startsWith('/static/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  // No-cache para HTML (sempre revalida)
  else if (response.headers.get("Content-Type")?.startsWith("text/html")) {
    response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
  }
  // === FIM DAS OTIMIZAÇÕES ===
  
  
  // === LÓGICA EXISTENTE (Mantida intacta) ===
  if (newUrl.pathname.includes("previews")) {
    return response;
  }
  
  let incomingOrigin = newUrl.origin;
  if (
    (incomingOrigin.includes(".deco.site") ||
      incomingOrigin.includes(".decocdn.com")) &&
    incomingOrigin.startsWith("http://")
  ) {
    incomingOrigin = incomingOrigin.replace("http://", "https://");
  }
  
  const originToRewrite = incomingOrigin === "https://lojaintegrada.com.br"
    ? "https://lojaintegradar.deco.site"
    : incomingOrigin;
  
  let body: string | undefined = undefined;
  if (response.headers.get("Content-Type")?.startsWith("text/html")) {
    body = (await response.text())
      .replaceAll('src="//js', 'src="https://js')
      .replaceAll('href="/', `href="${originToRewrite}/`)
      .replaceAll('src="/', `src="${originToRewrite}/`)
      .replaceAll('action="/', `action="${originToRewrite}/`)
      .replaceAll('url("/', `url("${originToRewrite}/`)
      .replaceAll("url(/", `url(${originToRewrite}/`)
      .replaceAll('srcset="/', `srcset="${originToRewrite}/`)
      .replaceAll(
        "landing.lojaintegrada.com.br/_frsh",
        "lojaintegrada.com.br/_frsh",
      )
      .replaceAll(" /live/invoke", ` ${originToRewrite}/live/invoke`);
  }
  
  response.headers.set("x-middleware-processed", "1");
  
  if (incomingOrigin === "lojaintegrada.com.br") {
    response.headers.set(
      "Access-Control-Allow-Origin",
      "landing.lojaintegrada.com.br",
    );
  } else {
    response.headers.set(
      "Access-Control-Allow-Origin",
      "*",
    );
  }
  // === FIM DA LÓGICA EXISTENTE ===

  return new Response(body ?? response.body, {
    headers: response.headers,
    status: response.status,
    statusText: response.statusText,
  });
}
