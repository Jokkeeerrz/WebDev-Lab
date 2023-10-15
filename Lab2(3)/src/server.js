"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = __importDefault(require("node:http"));
const node_fs_1 = __importDefault(require("node:fs"));
const pg_1 = require("pg");
const querystring_1 = __importDefault(require("querystring"));
const node_crypto_1 = __importDefault(require("node:crypto"));
const client = new pg_1.Client({
    host: 'localhost',
    user: 'postgres',
    port: 5433,
    password: 'jppineda2002',
    database: 'Loans'
});
client.connect();
function handleRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = req.url;
        const method = req.method;
        console.log('Debugging is -- url is', url, 'while method is', method);
        if (url === '/apply-loan') {
            const contents = node_fs_1.default.readFileSync('../index.html', 'utf-8');
            res
                .writeHead(200, { 'Content-Type': 'Text/html' })
                .end(contents.toString());
        }
        else if (url === '/apply-loan-success' && method === 'POST') {
            let body = '';
            req.on('data', (data) => {
                body += data.toString();
            });
            req.on('end', () => {
                const formData = querystring_1.default.parse(body);
                const name = formData.name;
                const email = formData.email;
                const phone = formData.phone;
                const loanAmount = formData.loan_amount;
                const reason = formData.reason;
                const status = 'APPLIED';
                const token = node_crypto_1.default.randomBytes(32).toString('base64url');
                const query = `INSERT INTO debts (
        name, email, phone, loan_amount, reason, status, unique_token)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`;
                const values = [name, email, phone, loanAmount, reason, status, token];
                client.query(query, values, (err, res) => {
                    if (!err) {
                        console.log(res);
                    }
                    else {
                        console.log(err);
                    }
                });
                const html = `
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
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(html);
            });
        }
        else {
            res.writeHead(200);
            res.end('You sent me:' + url);
        }
    });
}
const server = node_http_1.default.createServer(handleRequest);
server.listen(3000, () => {
    console.log('Server started at http://localhost:3000');
});
