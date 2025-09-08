import { Request, Response } from 'express';
import { patchUserPhotoService } from '../../services/users/patchUserPhotoService';

export const patchUserPhotoController = async (req: Request, res: Response) => {
    try {
        const profile_photo = req.file?.filename;
        if (!profile_photo) throw new Error('No photo provided');
        const user = await patchUserPhotoService(req.params.id, profile_photo);
        res.json(user);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};