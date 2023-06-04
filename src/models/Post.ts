export class Post {
  constructor(
    private id: string,
    private creator_id: string,
    private content: string,
    private likes: number,
    private dislikes: number
  ) {}

  public getId(): string {
    return this.id;
  }

  public getCreatorId(): string {
    return this.creator_id;
  }

  public getContent(): string {
    return this.content;
  }
  public setContent(newContent: string): void {
    this.content = newContent;
  }

  public getLikes(): number {
    return this.likes;
  }

  public getDislikes(): number {
    return this.dislikes;
  }

  public toDBmodel() {
    return {
      id: this.id,
      creator_id: this.creator_id,
      content: this.content,
      likes: this.likes,
      dislikes: this.dislikes,
    };
  }
}
