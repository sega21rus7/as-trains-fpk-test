import React from 'react';

import { Tag } from './components/Tag';

import styles from './Tags.module.scss';

type TProps = {
  tags: string[];
  ariaLabel?: string;
};

export const Tags: React.FC<TProps> = ({ tags, ariaLabel }) => (
  <ul className={styles.tags} aria-label={ariaLabel}>
    {tags.map((tag) => (
      <Tag key={tag}>{tag}</Tag>
    ))}
  </ul>
);
