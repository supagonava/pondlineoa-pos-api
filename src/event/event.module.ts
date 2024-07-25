import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { AzureTableStorageModule } from '@nestjs/azure-database';
import { EventService } from './event.service';

@Module({
  imports: [
    AzureTableStorageModule.forFeature(Event, {
      table: 'Events',
      createTableIfNotExists: true,
    }),
  ],
  providers: [EventService],
  controllers: [EventController],
})
export class EventModule {}
