import { IResolvers } from 'graphql-tools';
import Mutation from './mutation';
import Query from './query';
import Post from './post/post';
import Comment from './comment/comment';

const resolver: IResolvers = {
	Query,
	Mutation,
	Post,
	Comment
};

export default resolver;
