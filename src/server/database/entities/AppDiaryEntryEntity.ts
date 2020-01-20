import { Column, Entity } from "typeorm";
import { BaseDiaryEntryClass } from "./BaseDiaryEntryClass";

@Entity("app_diaries")
export class AppDiaryEntryEntity extends BaseDiaryEntryClass {
  type: "AppDiaryEntry" = "AppDiaryEntry";

  @Column()
  submittedCount: number = 0;

  @Column()
  typedCount: number = 0;
}
