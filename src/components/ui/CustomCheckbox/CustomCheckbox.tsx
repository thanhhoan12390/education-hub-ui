import classNames from 'classnames/bind';

import styles from './CustomCheckbox.module.scss';

const cx = classNames.bind(styles);

function CustomCheckbox({ className, ...rest }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <label className={cx('checkbox-container', className)} onClick={(e) => e.stopPropagation()}>
            <input type="checkbox" {...rest} />
            <span className={cx('checkmark')} />
        </label>
    );
}

export default CustomCheckbox;
