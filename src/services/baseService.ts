import mongoose from 'mongoose';

type Action = () => Promise<any>;

abstract class BaseService {
    protected async handleConnection(action: Action): Promise<any> {
        try {
            await mongoose.connect(process.env.MONGODB_URI);
            return await action();
        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            await mongoose.connection.close();
        }
    }
}

export default BaseService;