import { serve } from "https://deno.land/std/http/server.ts";

function getCurrentISTDateTime(): string {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const formatter = new Intl.DateTimeFormat("en-IN", options);
  return formatter.format(new Date());
}

async function handler(req: Request): Promise<Response> {
  if (req.method === "GET") {
    const currentTime = getCurrentISTDateTime();
    return new Response(
      JSON.stringify({
        datetime: currentTime,
        timezone: "IST",
        timestamp: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: {
          "content-type": "application/json",
          "access-control-allow-origin": "*",
        },
      }
    );
  }

  return new Response("Method not allowed", { status: 405 });
}

await serve(handler, { port: 8000 });
