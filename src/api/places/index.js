import Router from 'koa-router';
import * as placesCtrl from './places.ctrl';
import koaBody from 'koa-body';

const places = new Router();

places.post('/', placesCtrl.write);
places.get('/:id', placesCtrl.getPlaceById);
places.get('/', placesCtrl.list);
export default places;
