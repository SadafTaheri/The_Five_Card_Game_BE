"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var _a = process.env.PORT, PORT = _a === void 0 ? 9090 : _a;
app_1.default.listen(PORT, function () {
    console.log("Listening on ".concat(PORT, "..."));
});
