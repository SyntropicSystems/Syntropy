import type {
  TaskId,
  ProjectId,
  DomainId,
  UserId,
  ISOTimestamp,
  Priority,
  ConfidenceLevel,
} from "@syntropy/shared-types";

// -- Task model --

export interface Task {
  id: TaskId;
  userId: UserId;
  title: string;
  body?: string;
  status: TaskStatus;
  priority: Priority;
  domainId?: DomainId;
  projectId?: ProjectId;
  aiSuggestion?: AISuggestion;
  createdAt: ISOTimestamp;
  updatedAt: ISOTimestamp;
}

export type TaskStatus =
  | "inbox"
  | "queued"
  | "in_progress"
  | "waiting"
  | "done"
  | "archived";

export interface AISuggestion {
  action: string;
  confidence: ConfidenceLevel;
  reasoning: string;
}
