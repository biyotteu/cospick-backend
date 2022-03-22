import Router from 'koa-router';
import * as kakamapCtrl from './kakaomap.ctrl';
import koaBody from 'koa-body';

const kakaomap = new Router();

kakaomap.get('/', kakamapCtrl.getMap);
kakaomap.get('/search', kakamapCtrl.search);
export default kakaomap;
