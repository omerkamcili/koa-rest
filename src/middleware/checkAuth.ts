import { Context } from 'koa';
import * as admin from 'firebase-admin';

const checkAuth = async (ctx: Context, next) => {

    const authorization = ctx.req.headers['authorization'];
    await admin.auth().verifyIdToken(authorization).then((decodedToken) => {
        ctx.state.user = decodedToken;
    });

    return next();

}

export { checkAuth }