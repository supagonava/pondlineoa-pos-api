// line-oa-event.dto.ts
import {
  IsString,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class LineOAEventDto {
  // @ValidateNested({ each: true })
  destination: string;

  // @Type(() => Event)
  events: Event[];
}

export class Event {
  type: string;
  message: Message;
  webhookEventId: string;
  deliveryContext: DeliveryContext;
  timestamp: number;
  source: Source;
  replyToken: string;
  mode: string;
}

export class DeliveryContext {
  isRedelivery: boolean;
}

export class Message {
  type: string;
  id: string;
  quoteToken: string;
  text: string;
}

export class Source {
  type: string;
  userId: string;
}
