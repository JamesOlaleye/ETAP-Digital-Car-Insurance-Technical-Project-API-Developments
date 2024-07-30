import { Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import * as streamify from 'streamifier';

@Injectable()
export class CloudinaryService {
  async UploadImage(image: Express.Multer.File) {
    return new Promise<UploadApiResponse>((resolve, reject) => {
      if (!image || !image.buffer) {
        reject(new BadRequestException('No image provided'));
        return;
      }

      const upStream = cloudinary.uploader.upload_stream((err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result as UploadApiResponse);
      });

      streamify.createReadStream(image.buffer).pipe(upStream);
    });
  }

  async uploadVideo(video: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise<UploadApiResponse>((resolve, reject) => {
      if (!video || !video.buffer) {
        reject(new BadRequestException('No video provided'));
        return;
      }

      const upStream = cloudinary.uploader.upload_stream(
        { resource_type: 'video' }, // Specify the resource type as video
        (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result as UploadApiResponse);
        },
      );

      streamify.createReadStream(video.buffer).pipe(upStream);
    });
  }
}

const data = {
  asset_id: '4b3cf5a79e49677d07fe4d095facc033',
  public_id: 'asclhlkgiqrq80e7fa5u',
  version: 1722193558,
  version_id: 'cc32c10105e58305f8352389821c276d',
  signature: '25767c33295ca8e9e294c5297bf08222b7d4df1f',
  width: 1920,
  height: 1080,
  format: 'mp4',
  resource_type: 'video',
  created_at: '2024-07-28T19:05:58Z',
  tags: [],
  pages: 0,
  bytes: 30312128,
  type: 'upload',
  etag: '59afcb09bd8cf01f663617ea02190d75',
  placeholder: false,
  url: 'http://res.cloudinary.com/dzdvous3v/video/upload/v1722193558/asclhlkgiqrq80e7fa5u.mp4',
  secure_url:
    'https://res.cloudinary.com/dzdvous3v/video/upload/v1722193558/asclhlkgiqrq80e7fa5u.mp4',
  playback_url:
    'https://res.cloudinary.com/dzdvous3v/video/upload/sp_auto/v1722193558/asclhlkgiqrq80e7fa5u.m3u8',
  folder: '',
  audio: {
    codec: 'aac',
    bit_rate: '79860',
    frequency: 48000,
    channels: 2,
    channel_layout: 'stereo',
  },
  video: {
    pix_format: 'yuv420p',
    codec: 'h264',
    level: 41,
    profile: 'Main',
    bit_rate: '9888677',
    dar: '16:9',
    time_base: '1/30000',
  },
  is_audio: false,
  frame_rate: 120,
  bit_rate: 10310978,
  duration: 23.487979,
  rotation: 0,
  original_filename: 'file',
  nb_frames: 701,
  api_key: '898746836624784',
};