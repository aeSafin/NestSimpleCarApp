import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// папку для гвардов

@Injectable()
export class LocalAuthenticationGuard extends AuthGuard('local') {}
