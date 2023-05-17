export class Post {
  constructor(
    private id: string,
    private creator_id: string,
    private content: string,
    private likes: number,
    private dislikes: number,
    private created_at: string,
    private updated_at: string
  ) {}

  public getId(){}

  public getCreatorId(){}

  public getContent(){}
  public setContent(){}

  public getLikes(){}

  public getDislikes(){}

  public getCreatedAt(){}

  public getUpdatedAt(){}
}
