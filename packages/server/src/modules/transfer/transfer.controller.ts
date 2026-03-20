import { Controller } from '@nestjs/common';
import { TransferService } from './transfer.service';

@Controller()
export class TransferController {
  constructor(private readonly transferService: TransferService) {}
}
