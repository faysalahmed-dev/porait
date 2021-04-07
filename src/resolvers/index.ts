import { IResolvers } from 'graphql-tools';
import Mutation from './mutation';
import Query from './query';

const resolver: IResolvers = {
	Query,
	Mutation
};

export default resolver;
