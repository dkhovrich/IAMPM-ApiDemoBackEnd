import { Schema } from 'jsonschema';

export interface ILoginModel {
    email: string;
}

export const loginModelJsonSchema: Schema = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email' }
    },
    required: ['email']
};