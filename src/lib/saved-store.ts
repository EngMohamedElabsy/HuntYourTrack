import { useCallback, useSyncExternalStore } from "react";

import type { Role } from "@/lib/roles";

/**
 * Tiny on-device store (saved ids, applied ids, current role, sign-in dialog).
 * Server render always sees defaults; browser values take over after hydration.
 */
type ListKey = "hyt:saved" | "hyt:applied";

const listeners = new Set<() => void>();
const cache: Record<string, unknown> = {};
const EMPTY: string[] = [];

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function readStored<T>(key: string, fallback: T, valid: (v: unknown) => v is T): T {
  if (typeof window === "undefined") return fallback;
  if (!(key in cache)) {
    try {
      const raw = window.localStorage.getItem(key);
      const parsed: unknown = raw ? JSON.parse(raw) : fallback;
      cache[key] = valid(parsed) ? parsed : fallback;
    } catch {
      cache[key] = fallback;
    }
  }
  return cache[key] as T;
}

function writeStored(key: string, value: unknown) {
  cache[key] = value;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
  emit();
}

const isStringList = (v: unknown): v is string[] =>
  Array.isArray(v) && v.every((x) => typeof x === "string");

function useIdList(key: ListKey) {
  const ids = useSyncExternalStore(
    subscribe,
    () => readStored(key, EMPTY, isStringList),
    () => EMPTY,
  );
  const toggle = useCallback(
    (id: string) => {
      const current = readStored(key, EMPTY, isStringList);
      writeStored(key, current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);
    },
    [key],
  );
  const add = useCallback(
    (id: string) => {
      const current = readStored(key, EMPTY, isStringList);
      if (!current.includes(id)) writeStored(key, [...current, id]);
    },
    [key],
  );
  return { ids, toggle, add };
}

export const useSaved = () => useIdList("hyt:saved");
export const useApplied = () => useIdList("hyt:applied");

const isRole = (v: unknown): v is Role =>
  v === "guest" || v === "student" || v === "mentor" || v === "admin";

export function useRole() {
  const role = useSyncExternalStore(
    subscribe,
    () => readStored<Role>("hyt:role", "guest", isRole),
    () => "guest" as Role,
  );
  const setRole = useCallback((r: Role) => writeStored("hyt:role", r), []);
  return { role, setRole };
}

/* Sign-in (role picker) dialog open state — in memory only. */
let signInOpen = false;
export function useSignInDialog() {
  const open = useSyncExternalStore(
    subscribe,
    () => signInOpen,
    () => false,
  );
  const setOpen = useCallback((v: boolean) => {
    signInOpen = v;
    emit();
  }, []);
  return { open, setOpen };
}

/** True after the first client render — use to avoid flashing server defaults. */
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
