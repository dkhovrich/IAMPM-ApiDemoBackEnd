import express, { Request, Response, Router } from 'express';

import asyncMiddleware from '../middleware/asyncMiddleware';
import jsonSchemaMiddleware from '../middleware/jsonSchemaMiddleware';

import HeroesService from '../services/heroesService';
import { IHeroDto, heroModelJsonSchema } from '../models/heroModel';

const router: Router = express.Router();

router.get('/:id', asyncMiddleware(async (req: Request, res: Response) => {
    const hero: IHeroDto = await HeroesService.getById(req.params.id, req.user.id);
    res.send(hero);
}));

router.get('/', asyncMiddleware(async (req: Request, res: Response) => {
    const heroes: IHeroDto[] = await HeroesService.getAll(req.user.id);
    res.send(heroes);
}));

router.post('/', jsonSchemaMiddleware(heroModelJsonSchema), asyncMiddleware(async (req: Request, res: Response) => {
    const hero: IHeroDto = await HeroesService.create(req.body, req.user.id);
    res.send(hero);
}));

router.put('/:id', jsonSchemaMiddleware(heroModelJsonSchema), asyncMiddleware(async (req: Request, res: Response) => {
    const hero: IHeroDto = await HeroesService.update(req.body, req.params.id, req.user.id);
    res.send(hero);
}));

router.delete('/:id', asyncMiddleware(async (req: Request, res: Response) => {
    await HeroesService.delete(req.params.id, req.user.id);
    res.send(200);
}));

export default router;