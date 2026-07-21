export class SummaryModel {
    readonly budgets: number;
    readonly transactions: number;
    readonly balance: number;

    constructor(budgets: number, transactions: number, balance: number) {
        this.budgets = budgets;
        this.transactions = transactions;
        this.balance = balance;
    }
}
