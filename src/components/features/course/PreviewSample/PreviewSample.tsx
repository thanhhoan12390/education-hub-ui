import classNames from 'classnames/bind';
import useSWR from 'swr';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import { Preview } from '~/types';
import styles from './PreviewSample.module.scss';

const cx = classNames.bind(styles);

interface PreviewSampleProps {
    previewId: number;
    isCurrent: boolean;
    onClick: () => void;
}

function PreviewSample({ previewId, isCurrent, onClick }: PreviewSampleProps) {
    const url = `/api/previews/${previewId}`;

    const { data, error, isLoading } = useSWR<Preview>(url, {
        revalidateOnFocus: false,
    });

    return (
        <div
            onClick={onClick}
            className={cx('preview-sample', {
                ['current-preview']: isCurrent,
            })}
        >
            <div className={cx('preview-thumbnail')}>
                {isLoading ? (
                    <Spin style={{ color: 'var(--gray-color-100)' }} indicator={<LoadingOutlined spin />} />
                ) : (
                    <Image
                        src={data?.thumbNail ?? ''}
                        alt="preview thumbnail"
                        width={320}
                        height={180}
                        loading="lazy"
                    />
                )}
            </div>
            <div className={cx('play-icon')}>
                <FontAwesomeIcon icon={faPlay} fontSize="0.8rem" />
            </div>

            <div className={cx('thumb-title')}>{data?.title}</div>
            <div className={cx('preview-min')}>{data?.previewMin}</div>
        </div>
    );
}

export default PreviewSample;
