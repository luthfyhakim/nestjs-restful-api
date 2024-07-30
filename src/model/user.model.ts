export class RegisterUserRequest {
  username: string;
  password: string;
  name: string;
}

export class ResponseUser {
  username: string;
  name: string;
  token?: string;
}

export class LoginUserRequest {
  username: string;
  password: string;
}

export class UpdateUserRequest {
  name?: string;
  password?: string;
}
