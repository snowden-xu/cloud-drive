import { Controller } from '@nestjs/common';
import { PreviewService } from './preview.service';

@Controller('preview')
export class PreviewController {
  constructor(private readonly previewService: PreviewService) {}
}
