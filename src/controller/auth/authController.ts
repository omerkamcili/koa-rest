import { UserEntity } from '../../entity/user';
import { Context } from 'koa';
import { getManager } from 'typeorm';
import JsonResponse from '../../response/response';
import userDto from '../../dto/userDto';
import * as firebase from "firebase";
import * as admin from "firebase-admin";
import { firebaseClientConfig } from '../../firebase';


export default class authController {

    static async login(ctx: Context) {

        ctx.body = 'login'

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

            ctx.body = new JsonResponse(false, 'Email adresi daha önce kullanılmış');

        } else {

            const firebaseUser = await admin.auth().createUser({
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