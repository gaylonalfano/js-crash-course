import { Drash } from "https://deno.land/x/drash@v1.2.5/mod.ts";

export default class HomeResource extends Drash.Http.Resource {
  static paths = ["/"];

  public GET() {
    try {
      // NOTE Gotta set the body to the render()!
      this.response.body = this.response.render("/index.html");
    } catch (error) {
      throw new Drash.Exceptions.HttpException(400, "Error reading HTML file.");
    }
    return this.response;
  }
}
