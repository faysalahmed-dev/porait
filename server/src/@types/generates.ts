import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
  author: User;
  post: Post;
  reply?: Maybe<Array<Maybe<Comment>>>;
  likes: CommentLike;
};

export type CommentLike = {
  __typename?: 'CommentLike';
  likeCount: Scalars['Int'];
  docRefs?: Maybe<Array<CommentLikeRef>>;
};

export type CommentLikeRef = {
  __typename?: 'CommentLikeRef';
  id: Scalars['String'];
  user_id: Scalars['String'];
  post_id: Scalars['String'];
};

export type CreateComment = {
  text: Scalars['String'];
  file?: Maybe<Scalars['Upload']>;
};

export type CreatePostInput = {
  title: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  published: Scalars['Boolean'];
  file?: Maybe<Scalars['Upload']>;
};

export type EmailVerifyInput = {
  user_id: Scalars['String'];
  token: Scalars['String'];
};

export type File = {
  __typename?: 'File';
  url?: Maybe<Scalars['String']>;
};

export enum FileType {
  Avater = 'avater',
  Cover = 'cover'
}

export type ForgetPassword = {
  email: Scalars['String'];
};

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export type Image = {
  __typename?: 'Image';
  id: Scalars['String'];
  avater: Scalars['String'];
  cover: Scalars['String'];
  uploaded?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type LoggedInDevice = {
  __typename?: 'LoggedInDevice';
  current_device: LoggedInDeviceInfo;
  logged_in_devices?: Maybe<Array<Maybe<LoggedInDeviceInfo>>>;
};

export type LoggedInDeviceDetails = {
  __typename?: 'LoggedInDeviceDetails';
  country?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  range?: Maybe<Array<Maybe<Scalars['Int']>>>;
  timezone?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  ll?: Maybe<Array<Maybe<Scalars['Float']>>>;
  metro?: Maybe<Scalars['Int']>;
  area?: Maybe<Scalars['Int']>;
};

export type LoggedInDeviceInfo = {
  __typename?: 'LoggedInDeviceInfo';
  agent?: Maybe<Scalars['String']>;
  ip_address?: Maybe<Scalars['String']>;
  details?: Maybe<LoggedInDeviceDetails>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: User;
  login: User;
  forgetPassword: Scalars['String'];
  verifyPasswordResetToken?: Maybe<Scalars['String']>;
  verifyEmail?: Maybe<Scalars['String']>;
  resendVerifyEmailToken?: Maybe<Scalars['String']>;
  logoutUser?: Maybe<Scalars['String']>;
  logoutAllUser?: Maybe<Scalars['String']>;
  updateUser: User;
  uploadImage: Scalars['String'];
  updatePassword: User;
  createNewPost: Post;
  updatePost: Post;
  deletePost: Scalars['String'];
  postReact: Scalars['String'];
  createComment: Comment;
  deleteComment: Scalars['String'];
  updateComment: Comment;
  reactComment: Scalars['String'];
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationForgetPasswordArgs = {
  data: ForgetPassword;
};


export type MutationVerifyPasswordResetTokenArgs = {
  data: VerifyPasswordResetTokenInput;
};


export type MutationVerifyEmailArgs = {
  data: EmailVerifyInput;
};


export type MutationResendVerifyEmailTokenArgs = {
  user_id: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  data: UserUpdate;
};


export type MutationUploadImageArgs = {
  type: FileType;
  file: Scalars['Upload'];
};


export type MutationUpdatePasswordArgs = {
  data: UpdatePassword;
};


export type MutationCreateNewPostArgs = {
  postData: CreatePostInput;
};


export type MutationUpdatePostArgs = {
  post_id: Scalars['String'];
  postData: UpdatePostInput;
};


export type MutationDeletePostArgs = {
  post_id: Scalars['String'];
};


export type MutationPostReactArgs = {
  post_id: Scalars['String'];
  type: PostReactType;
};


export type MutationCreateCommentArgs = {
  post_id: Scalars['String'];
  data: CreateComment;
};


export type MutationDeleteCommentArgs = {
  post_id: Scalars['String'];
  comment_id: Scalars['String'];
};


export type MutationUpdateCommentArgs = {
  post_id: Scalars['String'];
  comment_id: Scalars['String'];
  data: UpdateComment;
};


export type MutationReactCommentArgs = {
  post_id: Scalars['String'];
  comment_id: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['String'];
  title: Scalars['String'];
  type: PostType;
  content?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
  file_url?: Maybe<Scalars['String']>;
  likes: PostLike;
  unlike: PostunLike;
  comments?: Maybe<Array<Maybe<Comment>>>;
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
  author: User;
  tags?: Maybe<Array<Scalars['String']>>;
};

export type PostLike = {
  __typename?: 'PostLike';
  likeCount: Scalars['Int'];
  docRefs?: Maybe<Array<PostReact>>;
};

export type PostReact = {
  __typename?: 'PostReact';
  id: Scalars['String'];
  user_id: Scalars['String'];
  post_id: Scalars['String'];
};

export enum PostReactType {
  Like = 'LIKE',
  None = 'NONE',
  Unlike = 'UNLIKE'
}

export enum PostType {
  Video = 'VIDEO',
  Image = 'IMAGE',
  Text = 'TEXT'
}

export type PostunLike = {
  __typename?: 'PostunLike';
  unlikeCount: Scalars['Int'];
  docRefs?: Maybe<Array<PostReact>>;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  authUser: User;
  loggedInDevices: LoggedInDevice;
  getPost: Post;
  getPosts?: Maybe<Array<Post>>;
  getComments?: Maybe<Array<Comment>>;
};


export type QueryGetPostArgs = {
  post_id: Scalars['String'];
};


export type QueryGetCommentsArgs = {
  post_id: Scalars['String'];
};

export type RegisterInput = {
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  gender: Gender;
};

export type Token = {
  __typename?: 'Token';
  token_id: Scalars['ID'];
  token: Scalars['String'];
  ip_address?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['String']>;
  expires_at?: Maybe<Scalars['String']>;
  device?: Maybe<Scalars['String']>;
};

export type UpdateComment = {
  text?: Maybe<Scalars['String']>;
  file?: Maybe<Scalars['Upload']>;
};

export type UpdatePassword = {
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
};

export type UpdatePostInput = {
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  published?: Maybe<Scalars['Boolean']>;
  file?: Maybe<Scalars['Upload']>;
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  email_verified: Scalars['Boolean'];
  images: Image;
  address?: Maybe<Scalars['String']>;
  gender: Gender;
  token?: Maybe<Scalars['String']>;
};

export type UserUpdate = {
  first_name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
};

export type VerifyPasswordResetTokenInput = {
  user_id: Scalars['String'];
  token: Scalars['String'];
  password: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Image: ResolverTypeWrapper<Image>;
  Gender: Gender;
  LoggedInDevice: ResolverTypeWrapper<LoggedInDevice>;
  LoggedInDeviceInfo: ResolverTypeWrapper<LoggedInDeviceInfo>;
  LoggedInDeviceDetails: ResolverTypeWrapper<LoggedInDeviceDetails>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Post: ResolverTypeWrapper<Post>;
  PostType: PostType;
  PostLike: ResolverTypeWrapper<PostLike>;
  PostReact: ResolverTypeWrapper<PostReact>;
  PostunLike: ResolverTypeWrapper<PostunLike>;
  Comment: ResolverTypeWrapper<Comment>;
  CommentLike: ResolverTypeWrapper<CommentLike>;
  CommentLikeRef: ResolverTypeWrapper<CommentLikeRef>;
  Mutation: ResolverTypeWrapper<{}>;
  RegisterInput: RegisterInput;
  LoginInput: LoginInput;
  ForgetPassword: ForgetPassword;
  VerifyPasswordResetTokenInput: VerifyPasswordResetTokenInput;
  EmailVerifyInput: EmailVerifyInput;
  UserUpdate: UserUpdate;
  FileType: FileType;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  UpdatePassword: UpdatePassword;
  CreatePostInput: CreatePostInput;
  UpdatePostInput: UpdatePostInput;
  PostReactType: PostReactType;
  CreateComment: CreateComment;
  UpdateComment: UpdateComment;
  File: ResolverTypeWrapper<File>;
  Token: ResolverTypeWrapper<Token>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  User: User;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  Image: Image;
  LoggedInDevice: LoggedInDevice;
  LoggedInDeviceInfo: LoggedInDeviceInfo;
  LoggedInDeviceDetails: LoggedInDeviceDetails;
  Int: Scalars['Int'];
  Float: Scalars['Float'];
  Post: Post;
  PostLike: PostLike;
  PostReact: PostReact;
  PostunLike: PostunLike;
  Comment: Comment;
  CommentLike: CommentLike;
  CommentLikeRef: CommentLikeRef;
  Mutation: {};
  RegisterInput: RegisterInput;
  LoginInput: LoginInput;
  ForgetPassword: ForgetPassword;
  VerifyPasswordResetTokenInput: VerifyPasswordResetTokenInput;
  EmailVerifyInput: EmailVerifyInput;
  UserUpdate: UserUpdate;
  Upload: Scalars['Upload'];
  UpdatePassword: UpdatePassword;
  CreatePostInput: CreatePostInput;
  UpdatePostInput: UpdatePostInput;
  CreateComment: CreateComment;
  UpdateComment: UpdateComment;
  File: File;
  Token: Token;
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  reply?: Resolver<Maybe<Array<Maybe<ResolversTypes['Comment']>>>, ParentType, ContextType>;
  likes?: Resolver<ResolversTypes['CommentLike'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentLikeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentLike'] = ResolversParentTypes['CommentLike']> = {
  likeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  docRefs?: Resolver<Maybe<Array<ResolversTypes['CommentLikeRef']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentLikeRefResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentLikeRef'] = ResolversParentTypes['CommentLikeRef']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  post_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  avater?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cover?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uploaded?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoggedInDeviceResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoggedInDevice'] = ResolversParentTypes['LoggedInDevice']> = {
  current_device?: Resolver<ResolversTypes['LoggedInDeviceInfo'], ParentType, ContextType>;
  logged_in_devices?: Resolver<Maybe<Array<Maybe<ResolversTypes['LoggedInDeviceInfo']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoggedInDeviceDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoggedInDeviceDetails'] = ResolversParentTypes['LoggedInDeviceDetails']> = {
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  region?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  range?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  timezone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ll?: Resolver<Maybe<Array<Maybe<ResolversTypes['Float']>>>, ParentType, ContextType>;
  metro?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  area?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoggedInDeviceInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoggedInDeviceInfo'] = ResolversParentTypes['LoggedInDeviceInfo']> = {
  agent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ip_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['LoggedInDeviceDetails']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  register?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'data'>>;
  login?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'data'>>;
  forgetPassword?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationForgetPasswordArgs, 'data'>>;
  verifyPasswordResetToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationVerifyPasswordResetTokenArgs, 'data'>>;
  verifyEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationVerifyEmailArgs, 'data'>>;
  resendVerifyEmailToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationResendVerifyEmailTokenArgs, 'user_id'>>;
  logoutUser?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  logoutAllUser?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'data'>>;
  uploadImage?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationUploadImageArgs, 'type' | 'file'>>;
  updatePassword?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdatePasswordArgs, 'data'>>;
  createNewPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationCreateNewPostArgs, 'postData'>>;
  updatePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'post_id' | 'postData'>>;
  deletePost?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'post_id'>>;
  postReact?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationPostReactArgs, 'post_id' | 'type'>>;
  createComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'post_id' | 'data'>>;
  deleteComment?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationDeleteCommentArgs, 'post_id' | 'comment_id'>>;
  updateComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationUpdateCommentArgs, 'post_id' | 'comment_id' | 'data'>>;
  reactComment?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationReactCommentArgs, 'post_id' | 'comment_id'>>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['PostType'], ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  published?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  file_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  likes?: Resolver<ResolversTypes['PostLike'], ParentType, ContextType>;
  unlike?: Resolver<ResolversTypes['PostunLike'], ParentType, ContextType>;
  comments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Comment']>>>, ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostLikeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostLike'] = ResolversParentTypes['PostLike']> = {
  likeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  docRefs?: Resolver<Maybe<Array<ResolversTypes['PostReact']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostReactResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostReact'] = ResolversParentTypes['PostReact']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  post_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostunLikeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostunLike'] = ResolversParentTypes['PostunLike']> = {
  unlikeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  docRefs?: Resolver<Maybe<Array<ResolversTypes['PostReact']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  authUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  loggedInDevices?: Resolver<ResolversTypes['LoggedInDevice'], ParentType, ContextType>;
  getPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<QueryGetPostArgs, 'post_id'>>;
  getPosts?: Resolver<Maybe<Array<ResolversTypes['Post']>>, ParentType, ContextType>;
  getComments?: Resolver<Maybe<Array<ResolversTypes['Comment']>>, ParentType, ContextType, RequireFields<QueryGetCommentsArgs, 'post_id'>>;
};

export type TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = {
  token_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ip_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expires_at?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  device?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  last_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email_verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  images?: Resolver<ResolversTypes['Image'], ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<ResolversTypes['Gender'], ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Comment?: CommentResolvers<ContextType>;
  CommentLike?: CommentLikeResolvers<ContextType>;
  CommentLikeRef?: CommentLikeRefResolvers<ContextType>;
  File?: FileResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  LoggedInDevice?: LoggedInDeviceResolvers<ContextType>;
  LoggedInDeviceDetails?: LoggedInDeviceDetailsResolvers<ContextType>;
  LoggedInDeviceInfo?: LoggedInDeviceInfoResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostLike?: PostLikeResolvers<ContextType>;
  PostReact?: PostReactResolvers<ContextType>;
  PostunLike?: PostunLikeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
