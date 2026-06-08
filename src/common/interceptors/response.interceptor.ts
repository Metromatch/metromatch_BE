import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../dto/api-response.dto';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    return next.handle().pipe(
      map((data) => {
        const statusCode = response.statusCode;
        
        // Handle cases where data is already formatted or has a specific message
        const message = data?.message || this.getDefaultMessage(statusCode);
        const responseData = data?.data !== undefined ? data.data : data;

        return new ApiResponse<T>(statusCode, message, responseData);
      }),
    );
  }

  private getDefaultMessage(statusCode: number): string {
    if (statusCode >= 200 && statusCode < 300) {
      return 'Success';
    }
    return 'Operation completed';
  }
}
