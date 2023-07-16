export type Log = {
  enabled: boolean;
  channel?: string | null;
  types: string[];
};

/**
 * log types with description
 */
export const logTypes: {
  id: string;
  name: string;
  description: string;
}[] = [
  {
    id: "message_create",
    name: "Message sent",
    description: "Loggs all sended messages",
  },
];
