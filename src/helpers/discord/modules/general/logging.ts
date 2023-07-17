import type { ElementType } from "@/types/components/dropdowns";
import type { APIChannel } from "discord-api-types/v10";

export function elementTypeToChannelId(
  element: ElementType | undefined
): string | undefined {
  return element
    ? typeof element == "string"
      ? element
      : ((element.id ?? element.name) as string)
    : undefined;
}

export function channelToElementType(
  channel: APIChannel | undefined
): ElementType | undefined {
  return channel
    ? {
        name: channel.name ?? channel.id,
        id: channel.id,
      }
    : undefined;
}
