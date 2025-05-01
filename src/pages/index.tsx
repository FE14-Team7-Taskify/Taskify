import styles from './home.module.scss';

export default function HomePage() {
  return (
    <>
      <div style={{ padding: '2rem' }}>
        <div className={styles['test-xs']}>Text XS</div>
        <div className={styles['test-sm']}>Text SM</div>
        <div className={styles['test-md']}>Text MD</div>
        <div className={styles['test-lg']}>Text LG</div>
        <div className={styles['test-2lg']}>Text 2LG</div>
        <div className={styles['test-xl']}>Text XL</div>
        <div className={styles['test-2xl']}>Text 2XL</div>
        <div className={styles['test-3xl']}>Text 3XL</div>
        <div className={styles['test-responsive']}>Responsive Test</div>
      </div>
    </>
  );
}
