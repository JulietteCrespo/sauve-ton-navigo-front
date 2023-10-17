import { Users } from "../models/users.model";
import {Resolve} from "@angular/router";
import { UsersService } from "../services/users.service";
import { Injectable } from "@angular/core";
@Injectable({
    providedIn: "root",
})
export class UsersResolver implements Resolve<Users[]>{

    constructor(private usersService: UsersService){}

    resolve() {
        return this.usersService.findAll()
    }
}
