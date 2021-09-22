import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class VoiceActor {
  @Field({ nullable: true })
  name: string;

  @Field(() => [String], { nullable: true })
  oggSamples: string[];
}
