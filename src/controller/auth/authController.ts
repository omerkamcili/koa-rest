import { User } from '../../entity/user';
import { Context } from 'koa';
import userDto from '../../dto/userDto';
import { getManager } from 'typeorm';
import JsonResponse from '../../response/response';

export default class authController {

    static async login(ctx: Context) {

        ctx.body = 'login'

    }

    static async register(ctx: Context) {

        let userData = new userDto();
        Object.assign(userData, ctx.request.body);

        let user = new User();
        user.name = userData.name;
        user.email = userData.email;
        user.phone = userData.phone;

        let userRepository = getManager().getRepository(User);
        await userRepository.save(user).then((foo) => {

            ctx.body = new JsonResponse(true);

        });

    }

}