import type React from 'react';

import styles from './App.module.scss';

type TProps = Record<string, never>;

const App: React.FC<TProps> = () => (
  <main className={styles.page}>
    <h1 className={styles.title}>Hello World</h1>
  </main>
);

export { App };
