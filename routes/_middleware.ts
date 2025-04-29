import { FreshContext } from "$fresh/server.ts";

export async function handler(request: Request, ctx: FreshContext) {
  const response = await ctx.next();
  const newUrl = new URL(request.url);
  // console.log("MIDDLEWARE: " + newUrl.pathname);
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
  if (
    incomingOrigin === "lojaintegrada.com.br"
  ) {
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

  return new Response(body ?? response.body, {
    headers: response.headers,
    status: response.status,
    statusText: response.statusText,
  });
}
