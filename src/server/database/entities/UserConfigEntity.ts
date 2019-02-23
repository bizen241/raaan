import { Column, Entity, ManyToOne } from "typeorm";
import { UserSettings } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserEntity } from "./UserEntity";

@Entity()
export class UserConfigEntity extends BaseEntityClass<"UserConfig"> {
  type: "UserConfig" = "UserConfig";

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  user!: UserEntity;

  @Column()
  name!: string;

  @Column("json")
  settings!: UserSettings;
}

interface UserConfigConstructor {
  id?: string;
  user: UserEntity;
  name: string;
  settings: UserSettings;
}

export const createUserConfigEntity = ({ id, user, name, settings }: UserConfigConstructor) => {
  const userConfig = new UserConfigEntity();

  if (id !== undefined) {
    userConfig.id = id;
  }

  userConfig.user = user;
  userConfig.name = name;
  userConfig.settings = settings;

  return userConfig;
};
