export type Log = {
  enabled: boolean;
  defaultChannel?: string | null;
  loggers: Loggers;
};

export interface Loggers {
  messageCreate: MessageCreateLogger;
}

export interface Logger {
  id: string;
  state: boolean;
  loggingChannel: string | null;
}

export interface MessageCreateLogger extends Logger {
  id: "message_create";
}
