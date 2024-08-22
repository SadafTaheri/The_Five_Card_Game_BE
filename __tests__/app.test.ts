import request from "supertest";
import app from "../src/app";
import { Pool } from "pg";
import connection from "../db/connection";
import { setupTestDB, teardownTestDB } from "../db/setupTestDB";
const testData = require("../db/data/test-data");
import endpoints from "../src/endpoints";
const seed = require("../db/seeds/seed");

let db: Pool;

beforeAll(async () => {
  db = connection;
  await setupTestDB();
});

beforeEach(() =>
  seed(
    testData.accounts_data,
    testData.profiles_data,
    testData.abilities_data,
    testData.characters_data,
    testData.decks_data
  )
);

afterAll(async () => {
  await teardownTestDB();
  await db.end();
});

describe("GET /api", () => {
  it("respond with a json detailing all available endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body.endpoints).toEqual(endpoints);
      });
  });
});

describe("GET /api/abilities", () => {
  test("Should respond with 200 status and correct data", async () => {
    const response = await request(app).get("/api/abilities").expect(200);

    expect(response.body).toHaveLength(8);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ability_id: expect.any(Number),
          name: expect.any(String),
          description: expect.any(String),
          type: expect.any(String),
          strength: expect.any(Number),
          image_url: expect.any(String),
          ability_cost: expect.any(Number),
        }),
      ])
    );
  });
});

describe("GET /api/accounts", () => {
  test("Should respond with 200 status and correct data", async () => {
    const response = await request(app).get("/api/accounts").expect(200);

    expect(response.body).toHaveLength(7);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          account_id: expect.any(Number),
          account_name: expect.any(String),
          password: expect.any(String),
        }),
      ])
    );
  });
});

describe("GET /api/decks", () => {
  test("Should respond with 200 status and correct data", async () => {
    const response = await request(app).get("/api/decks").expect(200);

    expect(response.body).toHaveLength(7);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          deck_id: expect.any(Number),
          name: expect.any(String),
          profile_id: expect.any(Number),
        }),
      ])
    );
  });
});

describe("GET /api/characters", () => {
  test("Should respond with 200 status and correct data", async () => {
    const response = await request(app).get("/api/characters").expect(200);

    expect(response.body).toHaveLength(7);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          character_id: expect.any(Number),
          name: expect.any(String),
          health: expect.any(Number),
          damage: expect.any(Number),
          point_cost: expect.any(Number),
          shop_cost: expect.any(Number),
          ability_id: expect.any(Number),
          image_url: expect.any(String),
        }),
      ])
    );
  });
});

describe("GET /api/decks-characters", () => {
  test("Should respond with 200 status and correct data", async () => {
    const response = await request(app)
      .get("/api/decks-characters")
      .expect(200);

    expect(response.body).toHaveLength(35);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          deck_id: expect.any(Number),
          character_id: expect.any(Number),
        }),
      ])
    );
  });
});

describe("GET /api/profiles", () => {
  test("Should respond with 200 status and correct data", async () => {
    const response = await request(app).get("/api/profiles").expect(200);

    expect(response.body).toHaveLength(7);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          profile_id: expect.any(Number),
          account_id: expect.any(Number),
          username: expect.any(String),
          currency: expect.any(Number),
        }),
      ])
    );
  });
});

describe("GET /api/profiles-characters", () => {
  test("Should respond with 200 status and correct data", async () => {
    const response = await request(app)
      .get("/api/profiles-characters")
      .expect(200);

    expect(response.body).toHaveLength(35);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          profile_id: expect.any(Number),
          character_id: expect.any(Number),
        }),
      ])
    );
  });
});

describe("GET /api/characters/:character_id", () => {
  it("responds with a character object including ability details", () => {
    const expectedCharacter = {
      name: "character_1",
      health: 10,
      damage: 10,
      ability: {
        name: "ability_1",
        description: "description_1",
        type: "attack",
        strength: 1,
        ability_cost: 1,
      },
      point_cost: 100,
      imageURL: "url_1",
    };

    return request(app)
      .get("/api/characters/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.character).toEqual(expectedCharacter);
      });
  });

  it("responds with 404 for a non-existent character", () => {
    return request(app)
      .get("/api/characters/999")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Character not found");
      });
  });
  it("responds with 400 for an invalid character_id", () => {
    return request(app)
      .get("/api/characters/invalid_id")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("400 - Bad Request");
      });
  });
});
