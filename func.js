import inquirer from 'inquirer';
import chalk from 'chalk';
import { User, users } from './class.js';
export let currentUser = null;
export async function signUp() {
    const answers = await inquirer.prompt([
        { name: 'username', message: 'Enter your username:', type: 'input' },
        { name: 'password', message: 'Enter your password:', type: 'password' }
    ]);
    if (answers.username.trim() === '' || answers.password.trim() === '') {
        console.log(chalk.hex('#D70040')("Username and password cannot contain only spaces or be empty.\n"));
        return;
    }
    User.addUser(answers.username, answers.password);
}
export async function logIn(userMenu) {
    const answers = await inquirer.prompt([
        { name: 'username', message: 'Enter your username:', type: 'input' },
        { name: 'password', message: 'Enter your password:', type: 'password' }
    ]);
    if (answers.username.trim() === '' || answers.password.trim() === '') {
        console.log(chalk.hex('#D70040')("Username and password cannot contain only spaces or be empty.\n"));
        return;
    }
    if (User.isUser(answers.username, answers.password)) {
        currentUser = answers.username;
        console.log(chalk.hex('#32CD32')(`Welcome back, ${currentUser}!\n`));
        await userMenu();
    }
    else {
        console.log(chalk.hex('#D70040')("Invalid username or password.\n"));
    }
}
export async function checkBalance() {
    if (currentUser) {
        const user = User.getUser(currentUser);
        if (user) {
            console.log(chalk.hex('#32CD32')(`Your balance is Rs. ${user.getBalance()}\n`));
        }
        else {
            console.log(chalk.hex('#D70040')("User not found.\n"));
        }
    }
    else {
        console.log(chalk.hex('#D70040')("You need to log in first.\n"));
    }
}
export async function deposit() {
    if (currentUser) {
        const answer = await inquirer.prompt([
            { name: 'amount', message: 'Enter the amount to deposit:', type: 'number' }
        ]);
        if (answer.amount > 0) {
            const user = User.getUser(currentUser);
            if (user) {
                user.deposit(answer.amount);
                users[currentUser].balance = user.getBalance();
                console.log(chalk.hex('#32CD32')(`Rs. ${answer.amount} deposited successfully. New balance: Rs. ${users[currentUser].balance}\n`));
            }
        }
        else {
            console.log(chalk.hex('#D70040')("Please enter a valid amount.\n"));
        }
    }
    else {
        console.log(chalk.hex('#D70040')("You need to log in first.\n"));
    }
}
export async function withdraw() {
    if (currentUser) {
        const answer = await inquirer.prompt([
            { name: 'amount', message: 'Enter the amount to withdraw:', type: 'number' }
        ]);
        if (answer.amount > 0) {
            const user = User.getUser(currentUser);
            if (user) {
                const oldBalance = user.getBalance();
                user.withdraw(answer.amount);
                users[currentUser].balance = user.getBalance();
                if (answer.amount <= oldBalance) {
                    console.log(chalk.hex('#32CD32')(`Rs. ${answer.amount} withdrawn successfully. New balance: Rs. ${users[currentUser].balance}\n`));
                }
            }
        }
        else {
            console.log(chalk.hex('#D70040')("Please enter a valid amount.\n"));
        }
    }
    else {
        console.log(chalk.hex('#D70040')("You need to log in first.\n"));
    }
}
export async function transfer() {
    if (currentUser) {
        const answers = await inquirer.prompt([
            { name: 'recipient', message: 'Enter the recipient username:', type: 'input' },
            { name: 'amount', message: 'Enter the amount to transfer:', type: 'number' }
        ]);
        if (answers.amount > 0) {
            const sender = User.getUser(currentUser);
            const recipient = User.getUser(answers.recipient);
            if (sender && recipient) {
                sender.transfer(answers.amount, recipient);
                users[currentUser].balance = sender.getBalance();
                users[answers.recipient].balance = recipient.getBalance();
            }
            else {
                console.log(chalk.hex('#D70040')("Invalid recipient or amount.\n"));
            }
        }
        else {
            console.log(chalk.hex('#D70040')("Please enter a valid amount.\n"));
        }
    }
    else {
        console.log(chalk.hex('#D70040')("You need to log in first.\n"));
    }
}
