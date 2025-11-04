'use client';

import { useEffect } from 'react';

export function useBodyLockScroll(locked: boolean) {
    useEffect(() => {
        const html = document.documentElement;
        const body = document.body;

        if (locked) {
            const scrollbarWidth = window.innerWidth - html.clientWidth;

            html.style.overflow = 'hidden';
            body.style.overflow = 'hidden';
            body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            html.style.overflow = '';
            body.style.overflow = '';
            body.style.paddingRight = '';
        }

        return () => {
            html.style.overflow = '';
            body.style.overflow = '';
            body.style.paddingRight = '';
        };
    }, [locked]);
}
