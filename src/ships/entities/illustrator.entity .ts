import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Illustrator {
  @Field({ nullable: true })
  name: string;

  @Field(() => [String], { nullable: true })
  socials: string[];
}
