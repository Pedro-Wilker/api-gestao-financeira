import dotenv from 'dotenv';
import express, { Express } from 'express';
import cors from 'cors';
import sequelize from './database/connection';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sync database (remove in production)
sequelize.sync({ force: true }).then(() => {
    console.log('Database synced');
}).catch((err) => {
    console.error('Sync error:', err);
});

app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});