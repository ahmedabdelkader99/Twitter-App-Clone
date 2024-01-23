import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import { jwtSecret } from "./constants";
import { UserLoginDto } from "./dto/login-user.inputs";
import * as bcrypt from "bcrypt";
import { JwtPayLoad } from "src/user/jwt/jwt-payload.interface";
import { UserCreateDto } from "./dto/create-user.inputs";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async register(user: UserCreateDto) {
    const { name, email, password } = user;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      const error = new Error("user exists already");
      throw error;
    }

    // NOTE: createUser was async so awit was needed and no need to assign for a variable

    await this.usersService.createUser(
      name,
      email,
      hashedPassword
    );

    // NOTE: generateToken was async so awit was needed
    return { token: this.generateToken(email) };
  }

  generateToken(email: string): string {
    const payload: JwtPayLoad = { email };
    // NOTE: Sign is sync so awit is not needed
    const accessToken: string = this.jwtService.sign({ payload });
    return accessToken;
  }
  ///////
  async login(user: UserLoginDto) {
    const { email, password } = user;
    const authuser = await this.usersService.getUserByEmail(email);
    if (!authuser) {
      const error = new Error("user not found");
      throw error;
    }
    const isEqual = await bcrypt.compare(password, authuser.password);
    if (!isEqual) {
      const error = new Error("password is incorrect");
      throw error;
    }

    return { token: this.generateToken(email) };
  }
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      const error = new Error("user not found");
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("password is incorrect");
      throw error;
    }
    return user;
  }

  async verify(token: string): Promise<User> {
    const decoded = this.jwtService.verify(token, {
      secret: jwtSecret,
    });
    const user = this.usersService.getUserByEmail(decoded.email);
    if (!user) {
      const error = new Error("user not found");
      throw error;
    }
    return user;
  }
}
