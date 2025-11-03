'use client';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useState, Fragment } from 'react';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';

import CoursePreview from '../CoursePreview';
import FlexibleButton from '~/components/ui/FlexibleButton';
import OverlayModal from '~/components/ui/OverlayModal';
import styles from './PreviewModalButton.module.scss';

const cx = classNames.bind(styles);

interface PreviewModalButtonProps {
    isOverlayButton?: boolean;
}

function PreviewModalButton({ isOverlayButton }: PreviewModalButtonProps) {
    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
        <Fragment>
            {isOverlayButton ? (
                <div className={cx('play-btn-overlay')} onClick={() => setIsOpenModal(true)}>
                    <div className={cx('play-btn')}>
                        <FontAwesomeIcon fontSize="2.4rem" icon={faPlay} />
                    </div>
                </div>
            ) : (
                <FlexibleButton
                    onClick={() => setIsOpenModal(true)}
                    leftIcon={<FontAwesomeIcon fontSize="1.6rem" color="#333" icon={faCirclePlay} />}
                    className={cx('preview-btn')}
                >
                    Preview
                </FlexibleButton>
            )}

            <OverlayModal open={isOpenModal} onClose={() => setIsOpenModal(false)}>
                <CoursePreview />
            </OverlayModal>
        </Fragment>
    );
}

export default PreviewModalButton;
