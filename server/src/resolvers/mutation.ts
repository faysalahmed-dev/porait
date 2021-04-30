import { IResolvers } from 'graphql-tools';
import { authResolvers } from './user/auth.mutation';
import { userResolvers } from './user/user.mutation';
import { postResolvers } from './post/post.mutation';
import assign from 'lodash/assign';

const UserResolver: IResolvers = assign({}, authResolvers, userResolvers, postResolvers);

export default UserResolver;
