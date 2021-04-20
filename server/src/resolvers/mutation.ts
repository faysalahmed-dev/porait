import { IResolvers } from 'graphql-tools';
import { authResolvers } from './auth.mutation';
import { userResolvers } from './user.mutation';
import assign from 'lodash/assign';

const UserResolver: IResolvers = assign({}, authResolvers, userResolvers);

export default UserResolver;
