import { JwtService } from '@nestjs/jwt';
import { createParamDecorator } from '@nestjs/common';

export const UserJwt = createParamDecorator(async (data, req) => {
  const jwtService = new JwtService({});
  const decoded = jwtService.decode(req.user.token);
  return decoded;
});