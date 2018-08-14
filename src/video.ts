import {isMobile} from './util';

const defaultWidth = 640;
const defaultHeight = 480;

function minWidthOrValue(minWidth: number, value: number) {
  if (value <= 2) {
    return minWidth;
  } else {
    return value;
  }
}

async function setupCamera(video: HTMLVideoElement): Promise<void> {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error(
        'Browser API navigator.mediaDevices.getUserMedia not available');
  }

  const mobile = isMobile();
  const stream = await navigator.mediaDevices.getUserMedia({
    'audio': false,
    'video': {
      facingMode: 'user',
      width: mobile ? undefined : defaultWidth,
      height: mobile ? undefined : defaultHeight
    },
  });
  video.srcObject = stream;


  return new Promise((resolve) => {
           video.onloadedmetadata = () => {
             video.width = minWidthOrValue(640, video.videoWidth);
             video.height = minWidthOrValue(480, video.videoHeight);
             resolve();
           };
         }) as Promise<void>;
}

export async function captureWebcamIntoVideo(video: HTMLVideoElement) {
  await setupCamera(video);
  video.play();
}
