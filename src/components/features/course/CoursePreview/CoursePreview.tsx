import classNames from 'classnames/bind';
import dynamic from 'next/dynamic';
const StreamingPlayer = dynamic(() => import('~/components/ui/StreamingPlayer'), {
    ssr: false, // tránh SSR load video.js
    loading: () => <p>Loading player...</p>,
});

import styles from './CoursePreview.module.scss';

const cx = classNames.bind(styles);

function CoursePreview() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('preview-container')} onClick={(e) => e.stopPropagation()}>
                <h2 className={cx('preview-heading')}>
                    <span>Course Preview</span>
                    <span>The Data Science Course: Complete Data Science Bootcamp 2025</span>
                </h2>
                <div className={cx('preview-content')}>
                    <div className={cx('preview-video-container')}>
                        <StreamingPlayer src="https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/master.m3u8" />
                    </div>
                    <div className={cx('free-sample')}>Free Sample Videos</div>
                    <div className={cx('samples-container')}>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet debitis sit sequi vero eaque,
                        impedit magni adipisci? Aspernatur, quia ut ratione maiores quisquam quo perspiciatis optio
                        delectus deleniti, inventore eos!
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CoursePreview;
