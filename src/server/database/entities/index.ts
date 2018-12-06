import { ContentBranchEntity } from "./ContentBranchEntity";
import { ContentEntity } from "./ContentEntity";
import { ContentRevisionEntity } from "./ContentRevisionEntity";
import { UserAccountEntity } from "./UserAccountEntity";
import { UserEntity } from "./UserEntity";
import { UserSessionEntity } from "./UserSessionEntity";

export * from "./ContentEntity";
export * from "./ContentBranchEntity";
export * from "./ContentRevisionEntity";
export * from "./UserAccountEntity";
export * from "./UserEntity";
export * from "./UserSessionEntity";

export type Entity =
  | ContentEntity
  | ContentBranchEntity
  | ContentRevisionEntity
  | UserAccountEntity
  | UserSessionEntity
  | UserEntity;

export const entities = [
  ContentEntity,
  ContentBranchEntity,
  ContentRevisionEntity,
  UserAccountEntity,
  UserSessionEntity,
  UserEntity
];
