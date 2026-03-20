import { Controller } from '@nestjs/common';
import { QuotaService } from './quota.service';

@Controller('quota')
export class QuotaController {
  constructor(private readonly quotaService: QuotaService) {}
}
