import COLOR from 'constants/colors';
import styles from './LineChart.module.css';
import BounceLoader from 'react-spinners/BounceLoader';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <BounceLoader color={COLOR.GREEN} size={100} speedMultiplier={2} />
    </div>
  );
};

export default Loading;
