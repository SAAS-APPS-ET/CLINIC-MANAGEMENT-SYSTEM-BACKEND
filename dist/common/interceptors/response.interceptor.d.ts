import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { type Observable } from 'rxjs';
export type ApiResponse<T> = {
    success: true;
    data: T;
};
export declare class ResponseInterceptor implements NestInterceptor {
    intercept<T>(_context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponse<T>>;
}
