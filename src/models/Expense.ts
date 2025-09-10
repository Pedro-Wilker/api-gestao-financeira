import { Table, Column, Model, DataType, AllowNull, ForeignKey, Default, BelongsTo } from 'sequelize-typescript';
import { User } from './User';

@Table({
    tableName: 'expenses',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
})
export class Expense extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id!: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    user_id!: string;

    @BelongsTo(() => User)
    user!: User;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    description!: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    amount!: number;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
    })
    date!: string;

    @Column({
        type: DataType.ENUM('food', 'transport', 'housing', 'entertainment', 'health', 'other'),
        defaultValue: 'other',
        allowNull: false,
    })
    category!: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    })
    is_recurring!: boolean;

    @Column({
        type: DataType.STRING(3),
        defaultValue: 'BRL',
        allowNull: false,
    })
    currency!: string;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    deleted_at?: Date;
}