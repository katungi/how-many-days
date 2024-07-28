import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const app = new Application();
const router = new Router();

const hardcodedStartTime = new Date("2024-07-28T16:00:00Z");

router.get("/time", (context) => {
  const currentTime = new Date();
  const difference = currentTime.getTime() - hardcodedStartTime.getTime();

  context.response.headers.set("Content-Type", "application/json");
  context.response.body = {
    serverTime: currentTime.toISOString(),
    difference,
  };
});

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

const port = 3000;
console.log(`Server running at http://localhost:${port}`);
await app.listen({ port });
