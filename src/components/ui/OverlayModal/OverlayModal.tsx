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
}

function OverlayModal({ open = false, onClose, children }: OverlayModalProps) {
    const [mounted, setMounted] = useState(false);

    // useEffect chỉ chạy sau khi component đã mount trên client, lúc đó document mới tồn tại.
    useEffect(() => setMounted(true), []);

    useBodyLockScroll(open);

    if (!mounted) return null; // tránh gọi document khi SSR

    return ReactDOM.createPortal(
        open && (
            <div
                className={cx('wrapper', {
                    ['modal-open']: open,
                })}
                onClick={onClose}
            >
                <div className={cx('container')}>{children}</div>
            </div>
        ),
        document.body,
    );
}

export default OverlayModal;
