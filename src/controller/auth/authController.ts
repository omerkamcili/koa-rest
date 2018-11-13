import { UserEntity } from '../../entity/user';
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

            await userRepository.save(user);
            ctx.body = new JsonResponse(true);

        }

    }

}