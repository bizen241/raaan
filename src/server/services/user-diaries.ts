import { EntityManager } from "typeorm";
import { UserDiaryEntity, UserEntity } from "../database/entities";

export const updateUserDiarySubmitCount = async (
  manager: EntityManager,
  currentUser: UserEntity,
  typeCount: number,
  submittedDate: string
) => {
  const userDiary = await manager.findOne(UserDiaryEntity, {
    userId: currentUser.id,
    date: submittedDate
  });

  if (userDiary === undefined) {
    const newUserDiary = new UserDiaryEntity(currentUser, submittedDate);

    newUserDiary.submitCount += 1;
    newUserDiary.typeCount += typeCount;
    newUserDiary.submittedCount += 1;
    newUserDiary.typedCount += typeCount;

    await manager.save(newUserDiary);

    return newUserDiary;
  } else {
    userDiary.submitCount += 1;
    userDiary.typeCount += typeCount;
    userDiary.submittedCount += 1;
    userDiary.typedCount += typeCount;

    await manager.save(userDiary);

    return userDiary;
  }
};

export const updateUserDiarySubmittedCount = async (
  manager: EntityManager,
  author: UserEntity,
  typeCount: number,
  submittedDate: string
) => {
  const userDiary = await manager.findOne(UserDiaryEntity, {
    userId: author.id,
    date: submittedDate
  });

  if (userDiary === undefined) {
    const newUserDiary = new UserDiaryEntity(author, submittedDate);

    newUserDiary.submittedCount += 1;
    newUserDiary.typedCount += typeCount;

    await manager.save(newUserDiary);

    return newUserDiary;
  } else {
    userDiary.submittedCount += 1;
    userDiary.typedCount += typeCount;

    await manager.save(userDiary);

    return userDiary;
  }
};
