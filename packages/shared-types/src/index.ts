/**
 * @syntropy/shared-types
 *
 * Cross-domain primitive types shared by all packages.
 * This package has zero dependencies — it's pure type definitions.
 */

// -- Branded types for type-safe IDs --

export type UserId = string & { readonly __brand: "UserId" };
export type TaskId = string & { readonly __brand: "TaskId" };
export type ProjectId = string & { readonly __brand: "ProjectId" };
export type DomainId = string & { readonly __brand: "DomainId" };
export type ArtifactId = string & { readonly __brand: "ArtifactId" };
export type EventId = string & { readonly __brand: "EventId" };
export type IntegrationId = string & { readonly __brand: "IntegrationId" };

// -- Timestamps --

export type ISOTimestamp = string & { readonly __brand: "ISOTimestamp" };
export type FirestoreTimestamp = {
  seconds: number;
  nanoseconds: number;
};

// -- Common enums --

export type Status = "active" | "archived" | "deleted";

export type Priority = "urgent" | "high" | "normal" | "low";

export type ConfidenceLevel = number & { readonly __brand: "ConfidenceLevel" };
