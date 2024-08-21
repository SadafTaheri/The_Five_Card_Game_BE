const seed = require("./seed");
import * as DevData from "../data/development-data";

seed(
    DevData.accounts_data,
    DevData.profiles_data,
    DevData.abilities_data,
    DevData.characters_data,
    DevData.decks_data
);

export {};
