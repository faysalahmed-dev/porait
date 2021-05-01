import { IResolvers } from 'graphql-tools';
import { authResolvers } from './user/auth.mutation';
import { userResolvers } from './user/user.mutation';
import { postResolvers } from './post/post.mutation';
import { commentResolvers } from './comment/comment.mutation';
import assign from 'lodash/assign';

const UserResolver: IResolvers = assign(
	{},
	authResolvers,
	userResolvers,
	postResolvers,
	commentResolvers
);

export default UserResolver;
