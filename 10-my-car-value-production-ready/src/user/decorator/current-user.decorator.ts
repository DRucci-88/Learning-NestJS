import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Param decoratos exist outside the DI system
 * So our decorator can't get an instance of UserService directly
 * -------
 * Solution:
 * Make an interceptor to get the current user thought UserService
 * then use the value produced by it in the decorator
 */

export const CurrentUser = createParamDecorator(
  (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data: never,
    // Wrapper around incoming request
    // Abstract a websocket, incoming request, and grpc request
    context: ExecutionContext,
  ) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser; // current-user.interceptor
  },
);
