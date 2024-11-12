import classNames from 'classnames/bind';
import styles from './LoginLayout.module.scss';
const cx = classNames.bind(styles);

const LoginLayout = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('')}>{children}</div>
        </div>
    );
};
export default LoginLayout;
