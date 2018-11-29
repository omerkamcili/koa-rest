import { createConnection } from 'typeorm';
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import router from './router';
import JsonResponse from './response/response';
import * as admin from "firebase-admin";
import { firebaseAdminConfig, firebaseClientConfig } from './firebase';
import * as firebase from 'firebase';

createConnection().then(async connection => {

    const app = new Koa();

    app.use(bodyParser());

    firebase.initializeApp(firebaseClientConfig);

    admin.initializeApp({
        credential: admin.credential.cert(firebaseAdminConfig as any),
        databaseURL: firebaseClientConfig.databaseURL
    });

    // Handle errors
    app.use(async (ctx, next) => {
        try {

            await next();

        } catch (err) {

            ctx.status = err.statusCode || err.status || 500;
            ctx.body = new JsonResponse(false, err.message || 'Error', err);

        }
    });

    app.use(router.routes());
    app.listen(3000);

    console.log('Server running on port 3000');

});