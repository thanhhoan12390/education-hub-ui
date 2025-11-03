'use client';

import { useEffect } from 'react';

export function useBodyLockScroll(locked: boolean) {
    useEffect(() => {
        if (locked) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%'; // tránh “layout shift” khi ẩn thanh cuộn
        } else {
            const top = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, parseInt(top || '0') * -1);
        }

        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
        };
    }, [locked]);
}
