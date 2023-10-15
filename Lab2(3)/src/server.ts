import http, { IncomingMessage, ServerResponse } from 'node:http';
import fs from 'node:fs';
import { Client } from 'pg';
import queryString from 'querystring';
import crypto from 'node:crypto';

const client = new Client ({
  host: 'localhost',
  user: 'postgres',
  port: 5433,
  password: 'jppineda2002',
  database: 'Loans'
});

client.connect();

async function handleRequest(req: IncomingMessage, res: ServerResponse) {
  const url = req.url;
  const method = req.method;
  
  console.log('Debugging is -- url is', url, 'while method is', method);

  if (url === '/apply-loan') {
    const contents = fs.readFileSync('../index.html', 'utf-8');
      res
        .writeHead(200, { 'Content-Type': 'Text/html' })
        .end(contents.toString());
  } else if (url === '/apply-loan-success' && method === 'POST') {
    let body = '';

    req.on('data', (data) => {
      body += data.toString();
    });

    req.on('end', () => {
      const formData = queryString.parse(body);

      const name = formData.name
      const email = formData.email
      const phone = formData.phone
      const loanAmount = formData.loan_amount
      const reason = formData.reason
      const status = 'APPLIED'
      const token = crypto.randomBytes(32).toString('base64url')

      const query = `INSERT INTO debts (
        name, email, phone, loan_amount, reason, status, unique_token)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`;

      const values = [name, email, phone, loanAmount, reason, status, token];

      client.query(query, values, (err, res) => {
        if (!err) {
          console.log(res);
        } else {
          console.log(err);
        }
      })
      
      const html =`
      <!DOCTYPE html>
      <html lang="en">

      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>loans</title>
      </head>

      <body>
        Form submitted successfully! <br>
        Here is what you submitted <br>
        Name: ${name} <br>
        Email: ${email} <br>
        Phone: ${phone} <br>
        Loan Amount: ${loanAmount} <br>
        Reason: ${reason} <br>
      </body>

      </html>
      `;
    res.writeHead(200, { 'Content-Type': 'text/html'});
    res.end(html);
    });
  } else {
    res.writeHead(200);
    res.end('You sent me:' + url);
  }
}

const server = http.createServer(handleRequest);

server.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});