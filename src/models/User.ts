
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

  public setRole(newRole: string): void {
    if (this.role === "ADMIN") {
      this.role = newRole;
    } else {
      this.role = "USER";
      console.log("VOCÊ É UM PLEBEU");
    }
  }
}
