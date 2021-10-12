import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import User from '../users/user.entity';

// папку для стратегий

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authenticationService: AuthenticationService) {
        super({
            usernameField: 'email',
        });
    }
    async validate(email: string, password: string): Promise<User> {
        return this.authenticationService.getAuthenticatedUser(email, password);
    }
}
