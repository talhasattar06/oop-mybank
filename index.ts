#! /usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import { signUp, logIn, checkBalance, deposit, withdraw, transfer, currentUser } from './func.js';
import chalkAnimation from "chalk-animation";

async function welcome() {
    let title = chalkAnimation.neon(`\n\t---------------------------------\n\t       Welcome To The Bank\n\t---------------------------------\n`, 1);
    await new Promise((resolve) => {
        setTimeout(resolve, 3000);

    });
    title.stop()

}

await welcome()

async function userMenu() {
    let running = true;

    while (running) {
        const choice = await inquirer.prompt([
            {
                name: 'action',
                message: 'What would you like to do?',
                type: 'list',
                choices: [
                    { name: chalk.hex('#0096FF')('Check Balance'), value: 'Check Balance' },
                    { name: chalk.hex('#0096FF')('Deposit'), value: 'Deposit' },
                    { name: chalk.hex('#0096FF')('Withdraw'), value: 'Withdraw' },
                    { name: chalk.hex('#0096FF')('Transfer'), value: 'Transfer' },
                    { name: chalk.hex('#0096FF')('Log Out'), value: 'Log Out' }
                ]
            }
        ]);

        switch (choice.action) {
            case 'Check Balance':
                await checkBalance();
                break;
            case 'Deposit':
                await deposit();
                break;
            case 'Withdraw':
                await withdraw();
                break;
            case 'Transfer':
                await transfer();
                break;
            case 'Log Out':
                currentUser;
                console.log(chalk.hex('#32CD32')("Logged out successfully.\n"));
                running = false;
                break;
            default:
                console.log(chalk.hex('#D70040')("Invalid option.\n"));
                break;
        }
    }
}

async function main() {
    let running = true;

    while (running) {
        const choice = await inquirer.prompt([
            {
                name: 'action',
                message: 'What would you like to do?',
                type: 'list',
                choices: [
                    { name: chalk.hex('#0096FF')('Sign Up'), value: 'Sign Up' },
                    { name: chalk.hex('#0096FF')('Log In'), value: 'Log In' },
                    { name: chalk.hex('#0096FF')('Exit'), value: 'Exit' }
                ]
            }
        ]);

        switch (choice.action) {
            case 'Sign Up':
                await signUp();
                break;
            case 'Log In':
                await logIn(userMenu);
                break;
            case 'Exit':
                running = false;
                console.log(chalk.hex('#32CD32')("Exiting application.\n"));
                break;
            default:
                console.log(chalk.hex('#D70040')("Invalid option.\n"));
                break;
        }
    }
}

main();