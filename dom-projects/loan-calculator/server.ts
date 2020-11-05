import { Drash } from "https://deno.land/x/drash@v1.2.5/mod.ts";

import HomeResource from "./home_resource.ts";

const server = new Drash.Http.Server({
  directory: ".",
  resources: [HomeResource],
  response_output: "text/html",
  static_paths: ["/public"],
  views_path: "./public/html", // Gotta use views_path if using render() helper
});

server.run({
  hostname: "localhost",
  port: 1447,
});
console.log(`Server running on http://${server.hostname}:${server.port}`);
