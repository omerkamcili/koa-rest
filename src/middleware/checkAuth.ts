import { Context } from 'koa';
import * as admin from 'firebase-admin';

const checkAuth = async (ctx: Context, next) => {

    const authorization = ctx.req.headers['authorization'];
    const checkRevoked = true;
    await admin.auth().verifyIdToken(authorization, checkRevoked).then((decodedToken) => {
        ctx.state.user = decodedToken;
    });

    return next();

}

export { checkAuth }