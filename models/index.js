import modelsLoader from '../core/modelsLoader';


import New from './New';
import Post from './Post';
import Tag from './Tag';
import User from './User';



export default async () => modelsLoader([New, Post, Tag, User]);