import assign from 'lodash/assign';
import userQueryResolver from './user/query';
import postQueryResolver from './post/post.query';

export default assign({}, userQueryResolver, postQueryResolver);
