import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class DomainGuard implements CanActivate {
	constructor(private readonly allowed: Array<'api' | 'short' | 'web'>) {}

	canActivate(context: ExecutionContext): boolean {
		const req = context.switchToHttp().getRequest<Request>();
		return this.allowed.includes(req['domainType'] as 'api' | 'short' | 'web');
	}
}
