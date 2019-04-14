import { EntityRepository, Repository } from 'typeorm';

import { User } from './user.entity';
import { HashedCredentials } from './input-types/credentials';

@EntityRepository(User)
export class UserRepo extends Repository<User> {

    async getByHashedCredentialsOrFail(where: HashedCredentials) {
        return this.findOneOrFail({ where });
    }
}