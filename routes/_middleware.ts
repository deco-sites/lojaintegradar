import { FreshContext } from "$fresh/server.ts";

export async function handler(_request: Request, ctx: FreshContext) {
  const response = await ctx.next();

  if (response.headers.get("Content-Type") === "text/html") {
    const body = (await response.text())
      .replaceAll('href="/', 'href="https://lojaintegradar.deco.site/')
      .replaceAll('src="/', 'src="https://lojaintegradar.deco.site/')
      .replaceAll('action="/', 'action="https://lojaintegradar.deco.site/')
      .replaceAll('url("/', 'url("https://lojaintegradar.deco.site/')
      .replaceAll('url("/"', 'url("https://lojaintegradar.deco.site/')
      .replaceAll('srcset="/', 'srcset="https://lojaintegradar.deco.site/')
      .replaceAll('"/_frsh/', '"https://lojaintegradar.deco.site/_frsh/');

    response.headers.set("x-middleware-processed", "1");
  
    return new Response(body, {
      headers: response.headers,
      status: response.status,
      statusText: response.statusText,
    });
  }

  return response;
}