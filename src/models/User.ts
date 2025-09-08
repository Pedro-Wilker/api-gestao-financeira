import { Table, Column, Model, DataType, AllowNull, Unique, Default, CreatedAt, UpdatedAt, DeletedAt, HasMany } from 'sequelize-typescript';
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
    reset_code?: number | null; // Explicitamente permitir null
    reset_expires?: Date | null; // Explicitamente permitir null
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date | null; // Explicitamente permitir null
    expenses?: Expense[];
    incomes?: Income[];
}

export type CreateUserAttributes = Optional<UserAttributes, 'id' | 'created_at' | 'updated_at' | 'deleted_at' | 'reset_code' | 'reset_expires' | 'expenses' | 'incomes'>;

@Table({ tableName: 'users', paranoid: true })
export class User extends Model<UserAttributes, CreateUserAttributes> {
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

    @AllowNull(true)
    @Column(DataType.INTEGER)
    reset_code?: number | null;

    @AllowNull(true)
    @Column(DataType.DATE)
    reset_expires?: Date | null;

    @CreatedAt
    created_at!: Date;

    @UpdatedAt
    updated_at!: Date;

    @DeletedAt
    deleted_at?: Date | null;

    @HasMany(() => Expense, { onDelete: 'CASCADE' })
    expenses!: Expense[];

    @HasMany(() => Income, { onDelete: 'CASCADE' })
    incomes!: Income[];
}

export type CreateUserInput = CreateUserAttributes;
export type UpdateUserInput = Partial<CreateUserAttributes>;