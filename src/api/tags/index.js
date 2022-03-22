import Router from 'koa-router';
import * as tagsCtrl from './tags.ctrl';

const tags = new Router();

tags.post('/', tagsCtrl.write);
tags.get('/:id', tagsCtrl.getTagById);
// tags.get('/', tagsCtrl.list);
export default tags;
