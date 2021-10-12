import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async getByEmail(email: string) {
        // вообще запросы в базу лучше в try catch пихать
        // некорректно: не выполнено условие ТЗ: "без использования ORM библиотек (чистый sql)." | для исправления оплошности исопльзовать пакет pg: https://stackoverflow.com/questions/60833520/how-can-i-use-raw-sql-in-nestjs-instead-of-typeorm-or-sequelize
        const user = await this.usersRepository.findOne({ email });
        if (user) {
            return user;
        }
        throw new HttpException(
            'User with this email does not exist',
            HttpStatus.NOT_FOUND,
        );
    }

    async create(userData: CreateUserDto) {
        // зачем так сложно? почему не сделать цепочку .crete().save()? 
        const newUser = await this.usersRepository.create(userData);
        await this.usersRepository.save(newUser);
        return newUser;
    }

    async getById(id: number) {
        const user = await this.usersRepository.findOne({ id });
        if (user) {
            return user;
        }
        throw new HttpException(
            'User with this id does not exist',
            HttpStatus.NOT_FOUND,
        );
    }
}
