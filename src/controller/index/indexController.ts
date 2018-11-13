import { Context } from "koa";

export default class indexController{

    static async index(ctx: Context){

        ctx.body = 'welcome to api';

    }

}