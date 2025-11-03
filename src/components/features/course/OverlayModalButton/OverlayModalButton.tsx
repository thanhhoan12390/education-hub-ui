'use client';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useState, Fragment } from 'react';
import StreamingPlayer from '~/components/ui/StreamingPlayer';

import OverlayModal from '~/components/ui/OverlayModal';
import styles from './OverlayModalButton.module.scss';

const cx = classNames.bind(styles);

function OverlayModalButton() {
    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
        <Fragment>
            <div className={cx('play-btn-overlay')} onClick={() => setIsOpenModal(true)}>
                <div className={cx('play-btn')}>
                    <FontAwesomeIcon fontSize="2.4rem" icon={faPlay} />
                </div>
            </div>

            <OverlayModal open={isOpenModal} onClose={() => setIsOpenModal(false)}>
                Day la modal (
                <StreamingPlayer src="https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8" />
                )
            </OverlayModal>
        </Fragment>
    );
}

export default OverlayModalButton;
