import { IResolvers } from 'graphql-tools';
import Mutation from './mutation';
import Query from './query';
import Post from './post/post';

const resolver: IResolvers = {
	Query,
	Mutation,
	Post
};

export default resolver;
