import BaseService from './baseService';
import { IHeroDto, IHeroModel, Hero, HeroDto } from '../models/heroModel';
import NotFoundError from '../errors/notFoundError';

class HeroesService extends BaseService {
    async getById(id: string, userId: string): Promise<IHeroDto> {
        return await this.handleConnection<IHeroDto>(async () => {
            const hero: IHeroModel = await this.getHeroById(id, userId);
            if (!hero) {
                throw new NotFoundError();
            }

            return HeroDto.create(hero);
        });
    }

    async getAll(userId: string): Promise<IHeroDto[]> {
        return await this.handleConnection<IHeroDto[]>(async () => {
            const heroes: IHeroModel[] = await Hero.find({ userId });
            return heroes.map(HeroDto.create);
        });
    }

    async create(model: IHeroDto, userId: string): Promise<IHeroDto> {
        return await this.handleConnection<IHeroDto>(async () => {
            const data = Object.assign({}, model, { userId });
            const hero: IHeroModel = await Hero.create(data);
            return HeroDto.create(hero);
        });
    }

    async update(model: IHeroDto, id: string, userId: string): Promise<IHeroDto> {
        return await this.handleConnection<IHeroDto>(async () => {
            if (!await this.isHeroExists(id, userId)) {
                throw new NotFoundError();
            }

            const data = Object.assign({}, model, { userId });
            await Hero.updateOne({ _id: id }, data);

            const hero: IHeroModel = await this.getHeroById(id, userId);
            return HeroDto.create(hero);
        });
    }

    async delete(id: string, userId: string): Promise<void> {
        return await this.handleConnection<void>(async () => {
            if (!await this.isHeroExists(id, userId)) {
                throw new NotFoundError();
            }

            await Hero.deleteOne(({ _id: id }));
        });
    }

    private async getHeroById(id: string, userId: string): Promise<IHeroModel> {
        return await Hero.findOne({ _id: id, userId });
    }

    private async isHeroExists(id: string, userId: string): Promise<boolean> {
        const hero: IHeroModel = await this.getHeroById(id, userId);
        return !!hero;
    }
}

export default new HeroesService();