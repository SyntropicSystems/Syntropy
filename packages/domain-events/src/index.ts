/**
 * @syntropy/domain-events
 *
 * Event sourcing core: base event types, event bus interface,
 * event application logic, and replay utilities.
 *
 * All domain packages emit and consume events through this package.
 * Events are the sole mechanism for cross-domain communication.
 */

import type {
  UserId,
  EventId,
  ISOTimestamp,
} from "@syntropy/shared-types";

// -- Base event type --

export interface DomainEvent<
  TType extends string = string,
  TPayload = unknown,
> {
  id: EventId;
  type: TType;
  userId: UserId;
  timestamp: ISOTimestamp;
  payload: TPayload;
  metadata?: Record<string, unknown>;
}

// -- Event store interface --

export interface EventStore {
  append(event: DomainEvent): Promise<void>;
  read(userId: UserId, options?: ReadOptions): Promise<DomainEvent[]>;
}

export interface ReadOptions {
  afterTimestamp?: ISOTimestamp;
  eventTypes?: string[];
  limit?: number;
}

// -- Event handler type --

export type EventHandler<T extends DomainEvent = DomainEvent> = (
  event: T,
) => Promise<void> | void;
