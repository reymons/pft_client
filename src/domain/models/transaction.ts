import { CategoryModel } from "./category";
import { Model, ModelId } from "./model";

export enum TrxRecurringPeriod {
    Weekly = "weekly",
    Monthly = "monthly",
    Yearly = "yearly",
}

export const trxRecurringPeriodName: Record<TrxRecurringPeriod, string> = {
    [TrxRecurringPeriod.Weekly]: "Weekly",
    [TrxRecurringPeriod.Monthly]: "Monthly",
    [TrxRecurringPeriod.Yearly]: "Yearly",
};

export enum TransactionType {
    Income = "income",
    Expense = "expense",
}

export const transactionName: Record<TransactionType, string> = {
    [TransactionType.Income]: "Income",
    [TransactionType.Expense]: "Expense",
};

export class TransactionModel extends Model {
    readonly type: TransactionType;
    readonly name: string;
    readonly description: string;
    readonly amount: number;
    readonly createdAt: Date;
    readonly recurringPeriod: TrxRecurringPeriod | null;
    readonly category: CategoryModel;

    constructor(
        id: ModelId,
        type: TransactionType,
        name: string,
        description: string,
        amount: number,
        createdAt: Date,
        recurringPeriod: TrxRecurringPeriod | null,
        category: CategoryModel,
    ) {
        super(id);
        this.type = type;
        this.name = name;
        this.description = description;
        this.amount = amount;
        this.createdAt = createdAt;
        this.recurringPeriod = recurringPeriod;
        this.category = category;
    }

    get isIncome() {
        return this.type === TransactionType.Income;
    }

    get isRecurring() {
        return this.recurringPeriod !== null;
    }
}
