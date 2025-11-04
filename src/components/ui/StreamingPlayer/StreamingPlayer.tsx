'use client';

import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Hls from 'hls.js';
import '@videojs/themes/dist/fantasy/index.css';

import './streaming-player.scss';

interface StreamingPlayerProps {
    src: string;
}

function StreamingPlayer({ src }: StreamingPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<ReturnType<typeof videojs> | null>(null);
    const hlsRef = useRef<Hls | null>(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const initPlayer = () => {
            if (playerRef.current) return;

            // Khởi tạo Video.js
            playerRef.current = videojs(videoElement, {
                controls: true,
                preload: 'auto',
                fluid: true,
                playbackRates: [0.75, 1, 1.25, 1.5, 2],
                responsive: true,
            });

            // Khởi tạo HLS
            if (Hls.isSupported()) {
                const hls = new Hls();
                hlsRef.current = hls;

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
        };

        requestAnimationFrame(initPlayer);

        return () => {
            // hủy Hls.js trước khi dispose Video.js
            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
            }

            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, [src]);

    return (
        <div data-vjs-player>
            <video ref={videoRef} className="video-js vjs-theme-fantasy vjs-big-play-centered " />
        </div>
    );
}

export default StreamingPlayer;
