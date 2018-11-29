import { UserEntity } from '../../entity/user';
import { Context } from 'koa';
import { getManager } from 'typeorm';
import JsonResponse from '../../response/response';
import userDto from '../../dto/userDto';
import * as firebase from "firebase";
import * as admin from "firebase-admin";

export default class authController {

    static async login(ctx: any) {

        await firebase.auth().signInWithEmailAndPassword(ctx.request.body.email, ctx.request.body.password).then(loginResult => {

            firebase.auth().currentUser.getIdToken().then(token => {

                ctx.body = new JsonResponse(1, 'Login successful', {
                    accessToken: token,
                    refreshToken: loginResult.refreshToken
                });

            });

        });
    }

    static async register(ctx: Context) {

        let userData = new userDto();
        Object.assign(userData, ctx.request.body);

        let user = new UserEntity();
        user.name = userData.name;
        user.email = userData.email;
        user.phone = userData.phone;

        let userRepository = getManager().getRepository(UserEntity);

        const exist = await userRepository
            .createQueryBuilder("user")
            .where("user.email = :email", { email: user.email })
            .getCount()

        if (exist) {

            ctx.body = new JsonResponse(false, 'This email address used before');

        } else {

            await admin.auth().createUser({
                email: userData.email,
                password: userData.password,
                displayName: userData.name,
                emailVerified: false
            });

            await userRepository.save(user);
            ctx.body = new JsonResponse(true);

        }

    }

}