import { IronSession } from "iron-session";

export interface SessionData {
  user?: {
    id: number;
    username: string;
  };
}

export type TypedIronSession = IronSession<SessionData>;
