import { Document, Schema, Model, model } from 'mongoose';
import { Schema as JsonSchema } from 'jsonschema';

export interface IHeroModel extends Document {
    email: string;
    firstName: string;
    lastName: string;
    nickName: string;
    city: string;
    userId: string;
}

export const schema = new Schema({
    email: {
        type: String,
        index: true
    },
    firstName: String,
    lastName: String,
    nickName: String,
    city: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    }
}, { timestamps: true });

export const Hero: Model<IHeroModel> = model<IHeroModel>('Hero', schema);

export interface IHeroDto {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    nickName: string;
    city: string;
}

export class HeroDto implements IHeroDto {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    nickName: string;
    city: string;

    static create(hero: IHeroModel): IHeroDto {
        const dto = new HeroDto();
        dto.id = hero.id;
        dto.email = hero.email;
        dto.firstName = hero.firstName;
        dto.lastName = hero.lastName;
        dto.nickName = hero.nickName;
        dto.city = hero.city;

        return dto;
    }
}

export const heroModelJsonSchema: JsonSchema = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        nickName: { type: 'string' },
        city: { type: 'string' }
    },
    required: ['email', 'firstName', 'lastName', 'nickName', 'city']
};