import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(private readonly cacheManager: Cache) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const key = context.switchToHttp().getRequest().url;

    return next.handle().pipe(
      tap(async data => {
        await this.cacheManager.set(key, data, { ttl: 600 } as any);
      }),
    );
  }
}
