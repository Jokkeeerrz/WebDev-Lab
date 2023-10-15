"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = __importDefault(require("node:http"));
function handleRequest(request, response) {
    const url = request.url;
    const method = request.method;
    console.log('Debugging -- url is', url, 'while method is', method);
    response
        // 200 tells the browser the response is successful, memorize the common ones: 200, 401, 403, 404, 500
        // see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
        .writeHead(200)
        .end('You sent me:' + url);
}
const server = node_http_1.default.createServer(handleRequest);
server.listen(3000, () => {
    console.log('Server started at http://localhost:3000');
});
