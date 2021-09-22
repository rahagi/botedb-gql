import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Ship {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  avatarUrl: string;

  @Field({ nullable: true })
  artUrl: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  faction: string;
}
