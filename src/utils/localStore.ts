/**
 * Local-First Data Layer for Virtuabled South Africa
 * --------------------------------------------------
 * A small, typed persistence layer built on localStorage. Mirrors the
 * CustomEvent broadcast pattern already used in googleSheetsService.ts so
 * components stay in sync within a tab, and adds the `storage` event for
 * cross-tab sync. Every value is wrapped in a versioned envelope so the
 * schema can be migrated later (and so a real backend can swap in cleanly).
 *
 * This is demo/preview persistence — data lives only in the user's browser.
 * It is intentionally honest about that in the UI copy that consumes it.
 */

import { useCallback, useEffect, useRef, useState } from "react";

export const STORE_VERSION = 1;
export const STORE_EVENT = "virtuabled-store-updated";

export type StoreKey =
  | "virtuabled_session"
  | "virtuabled_applications"
  | "virtuabled_shortlist"
  | "virtuabled_compliance"
  | "virtuabled_facilities"
  | "virtuabled_messages"
  | "virtuabled_interviews"
  | "virtuabled_notes";

interface Envelope<T> {
  v: number;
  updatedAt: string;
  data: T;
}

/** A sentinel so callers can tell "key absent" apart from "stored null". */
const ABSENT = Symbol("absent");

function migrate<T>(_key: StoreKey, _parsed: Envelope<unknown>, fallback: T): T {
  // v1 is the first schema — nothing to migrate yet. Future versions add cases.
  return fallback;
}

export function readStore<T>(key: StoreKey, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed = JSON.parse(raw) as Envelope<T>;
    if (!parsed || typeof parsed !== "object" || !("data" in parsed)) {
      return fallback;
    }
    if (parsed.v !== STORE_VERSION) {
      return migrate(key, parsed, fallback);
    }
    // Stored `null` is a legitimate value (e.g. a logged-out session).
    return parsed.data as T;
  } catch (err) {
    console.error(`Failed to read store key "${key}"`, err);
    return fallback;
  }
}

export function writeStore<T>(key: StoreKey, data: T): void {
  try {
    const envelope: Envelope<T> = {
      v: STORE_VERSION,
      updatedAt: new Date().toISOString(),
      data,
    };
    localStorage.setItem(key, JSON.stringify(envelope));
    window.dispatchEvent(new CustomEvent(STORE_EVENT, { detail: { key, data } }));
  } catch (err) {
    console.error(`Failed to write store key "${key}"`, err);
  }
}

export function removeStore(key: StoreKey): void {
  try {
    localStorage.removeItem(key);
    window.dispatchEvent(new CustomEvent(STORE_EVENT, { detail: { key, data: null } }));
  } catch (err) {
    console.error(`Failed to remove store key "${key}"`, err);
  }
}

/**
 * Subscribe to changes for a single key.
 * Fires for same-tab writes (CustomEvent) and cross-tab writes (storage event).
 * Returns an unsubscribe function.
 */
export function subscribeStore<T>(key: StoreKey, cb: (data: T) => void): () => void {
  const onCustom = (e: Event) => {
    const detail = (e as CustomEvent<{ key: StoreKey; data: T }>).detail;
    if (detail && detail.key === key) cb(detail.data);
  };
  const onStorage = (e: StorageEvent) => {
    if (e.key !== key) return;
    if (e.newValue === null) {
      // key removed in another tab
      cb(undefined as unknown as T);
      return;
    }
    try {
      const parsed = JSON.parse(e.newValue) as Envelope<T>;
      if (parsed && "data" in parsed) cb(parsed.data);
    } catch {
      /* ignore malformed cross-tab payloads */
    }
  };
  window.addEventListener(STORE_EVENT, onCustom as EventListener);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(STORE_EVENT, onCustom as EventListener);
    window.removeEventListener("storage", onStorage);
  };
}

/**
 * useState-compatible hook backed by localStorage.
 * Supports functional updaters (so existing `setX(prev => ...)` call sites
 * work verbatim) by resolving against a ref of the current value.
 */
export function useLocalStore<T>(
  key: StoreKey,
  initial: T
): [T, (next: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => readStore(key, initial));
  const valueRef = useRef(value);
  valueRef.current = value;

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      const resolved =
        typeof next === "function"
          ? (next as (prev: T) => T)(valueRef.current)
          : next;
      valueRef.current = resolved;
      setValue(resolved);
      writeStore(key, resolved);
    },
    [key]
  );

  useEffect(() => {
    const unsub = subscribeStore<T>(key, (data) => {
      // ignore the removed-key signal here; consumers manage their own resets
      if (data === undefined) return;
      valueRef.current = data;
      setValue(data);
    });
    return unsub;
  }, [key]);

  return [value, set];
}

/* ------------------------------------------------------------------ */
/* Record types                                                        */
/* ------------------------------------------------------------------ */

export interface DemoSession {
  email: string;
  role: "employer";
  demo: true;
  createdAt: string;
  expiresAt: string;
}

export interface ApplicationRecord {
  id: string; // "VA-2026-XXXX"
  submittedAt: string;
  fullName: string;
  role: string;
  skills: string;
  disabilityType: string;
  natureOfDisability: string;
  voiceTranscript: string;
  videoRecorded: boolean;
  videoDurationSec: number | null;
  /** Small compressed profile photo (data URL). Maps to Storage photo_url later. */
  photoDataUrl?: string;
  /** IndexedDB key for the recorded intro video blob (too large for localStorage). */
  videoBlobId?: string;
  status: "submitted";
}

export interface ComplianceItem {
  id: string;
  title: string;
  completed: boolean;
}

export type FacilitiesState = Record<string, Record<string, boolean>>;

export interface ChatMessage {
  id: number;
  sender: "employer" | "candidate";
  text: string;
  time: string;
}
export type MessagesState = Record<string, ChatMessage[]>;

export interface InterviewRecord {
  candidateId: number;
  candidateName: string;
  date: string;
  time: string;
  type: string;
  scheduledAt: string;
}
export type InterviewsState = Record<string, InterviewRecord>;

export type NotesState = Record<string, string>;

export function generateApplicationId(): string {
  return `VA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
}

/* ------------------------------------------------------------------ */
/* Demo session                                                        */
/* ------------------------------------------------------------------ */

const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

export function useSession(): {
  session: DemoSession | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
} {
  const [stored, setStored] = useLocalStore<DemoSession | null>(
    "virtuabled_session",
    null
  );

  // Treat expired sessions as logged out.
  const session =
    stored && Date.parse(stored.expiresAt) > Date.now() ? stored : null;

  const login = useCallback(
    (_email: string, _password: string): boolean => {
      // Auth is disabled — employer portal requires approval. Returns false always.
      return false;
    },
    []
  );

  const logout = useCallback(() => {
    setStored(null);
  }, [setStored]);

  return { session, login, logout };
}
