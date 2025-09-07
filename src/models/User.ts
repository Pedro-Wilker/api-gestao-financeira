import { Table, Column, Model, DataType, AllowNull, Unique, Default, CreatedAt, UpdatedAt, DeletedAt, HasMany } from 'sequelize-typescript';
import { Expense } from './Expense';
import { Income } from './Income';

@Table({ tableName: 'users', paranoid: true }) // paranoid enables soft deletes
export class User extends Model<User> {
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID, primaryKey: true })
    id!: string;

    @AllowNull(false)
    @Column(DataType.STRING(255))
    name!: string;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING(255))
    email!: string;

    @Column(DataType.STRING(20))
    phone?: string;

    @AllowNull(false)
    @Column(DataType.STRING(255))
    password!: string;

    @Column(DataType.STRING(100))
    profession?: string;

    @Column(DataType.STRING(255))
    profile_photo?: string;

    @Column(DataType.INTEGER)
    reset_code?: number;

    @Column(DataType.DATE)
    reset_expires?: Date;

    @CreatedAt
    created_at!: Date;

    @UpdatedAt
    updated_at!: Date;

    @DeletedAt
    deleted_at?: Date;

    @HasMany(() => Expense, { onDelete: 'CASCADE' })
    expenses!: Expense[];

    @HasMany(() => Income, { onDelete: 'CASCADE' })
    incomes!: Income[];
}

export interface CreateUserInput {
    name: string;
    email: string;
    phone?: string;
    password: string;
    profession?: string;
    profile_photo?: string;
}