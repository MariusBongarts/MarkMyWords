import { JwtService } from '@nestjs/jwt';
import { createParamDecorator } from '@nestjs/common';

export const Email = createParamDecorator(async (data, req) => {
  const jwtService = new JwtService({});
  const decoded = jwtService.decode(req.user.token);
  const email = decoded['email'];
  return email;
});