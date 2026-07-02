export const APP_NAME = "Nexiora EV" as const;
export const APP_TAGLINE = "Driving the Future of Smart Mobility" as const;

export const API_VERSION = "v1" as const;
export const API_PREFIX = `/api/${API_VERSION}` as const;

export const DEFAULT_PAGE_SIZE = 20 as const;
export const MAX_PAGE_SIZE = 100 as const;

export const USER_ROLES = ["USER", "DEALER", "ADMIN"] as const;

export const VEHICLE_CATEGORIES = [
  "TWO_WHEELER",
  "THREE_WHEELER",
  "FOUR_WHEELER",
  "COMMERCIAL",
] as const;

export const VEHICLE_STATUSES = ["DRAFT", "ACTIVE", "SOLD", "ARCHIVED"] as const;

export const INDIA_STATES = [
  "AN", "AP", "AR", "AS", "BR", "CH", "CT", "DN", "DD", "DL", "GA", "GJ",
  "HR", "HP", "JK", "JH", "KA", "KL", "LA", "LD", "MP", "MH", "MN", "ML",
  "MZ", "NL", "OR", "PY", "PB", "RJ", "SK", "TN", "TS", "TR", "UP", "UK", "WB",
] as const;
