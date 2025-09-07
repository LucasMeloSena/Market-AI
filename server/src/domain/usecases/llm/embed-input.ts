import { Inject, Injectable } from '@nestjs/common';
import { LlmRepository } from 'src/domain/repositories/llm.repository';

@Injectable()
export class EmbedInputUseCase {
  constructor(
    @Inject('LlmRepository')
    private readonly llmRepository: LlmRepository,
  ) {}

  async execute(input: string): Promise<number[]> {
    return this.llmRepository.embedInput(input);
  }
}
