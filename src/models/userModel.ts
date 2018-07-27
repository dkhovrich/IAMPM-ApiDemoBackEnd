import { Document, Schema, Model, model } from 'mongoose';

export interface IUserModel extends Document {
    email: string;
}

export const schema = new Schema({
    email: String,
}, { timestamps: true });

export const User: Model<IUserModel> = model<IUserModel>('User', schema);

export interface IUserDto {
    id: string;
    email: string;
}

export class UserDto implements IUserDto {
    id: string;
    email: string;

    static create(user: IUserModel): IUserDto {
        const dto = new UserDto();
        dto.id = user.id;
        dto.email = user.email;

        return dto;
    }
}