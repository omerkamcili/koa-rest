import { createConnection } from 'typeorm';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import router from './router';
import JsonResponse from './response/response';
import * as admin from "firebase-admin";
import { firebaseClientConfig } from './firebase';

createConnection().then(async connection => {

    const app = new Koa();

    // Body json to ctx.body
    app.use(bodyParser());

    admin.initializeApp({
        credential: admin.credential.cert(firebaseClientConfig as any),
        databaseURL: process.env.FB_DATABASE_URL
    });

    // Handle errors
    app.use(async (ctx, next) => {
        try {

            await next();

        } catch (err) {

            console.log(err);
            ctx.status = err.statusCode || err.status || 500;
            ctx.body = new JsonResponse(false, err.message);

        }
    });

    app.use(router.routes());
    app.listen(3000);

    console.log('Server running on port 3000');

});