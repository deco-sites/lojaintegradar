import { FreshContext } from "$fresh/server.ts";

export async function handler(request: Request, ctx: FreshContext) {
  console.log("MIDDLEWARE: " + new URL(request.url).pathname);
  let incomingOrigin = new URL(request.url).origin;
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
  const response = await ctx.next();
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
