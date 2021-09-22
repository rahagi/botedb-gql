import { Field, ObjectType } from '@nestjs/graphql';
import { SkillType } from 'src/common/enums/skilltype.enum';

@ObjectType()
export class Skill {
  @Field({ nullable: true })
  name: string;

  @Field(() => SkillType, { nullable: true })
  skillType: SkillType;

  @Field({ nullable: true })
  description: string;
}
