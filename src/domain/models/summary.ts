export class SummaryModel {
    readonly budgets: number;
    readonly balance: number;
    readonly transactions: number;
    readonly transactionsPrevMonth: number;
    readonly transactionsThisMonth: number;
    readonly spendingPrevMonth: number;
    readonly spendingThisMonth: number;

    constructor(
        budgets: number,
        balance: number,
        transactions: number,
        transactionsPrevMonth: number,
        transactionsThisMonth: number,
        spendingPrevMonth: number,
        spendingThisMonth: number,
    ) {
        this.budgets = budgets;
        this.transactions = transactions;
        this.transactionsPrevMonth = transactionsPrevMonth;
        this.transactionsThisMonth = transactionsThisMonth;
        this.spendingPrevMonth = spendingPrevMonth;
        this.spendingThisMonth = spendingThisMonth;
        this.balance = balance;
    }
}
