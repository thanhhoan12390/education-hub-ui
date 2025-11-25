'use client';

import { useEffect, useRef, useImperativeHandle } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Hls from 'hls.js';
import '@videojs/themes/dist/fantasy/index.css';

import type { StreamingPlayerHandle } from '~/types';
import './streaming-player.scss';

interface StreamingPlayerProps {
    src: string;
    style?: React.CSSProperties;
    ref?: React.Ref<StreamingPlayerHandle>;
    onTimeUpdate?: (time: number) => void;
}

function StreamingPlayer({ src, style, ref, onTimeUpdate }: StreamingPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<ReturnType<typeof videojs> | null>(null);
    const hlsRef = useRef<Hls | null>(null);

    useImperativeHandle(ref, () => {
        return {
            play: () => videoRef.current?.play(),
            pause: () => videoRef.current?.pause(),
        };
    });

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

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const handleTimeUpdate = () => {
            onTimeUpdate?.(videoElement.currentTime);
        };

        videoElement.addEventListener('timeupdate', handleTimeUpdate);
        return () => videoElement.removeEventListener('timeupdate', handleTimeUpdate);
    }, [onTimeUpdate]);

    return (
        <div data-vjs-player style={style}>
            <video ref={videoRef} className="video-js vjs-theme-fantasy vjs-big-play-centered " />
        </div>
    );
}

export default StreamingPlayer;
