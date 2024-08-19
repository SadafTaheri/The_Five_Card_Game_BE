const seed = require("./seed");
import * as testData from "../data/test-data";

seed(
    testData.accounts_data,
    testData.profiles_data,
    testData.abilities_data,
    testData.characters_data,
    testData.decks_data
);

export {};
