'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import OverlayModal from '~/components/ui/OverlayModal';
import styles from './MenuModal.module.css';

interface MenuModalProps {
    open?: boolean;
    onClose?: () => void;
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
}

function MenuModal({ open = false, onClose, children, style, className }: MenuModalProps) {
    const menuWrapperClassName = [styles.menuWrapper, open && styles.menuOpen, className].filter(Boolean).join(' ');
    const menuContainerClassName = [styles.menuContainer, open && styles.menuContainerShow].filter(Boolean).join(' ');
    const closeBtnClassName = [styles.menuCloseBtn, open && styles.menuCloseBtnVisible].filter(Boolean).join(' ');

    return (
        <>
            <OverlayModal open={open} onClose={onClose} className={styles.overlayModal}>
                {null}
            </OverlayModal>

            <div style={style} className={menuWrapperClassName}>
                <div className={menuContainerClassName}>{children}</div>
                <div className={closeBtnClassName} onClick={onClose}>
                    <FontAwesomeIcon fontSize="1.4rem" icon={faXmark} />
                </div>
            </div>
        </>
    );
}

export default MenuModal;
