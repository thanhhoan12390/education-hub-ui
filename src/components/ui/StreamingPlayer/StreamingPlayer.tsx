'use client';

import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Hls from 'hls.js';

interface StreamingPlayerProps {
    src: string;
}

function StreamingPlayer({ src }: StreamingPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<ReturnType<typeof videojs> | null>(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const initPlayer = () => {
            if (playerRef.current) return;

            // Khởi tạo HLS
            if (Hls.isSupported()) {
                const hls = new Hls();

                hls.loadSource(src);
                hls.attachMedia(videoElement);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    // console.log('HLS manifest loaded');
                });
            } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
                // Safari/iOS: phát trực tiếp được .m3u8
                videoElement.src = src;
            } else {
                console.warn('HLS not supported');
            }

            // Khởi tạo Video.js UI
            playerRef.current = videojs(videoElement, {
                controls: true,
                preload: 'auto',
                fluid: true,
                playbackRates: [0.75, 1, 1.25, 1.5, 2],
                responsive: true,
                html5: { hls: { overrideNative: true } },
            });
        };

        // Trì hoãn 1 frame (fix warning + hiển thị UI ổn định)
        requestAnimationFrame(initPlayer);

        return () => {
            playerRef.current?.dispose();
        };
    }, [src]);

    return (
        <div data-vjs-player>
            <video ref={videoRef} className="video-js vjs-big-play-centered" />
        </div>
    );
}

export default StreamingPlayer;
