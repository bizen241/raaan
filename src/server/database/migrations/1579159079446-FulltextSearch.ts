import { MigrationInterface, QueryRunner } from "typeorm";

export class FulltextSearch1579159079446 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("CREATE FULLTEXT INDEX idx_text ON exercise_summaries (text) WITH PARSER ngram");
    await queryRunner.query("CREATE FULLTEXT INDEX idx_title ON exercise_summaries (title) WITH PARSER ngram");
    await queryRunner.query("CREATE FULLTEXT INDEX idx_questions ON exercise_summaries (questions) WITH PARSER ngram");
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("DROP INDEX idx_text ON exercise_summaries");
    await queryRunner.query("DROP INDEX idx_title ON exercise_summaries");
    await queryRunner.query("DROP INDEX idx_questions ON exercise_summaries");
  }
}
