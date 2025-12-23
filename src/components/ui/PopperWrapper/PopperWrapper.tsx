import classNames from 'classnames/bind';

import styles from './PopperWrapper.module.scss';

const cx = classNames.bind(styles);

interface PopperWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    ref?: React.Ref<HTMLDivElement>;
}

function PopperWrapper({ children, className, ref, ...rest }: PopperWrapperProps) {
    return (
        <div ref={ref} className={cx('wrapper', className)} {...rest}>
            {children}
        </div>
    );
}

export default PopperWrapper;
