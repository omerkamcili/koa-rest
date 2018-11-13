import { Entity } from 'typeorm';
import { UserEntity } from './../../entity/user';
import { Context } from 'koa';
import JsonResponse from '../../response/response';
import { getManager } from 'typeorm';
import * as firebase from "firebase";
import * as admin from "firebase-admin";
import { firebaseClientConfig } from '../../firebase';

export default class userController {

    static async getAllUsers(ctx: Context) {

        const userRepository = getManager().getRepository(UserEntity);

        let users = await userRepository
            .createQueryBuilder("user")
            .getMany();

        ctx.body = new JsonResponse(true, "ok", users);

    }

    static async getUser(ctx: Context) {

        const userRepository = getManager().getRepository(UserEntity);
        let user_id = ctx.params.user_id || 0;

        let user = await userRepository
            .createQueryBuilder("user")
            .where("user.id = :user_id", { user_id: user_id })
            .leftJoinAndSelect("user.photos", "photos")
            .leftJoinAndSelect("user.address", "address")
            .getOne()

        ctx.body = user;

    }

}