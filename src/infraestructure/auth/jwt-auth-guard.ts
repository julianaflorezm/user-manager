import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private readonly _reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext): boolean {
    const roles: string[] = this._reflector.get('roles', context.getHandler());
    if (!roles) return true;
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    const hasRole = () => roles.includes(user.role.name);
    return user && user.role && hasRole();
  }
}
