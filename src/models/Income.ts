import { Table, Column, Model, DataType, AllowNull, Default, CreatedAt, UpdatedAt, DeletedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';

@Table({ tableName: 'incomes', paranoid: true })
export class Income extends Model<Income> {
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
    @Column(DataType.ENUM('salary', 'investment', 'freelance', 'gift', 'other'))
    source!: 'salary' | 'investment' | 'freelance' | 'gift' | 'other';

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

    @DeletedAt
    deleted_at?: Date;

    @BelongsTo(() => User)
    user!: User;
}

export interface CreateIncomeInput {
    description: string;
    amount: number;
    date: string;
    source?: 'salary' | 'investment' | 'freelance' | 'gift' | 'other';
    is_recurring?: boolean;
    currency?: string;
}