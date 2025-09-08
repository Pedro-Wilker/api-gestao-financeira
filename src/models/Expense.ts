import { Table, Column, Model, DataType, AllowNull, Default, CreatedAt, UpdatedAt, DeletedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { User } from './User';

export interface ExpenseAttributes {
    id: string;
    user_id: string;
    description: string;
    amount: number;
    date: string;
    category: 'food' | 'transport' | 'housing' | 'entertainment' | 'health' | 'other';
    is_recurring: boolean;
    currency: string;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date | null; 
    user?: User;
}

export type CreateExpenseAttributes = Optional<ExpenseAttributes, 'id' | 'created_at' | 'updated_at' | 'deleted_at' | 'user'>;

@Table({ tableName: 'expenses', paranoid: true })
export class Expense extends Model<ExpenseAttributes, CreateExpenseAttributes> {
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID, primaryKey: true })
    id!: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID })
    user_id!: string;

    @AllowNull(false)
    @Column(DataType.STRING(255))
    description!: string;

    @AllowNull(false)
    @Column(DataType.DECIMAL(10, 2))
    amount!: number;

    @AllowNull(false)
    @Column(DataType.DATEONLY)
    date!: string;

    @Default('other')
    @Column(DataType.ENUM('food', 'transport', 'housing', 'entertainment', 'health', 'other'))
    category!: 'food' | 'transport' | 'housing' | 'entertainment' | 'health' | 'other';

    @Default(false)
    @Column(DataType.BOOLEAN)
    is_recurring!: boolean;

    @Default('BRL')
    @Column(DataType.STRING(3))
    currency!: string;

    @CreatedAt
    created_at!: Date;

    @UpdatedAt
    updated_at!: Date;

    @AllowNull(true)
    @DeletedAt
    deleted_at?: Date | null;

    @BelongsTo(() => User)
    user!: User;
}

export type CreateExpenseInput = CreateExpenseAttributes;