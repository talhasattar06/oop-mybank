import chalk from 'chalk';
export let users = {};
export class User {
    username;
    password;
    balance;
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.balance = 0;
    }
    getBalance() {
        return this.balance;
    }
    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
        }
        else {
            console.log(chalk.hex('#D70040')("Please enter a valid deposit amount.\n"));
        }
    }
    withdraw(amount) {
        if (amount <= 0) {
            console.log(chalk.hex('#D70040')("Please enter a valid withdrawal amount.\n"));
        }
        else if (amount > this.balance) {
            console.log(chalk.hex('#D70040')("Insufficient balance!\n"));
        }
        else {
            this.balance -= amount;
        }
    }
    transfer(amount, recipient) {
        if (amount <= 0) {
            console.log(chalk.hex('#D70040')("Please enter a valid transfer amount.\n"));
        }
        else if (amount > this.balance) {
            console.log(chalk.hex('#D70040')("Insufficient balance!\n"));
        }
        else if (this.username === recipient.username) {
            console.log(chalk.hex('#D70040')(`You cannot transfer money to yourself.\n`));
        }
        else {
            this.balance -= amount;
            recipient.deposit(amount);
            console.log(chalk.hex('#32CD32')(`Rs. ${amount} transferred successfully to ${recipient.username}.\n`));
        }
    }
    static isUser(username, password) {
        return users[username] && users[username].password === password;
    }
    static getUser(username) {
        const userAccount = users[username];
        if (userAccount) {
            const user = new User(username, userAccount.password);
            user.balance = userAccount.balance;
            return user;
        }
        return null;
    }
    static addUser(username, password) {
        if (!users[username]) {
            users[username] = { password, balance: 0 };
            console.log(chalk.hex('#32CD32')("Sign up successful! Please log in.\n"));
        }
        else {
            console.log(chalk.hex('#D70040')("Username already exists. Please log in.\n"));
        }
    }
}
