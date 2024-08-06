import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Navigation from '../Navigation';

const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            <Navigation />
            <div className={cx('')}>{children}</div>
        </div>
    );
};
export default DefaultLayout;
