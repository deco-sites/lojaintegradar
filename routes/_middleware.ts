import { FreshContext } from "$fresh/server.ts";
import "jsr:@std/dotenv/load";

export async function handler(request: Request, ctx: FreshContext) {
  let incomingOrigin = new URL(request.url).origin;
  const isLocalhost = Deno.env.get("IS_LOCALHOST");
  if (
    incomingOrigin.includes(".deco.site") &&
    incomingOrigin.startsWith("http://") &&
    isLocalhost
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

    return new Response(body, {
      headers: response.headers,
      status: response.status,
      statusText: response.statusText,
    });
  }

  return response;
}
