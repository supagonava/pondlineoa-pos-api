import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Logger,
  Res,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response, Request as ExpressReq } from 'express';
import { LineOAEventDto } from './dto/line-oa-event.dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sso-lineid')
  async loginByLine(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    const signinResult = await this.userService.signInByLine(createUserDto);
    res.status(HttpStatus.OK).json(signinResult);
    return res;
  }

  @Post('/line-webhook')
  async handleWebhook(
    @Body() lineOAEventDto: LineOAEventDto,
    @Res() res: Response,
  ) {
    Logger.log(lineOAEventDto);
    return res.json(lineOAEventDto).status(HttpStatus.OK);
  }
}
