export class LikeDis {
  constructor(
    private user_id: string,
    private post_id: string,
    private like: number
  ) {}

  public getUserId(): string {
    return this.user_id;
  }

  public getPostId(): string {
    return this.post_id;
  }

  public getLike(): number {
    return this.like;
  }
}
