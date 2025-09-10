import { Table, Column, Model, DataType, Unique, Default, CreatedAt, UpdatedAt, DeletedAt, HasMany } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Expense } from './Expense';
import { Income } from './Income';

export interface UserAttributes {
    id: string;
    name: string;
    email: string;
    phone?: string;
    password: string;
    profession?: string;
    profile_photo?: string;
    reset_code?: number | null;
    reset_expires?: Date | null;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date | null;
    expenses?: Expense[];
    incomes?: Income[];
}

export type CreateUserAttributes = Optional<UserAttributes, 'id' | 'created_at' | 'updated_at' | 'deleted_at' | 'reset_code' | 'reset_expires' | 'expenses' | 'incomes'>;

@Table({ tableName: 'users', paranoid: true })
export class User extends Model<UserAttributes, CreateUserAttributes> {
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID, primaryKey: true })
    id!: string;

    @Column({ type: DataType.STRING(255), allowNull: false })
    name!: string;

    @Unique
    @Column({ type: DataType.STRING(255), allowNull: false })
    email!: string;

    @Column({ type: DataType.STRING(20), allowNull: true })
    phone?: string;

    @Column({ type: DataType.STRING(255), allowNull: false })
    password!: string;

    @Column({ type: DataType.STRING(100), allowNull: true })
    profession?: string;

    @Column({ type: DataType.STRING(255), allowNull: true })
    profile_photo?: string;

    @Column({ type: DataType.INTEGER, allowNull: true })
    reset_code?: number | null;

    @Column({ type: DataType.DATE, allowNull: true })
    reset_expires?: Date | null;

    @CreatedAt
    created_at!: Date;

    @UpdatedAt
    updated_at!: Date;

    @Column({ type: DataType.DATE, allowNull: true })
    @DeletedAt
    deleted_at?: Date | null;

    @HasMany(() => Expense, { onDelete: 'CASCADE' })
    expenses!: Expense[];

    @HasMany(() => Income, { onDelete: 'CASCADE' })
    incomes!: Income[];
}

export type CreateUserInput = CreateUserAttributes;
export type UpdateUserInput = Partial<CreateUserAttributes>;