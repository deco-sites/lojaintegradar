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

  if (response.headers.get("Content-Type")?.startsWith("text/html")) {
    const body = (await response.text())
      .replaceAll('src="//js', 'src="https://js')
      .replaceAll('href="/', `href="${originToRewrite}/`)
      .replaceAll('src="/', `src="${originToRewrite}/`)
      .replaceAll('action="/', `action="${originToRewrite}/`)
      .replaceAll('url("/', `url("${originToRewrite}/`)
      .replaceAll("url(/", `url(${originToRewrite}/`)
      .replaceAll('srcset="/', `srcset="${originToRewrite}/`)
      .replaceAll(" /live/invoke", ` ${originToRewrite}/live/invoke`);

    response.headers.set("x-middleware-processed", "1");
    response.headers.set("Access-Control-Allow-Origin", "*");

    return new Response(body, {
      headers: response.headers,
      status: response.status,
      statusText: response.statusText,
    });
  }

  return response;
}
