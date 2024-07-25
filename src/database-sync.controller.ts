import { Controller, Post, Get } from '@nestjs/common';
import { AzureBlobService } from './azure-blob.service';

@Controller('database-sync')
export class DatabaseSyncController {
  constructor(private readonly azureBlobService: AzureBlobService) {}

  @Post('upload')
  async uploadDatabase(): Promise<string> {
    return this.azureBlobService.uploadDatabase();
  }

  @Get('download')
  async downloadDatabase(): Promise<void> {
    await this.azureBlobService.downloadDatabase();
  }
}
