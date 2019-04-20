import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepo } from './user.repository';
import { UserUpdateInput } from './input-types/user-update';




@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepo)
        private readonly repo: UserRepo
    ) {}

    /**
     * Returns `User` that has the given `login` if it exists.
     * @param login Target user unique login.
     */
    async getByLogin(login: string) { 
        return this.repo.getByLogin(login);
    }

    async update(data: UserUpdateInput) {
        
        return this.repo.update(
            { login: data.login },
            data
        );
    }       

}
