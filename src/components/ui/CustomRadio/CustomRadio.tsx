import classNames from 'classnames/bind';

import styles from './CustomRadio.module.scss';

const cx = classNames.bind(styles);

function CustomRadio({ className, ...rest }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <label className={cx('radio-container', className)} onClick={(e) => e.stopPropagation()}>
            <input className={cx('custom-input')} type="radio" {...rest} />
            <span className={cx('checkmark')} />
        </label>
    );
}

export default CustomRadio;
