import Router from 'koa-router';
import courses from './courses/index';
import kakaomap from './kakaomap/index';
import places from './places/index';
import tags from './tags/index';

const api = new Router();

api.use('/courses', courses.routes());
api.use('/tags', tags.routes());
api.use('/places', places.routes());
api.use('/kakaomap', kakaomap.routes());
export default api;
