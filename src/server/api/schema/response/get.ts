/**
 * This file was automatically generated by typescript-json-schema
 */
import { Definition } from "typescript-json-schema";

export const EntityStoreSchema: Definition = {
  type: "object",
  properties: {
    Exercise: {
      type: "object",
      additionalProperties: {
        type: "object",
        properties: {
          authorId: { format: "uuid", type: "string" },
          summaryId: { format: "uuid", type: "string" },
          lang: { type: "string" },
          title: { type: "string" },
          tags: {
            type: "array",
            items: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } }
          },
          description: { type: "string" },
          rubric: { type: "string" },
          comment: { type: "string" },
          questions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "number" },
                format: { enum: ["code", "math", "plain"], type: "string" },
                lang: { type: "string" },
                value: { type: "string" },
                comment: { type: "string" }
              }
            }
          },
          isPrivate: { type: "boolean" },
          isLocked: { type: "boolean" },
          id: { format: "uuid", type: "string" },
          createdAt: { type: "number" },
          updatedAt: { type: "number" },
          fetchedAt: { type: "number" }
        }
      }
    },
    ExerciseSummary: {
      type: "object",
      additionalProperties: {
        type: "object",
        properties: {
          authorId: { format: "uuid", type: "string" },
          exerciseId: { format: "uuid", type: "string" },
          lang: { type: "string" },
          title: { type: "string" },
          tags: { type: "array", items: { type: "string" } },
          description: { type: "string" },
          submitCount: { type: "number" },
          id: { format: "uuid", type: "string" },
          createdAt: { type: "number" },
          updatedAt: { type: "number" },
          fetchedAt: { type: "number" }
        }
      }
    },
    ExerciseTag: {
      type: "object",
      additionalProperties: {
        type: "object",
        properties: {
          name: { type: "string" },
          id: { format: "uuid", type: "string" },
          createdAt: { type: "number" },
          updatedAt: { type: "number" },
          fetchedAt: { type: "number" }
        }
      }
    },
    Submission: {
      type: "object",
      additionalProperties: {
        type: "object",
        properties: {
          userId: { format: "uuid", type: "string" },
          exerciseId: { format: "uuid", type: "string" },
          typeCount: { type: "number" },
          time: { type: "number" },
          accuracy: { type: "number" },
          id: { format: "uuid", type: "string" },
          createdAt: { type: "number" },
          updatedAt: { type: "number" },
          fetchedAt: { type: "number" }
        }
      }
    },
    SubmissionSummary: {
      type: "object",
      additionalProperties: {
        type: "object",
        properties: {
          userId: { format: "uuid", type: "string" },
          exerciseId: { format: "uuid", type: "string" },
          exerciseSummaryId: { format: "uuid", type: "string" },
          latest: {
            type: "object",
            properties: { typeCount: { type: "number" }, time: { type: "number" }, accuracy: { type: "number" } }
          },
          best: {
            type: "object",
            properties: { typeCount: { type: "number" }, time: { type: "number" }, accuracy: { type: "number" } }
          },
          submitCount: { type: "number" },
          id: { format: "uuid", type: "string" },
          createdAt: { type: "number" },
          updatedAt: { type: "number" },
          fetchedAt: { type: "number" }
        }
      }
    },
    User: {
      type: "object",
      additionalProperties: {
        type: "object",
        properties: {
          name: { type: "string" },
          permission: { enum: ["Admin", "Guest", "Owner", "Write"], type: "string" },
          accountId: { format: "uuid", type: "string" },
          configId: { format: "uuid", type: "string" },
          summaryId: { format: "uuid", type: "string" },
          id: { format: "uuid", type: "string" },
          createdAt: { type: "number" },
          updatedAt: { type: "number" },
          fetchedAt: { type: "number" }
        }
      }
    },
    UserAccount: {
      type: "object",
      additionalProperties: {
        type: "object",
        properties: {
          provider: { type: "string", enum: ["github"] },
          accountId: { type: "string" },
          email: { type: "string" },
          id: { format: "uuid", type: "string" },
          createdAt: { type: "number" },
          updatedAt: { type: "number" },
          fetchedAt: { type: "number" }
        }
      }
    },
    UserConfig: {
      type: "object",
      additionalProperties: {
        type: "object",
        properties: {
          lang: { enum: ["default", "en", "ja", "system"], type: "string" },
          theme: { enum: ["dark", "default", "light", "system"], type: "string" },
          id: { format: "uuid", type: "string" },
          createdAt: { type: "number" },
          updatedAt: { type: "number" },
          fetchedAt: { type: "number" }
        }
      }
    },
    UserSession: {
      type: "object",
      additionalProperties: {
        type: "object",
        properties: {
          userId: { format: "uuid", type: "string" },
          accessCount: { type: "number" },
          deviceType: { type: "string" },
          deviceName: { type: "string" },
          os: { type: "string" },
          browser: { type: "string" },
          isCurrent: { type: "boolean" },
          id: { format: "uuid", type: "string" },
          createdAt: { type: "number" },
          updatedAt: { type: "number" },
          fetchedAt: { type: "number" }
        }
      }
    },
    UserSummary: {
      type: "object",
      additionalProperties: {
        type: "object",
        properties: {
          userId: { format: "uuid", type: "string" },
          submitCount: { type: "number" },
          typeCount: { type: "number" },
          id: { format: "uuid", type: "string" },
          createdAt: { type: "number" },
          updatedAt: { type: "number" },
          fetchedAt: { type: "number" }
        }
      }
    }
  }
};
