import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "../index.js";
import { news } from "./testData.js";

describe("News tests", async () => {
  it("Should return hello world", async () => {
    const response = await request(app.callback()).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello World");
  });

  it("Should return news", async () => {
    const response = await request(app.callback()).get("/news");
    expect(response.status).toBe(200);
  });

  it("Should add news", async () => {
    const response = await request(app.callback()).post("/news").send(news);
    expect(response.status).toBe(200);
    const response2 = await request(app.callback()).get(
      `/news?title=${news.title}`,
    );
    expect(response2.status).toBe(200);
    expect(response2._body[0].text).toEqual(news.text);
  });

  it("Should update news", async () => {
    const newText = "Updated text";
    const response = await request(app.callback()).get(
      `/news?title=${news.title}`,
    );
    expect(response.status).toBe(200);
    let newsToUpdate = response._body[0];
    newsToUpdate.text = newText;
    const response2 = await request(app.callback())
      .put("/news")
      .send(newsToUpdate);
    expect(response2.status).toBe(200);
    const response3 = await request(app.callback()).get(
      `/news?title=${news.title}`,
    );
    expect(response3._body[0].text).toBe(newText);
  });

  it("Should delete news", async () => {
    const response = await request(app.callback()).get(
      `/news?title=${news.title}`,
    );
    expect(response.status).toBe(200);
    let newsToDelete = response._body[0];

    const response2 = await request(app.callback())
      .delete("/news")
      .send({ _id: newsToDelete._id });
    expect(response2.status).toBe(200);

    const response3 = await request(app.callback()).get(
      `/news?title=${news.title}`,
    );
    expect(response3.status).toBe(200);
    expect(response3._body.length).toBe(0);
  });
});
