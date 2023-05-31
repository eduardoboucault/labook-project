export enum USER_ROLES {
  ADMIN = "admin",
  USER = "user",
}

export interface TokenPayLoad {
  id: string;
  role: string;
}
export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private role: string
  ) {}

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(newName: string): void {
    this.name = newName;
  }

  public getEmail(): string {
    return this.email;
  }
  public setEmail(newEmail: string): void {
    this.email = newEmail;
  }

  public getPassword(): string {
    return this.password;
  }
  public setPassword(newPassword: string): void {
    this.password = newPassword;
  }

  public getRole(): string {
    return this.role;
  }

  public setRole(newRole: USER_ROLES): void {
    if (this.role === USER_ROLES.ADMIN) {
      this.role = newRole;
    } else {
      this.role = USER_ROLES.USER;
      console.log("Somente a classe ADMIN pode fazer este tipo de alteração.");
    }
  }
}
