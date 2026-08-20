import type React from 'react';

import styles from './Tag.module.scss';

type TProps = {
  children: string;
};

export const Tag: React.FC<TProps> = ({ children }) => (
  <li className={styles.tag}>#{children}</li>
);
