import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), AwsModule],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesModule]
})
export class MoviesModule {}
