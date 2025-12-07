'use client';

import classNames from 'classnames/bind';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';

import { useBodyLockScroll } from '~/hooks/useBodyLockScroll';
import styles from './OverlayModal.module.scss';

const cx = classNames.bind(styles);

interface OverlayModalProps {
    open: boolean;
    onClose?: () => void;
    children: React.ReactNode;
    className?: string;
}

function OverlayModal({ open = false, onClose, children, className }: OverlayModalProps) {
    const [mounted, setMounted] = useState(false);

    // useEffect chỉ chạy sau khi component đã mount trên client, lúc đó document mới tồn tại.
    useEffect(() => setMounted(true), []);

    useBodyLockScroll(open);

    if (!mounted) return null; // tránh gọi document khi SSR

    return ReactDOM.createPortal(
        <div
            className={cx('wrapper', className, {
                ['modal-open']: open,
            })}
            onClick={onClose}
        >
            {children}
        </div>,
        document.body,
    );
}

export default OverlayModal;
