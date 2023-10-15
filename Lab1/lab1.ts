import * as fs from 'fs/promises';

const filePath = 'debts.txt';

async function appendDebt(name: string, amount: number) {
  const data = `${name}, ${amount}\n`

  try {
    fs.appendFile(filePath, data); {
      console.log(`Debt for ${name} with amount ${amount} has been added`);
    }
  } catch (err) {
    console.log('Error appending debt', err);
  }
}

async function listDebts() {
  try {
      const fileData = await fs.readFile(filePath, 'utf-8');
      const debts = fileData.trim().split('\n');

      if (debts.length > 0) {
        console.log('List of Debts: ');
      } else {
        console.log('No debts found');
      }
  } catch (err) {
    console.log('Error reading debts', err);
  }
}

async function main() {
  const [command, ...args] = process.argv.slice(2);

  if (command === 'append' && args.length == 2) {
    const [name, amount] = args;
    await appendDebt(name, parseFloat(amount));
  } else if (command === 'list') {
    await listDebts();
  } else {
    console.log('Usage: ');
    console.log('node "debt_manager".ts append [name] [amount]')
    console.log('node "debt_manager".ts list');
  }
}

main();