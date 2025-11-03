'use client';

import { useEffect } from 'react';

export function useBodyLockScroll(locked: boolean) {
    useEffect(() => {
        const html = document.documentElement;
        const body = document.body;

        const preventTouchMove = (e: TouchEvent) => {
            e.preventDefault();
        };

        if (locked) {
            const scrollbarWidth = window.innerWidth - html.clientWidth;

            html.style.overflow = 'hidden';
            body.style.overflow = 'hidden';
            body.style.paddingRight = `${scrollbarWidth}px`;

            // chặn cuộn bằng tay (mobile)
            document.addEventListener('touchmove', preventTouchMove, { passive: false });
        } else {
            html.style.overflow = '';
            body.style.overflow = '';
            body.style.paddingRight = '';
            document.removeEventListener('touchmove', preventTouchMove);
        }

        return () => {
            html.style.overflow = '';
            body.style.overflow = '';
            body.style.paddingRight = '';
            document.removeEventListener('touchmove', preventTouchMove);
        };
    }, [locked]);
}
