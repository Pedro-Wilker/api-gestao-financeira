import dotenv from 'dotenv';
import express, { Express } from 'express';
import cors from 'cors';
import sequelize from './database/connection';
import userRoutes from './routes/userRoutes';
import expenseRoutes from './routes/expenseRoutes';
import incomeRoutes from './routes/incomeRoutes';

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync({ logging: console.log }).then(() => {
    console.log('Database synced');
}).catch((err) => {
    console.error('Sync error:', err);
});

app.use('/api', userRoutes);
app.use('/api', expenseRoutes);
app.use('/api', incomeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});