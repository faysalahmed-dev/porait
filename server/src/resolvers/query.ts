import assign from 'lodash/assign';
import userQueryResolver from './user/query';
import postQueryResolver from './post/post.query';
import commentQueryResolver from './comment/comment.query';

export default assign({}, userQueryResolver, postQueryResolver, commentQueryResolver);
