import http, { IncomingMessage, ServerResponse } from 'node:http';
import fs from 'node:fs/promises';

async function handleRequest(request: IncomingMessage, response: ServerResponse) {
  const url = request.url;
  const method = request.method;

  console.log('Debugging -- url is', url, 'while method is', method);

  if (url === '/apply-loan') {
    try {
      const contents = await fs.readFile('../index.html'); /* how to read file contents again? */
      response
        .writeHead(200, { 'Content-Type': 'text/html' }) // tell the browser that you're sending HTML
        .end(contents);
    } catch (err) {
      console.log('Error reading file', err);
      response.writeHead(500);
      response.end('Interval Server Error');
    }
  } else {
    response
      // 200 tells the browser the response is successful, memorize the common ones: 200, 401, 403, 404, 500
      // see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      .writeHead(200)
      .end('You sent me:' + url);
  }
}

const server = http.createServer(handleRequest);

server.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});