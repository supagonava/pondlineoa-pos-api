import { Injectable } from '@nestjs/common';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import * as path from 'path';

@Injectable()
export class AzureBlobService {
  private containerClient: ContainerClient;

  constructor() {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env.AZURE_STORAGE_CONNECTION_STRING,
    );
    this.containerClient = blobServiceClient.getContainerClient('lineoapos');
  }

  async uploadDatabase(): Promise<string> {
    const filePath = path.resolve('database.sqlite');
    const blockBlobClient =
      this.containerClient.getBlockBlobClient('database.sqlite');
    await blockBlobClient.uploadFile(filePath);
    return blockBlobClient.url;
  }

  async downloadDatabase(): Promise<void> {
    const filePath = path.resolve('database.sqlite');
    const blockBlobClient =
      this.containerClient.getBlockBlobClient('database.sqlite');
    const downloadBlockBlobResponse =
      await blockBlobClient.downloadToFile(filePath);
  }
}
