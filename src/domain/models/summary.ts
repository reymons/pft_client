export class SummaryModel {
    readonly budgets: number;
    readonly transactions: number;
    readonly transactionsPrevMonth: number;
    readonly transactionsThisMonth: number;
    readonly balance: number;

    constructor(
        budgets: number,
        transactions: number,
        transactionsPrevMonth: number,
        transactionsThisMonth: number,
        balance: number,
    ) {
        this.budgets = budgets;
        this.transactions = transactions;
        this.transactionsPrevMonth = transactionsPrevMonth;
        this.transactionsThisMonth = transactionsThisMonth;
        this.balance = balance;
    }
}
