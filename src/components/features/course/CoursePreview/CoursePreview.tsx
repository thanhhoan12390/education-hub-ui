import classNames from 'classnames/bind';
import dynamic from 'next/dynamic';
import useSWR from 'swr';
import { useState } from 'react';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { Spin, Skeleton } from 'antd';

const StreamingPlayer = dynamic(() => import('~/components/ui/StreamingPlayer'), {
    ssr: false, // tránh SSR load video.js
    loading: () => (
        <Spin style={{ color: 'var(--gray-color-100)' }} indicator={<Loading3QuartersOutlined spin />} size="large" />
    ),
});
import PreviewSample from '../PreviewSample';
import { Preview } from '~/types';
import FlexibleButton from '~/components/ui/FlexibleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './CoursePreview.module.scss';

const cx = classNames.bind(styles);

interface CoursePreviewProps {
    open?: boolean;
    onClose?: () => void;
}

function CoursePreview({ open = false, onClose }: CoursePreviewProps) {
    const [selectedId, setSelectedId] = useState(1);

    const url = `/api/previews/${selectedId}`;

    const { data, error, isLoading } = useSWR<Preview>(url, {
        revalidateOnFocus: false,
    });

    return open ? (
        <div className={cx('wrapper')}>
            <div className={cx('container')} onClick={(e) => e.stopPropagation()}>
                <div className={cx('preview-container')}>
                    <h2 className={cx('preview-heading')}>
                        <span>Course Preview</span>
                        {isLoading ? (
                            <Skeleton.Button
                                style={{ backgroundColor: 'var(--gray-color)', inlineSize: '100%' }}
                                active
                                size="default"
                                block
                            />
                        ) : (
                            <span>{data?.title}</span>
                        )}
                    </h2>
                    <div className={cx('preview-content')}>
                        <div className={cx('preview-video-container')}>
                            {isLoading ? (
                                <Spin
                                    style={{ color: 'var(--gray-color-100)' }}
                                    indicator={<Loading3QuartersOutlined spin />}
                                    size="large"
                                />
                            ) : (
                                // "key trick" thay vì reusing cùng <StreamingPlayer> instance,
                                // thêm key={data?.previewId} để React tạo mới hẳn component mỗi khi đổi preview
                                <StreamingPlayer key={data?.previewId} src={data?.previewSrc ?? ''} />
                            )}
                        </div>

                        <div className={cx('free-sample')}>Free Sample Videos:</div>

                        <div className={cx('samples-container')}>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <PreviewSample
                                    key={index}
                                    previewId={index + 1}
                                    isCurrent={index + 1 === selectedId}
                                    onClick={() => setSelectedId(index + 1)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <FlexibleButton onClick={onClose} hover className={cx('close-btn')}>
                    <FontAwesomeIcon icon={faXmark} />
                </FlexibleButton>
            </div>
        </div>
    ) : null;
}

export default CoursePreview;
