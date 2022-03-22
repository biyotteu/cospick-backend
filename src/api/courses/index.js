import Router from 'koa-router';
import * as coursesCtrl from './courses.ctrl';

const courses = new Router();

courses.get('/:id', coursesCtrl.getCourseById);
courses.get('/', coursesCtrl.list);
courses.post('/', coursesCtrl.write);
export default courses;
