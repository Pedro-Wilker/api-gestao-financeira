import { Table, Column, Model, DataType, Default, CreatedAt, UpdatedAt, DeletedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { User } from './User';

export interface IncomeAttributes {
    id: string;
    user_id: string;
    description: string;
    amount: number;
    date: string;
    source: 'salary' | 'investment' | 'freelance' | 'gift' | 'other';
    is_recurring: boolean;
    currency: string;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date | null;
    user?: User;
}

export type CreateIncomeAttributes = Optional<IncomeAttributes, 'id' | 'created_at' | 'updated_at' | 'deleted_at' | 'user'>;

@Table({ tableName: 'incomes', paranoid: true })
export class Income extends Model<IncomeAttributes, CreateIncomeAttributes> {
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID, primaryKey: true })
    id!: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID, allowNull: false })
    user_id!: string;

    @Column({ type: DataType.STRING(255), allowNull: false })
    description!: string;

    @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
    amount!: number;

    @Column({ type: DataType.DATEONLY, allowNull: false })
    date!: string;

    @Default('other')
    @Column({ type: DataType.ENUM('salary', 'investment', 'freelance', 'gift', 'other'), allowNull: false })
    source!: 'salary' | 'investment' | 'freelance' | 'gift' | 'other';

    @Default(false)
    @Column({ type: DataType.BOOLEAN, allowNull: false })
    is_recurring!: boolean;

    @Default('BRL')
    @Column({ type: DataType.STRING(3), allowNull: false })
    currency!: string;

    @CreatedAt
    created_at!: Date;

    @UpdatedAt
    updated_at!: Date;

    @Column({ type: DataType.DATE, allowNull: true })
    @DeletedAt
    deleted_at?: Date | null;

    @BelongsTo(() => User)
    user!: User;
}

export type CreateIncomeInput = CreateIncomeAttributes;