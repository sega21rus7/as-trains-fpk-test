import type React from 'react';

import styles from './Tag.module.scss';

type TProps = {
  children: string;
};

const Tag: React.FC<TProps> = ({ children }) => (
  <li className={styles.tag}>#{children}</li>
);

export { Tag };
