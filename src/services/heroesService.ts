import BaseService from './baseService';
import { IHeroDto, IHeroModel, Hero, HeroDto } from '../models/heroModel';
import NotFoundError from '../errors/notFoundError';
import ConflictError from '../errors/conflictError';

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
            if (await Hero.findOne({ email: model.email, userId })) {
                throw new ConflictError();
            }

            const data = Object.assign({}, model, { userId });
            const hero: IHeroModel = await Hero.create(data);
            return HeroDto.create(hero);
        });
    }

    async update(model: IHeroDto, id: string, userId: string): Promise<IHeroDto> {
        return await this.handleConnection<IHeroDto>(async () => {
            if (!await this.isHeroExistsById(id, userId)) {
                throw new NotFoundError();
            }

            if (await Hero.findOne({ email: model.email, userId, _id: { $ne: id } })) {
                throw new ConflictError();
            }

            const data = Object.assign({}, model, { userId });
            await Hero.updateOne({ _id: id }, data);

            const hero: IHeroModel = await this.getHeroById(id, userId);
            return HeroDto.create(hero);
        });
    }

    async delete(id: string, userId: string): Promise<void> {
        return await this.handleConnection<void>(async () => {
            if (!await this.isHeroExistsById(id, userId)) {
                throw new NotFoundError();
            }

            await Hero.deleteOne(({ _id: id }));
        });
    }

    private async getHeroById(id: string, userId: string): Promise<IHeroModel> {
        return await Hero.findOne({ _id: id, userId });
    }

    private async isHeroExistsById(id: string, userId: string): Promise<boolean> {
        const hero: IHeroModel = await this.getHeroById(id, userId);
        return !!hero;
    }
}

export default new HeroesService();