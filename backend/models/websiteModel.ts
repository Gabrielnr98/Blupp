import { model } from 'mongoose';
import websiteSchema, { IWebsiteSchema } from '../schema/websiteSchema';

const UserModel = model<IWebsiteSchema>('Website', websiteSchema);

export default UserModel;
