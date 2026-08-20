import type React from 'react';

import type { TTrain } from '../../types/train';
import { formatDate, formatPrice, getRouteEndpoints, pluralizeDays } from '../../utils/trainData';
import { Tags } from '../Tags/Tags';
import styles from './TrainCard.module.scss';

type TProps = {
  train: TTrain;
  previewDeparture: string | null;
  onOpen: (train: TTrain) => void;
};

const TrainCard: React.FC<TProps> = ({ train, previewDeparture, onOpen }) => (
  <article className={styles.card}>
    <div className={styles.topline}>
      <span className={styles.region}>{train.region}</span>
      <span className={styles.duration}>{pluralizeDays(train.duration_days)}</span>
    </div>

    <h3 className={styles.title}>{train.name}</h3>
    <p className={styles.route}>{getRouteEndpoints(train.route)}</p>

    <div className={styles.meta}>
      <div>
        <span className={styles.label}>Ближайшее отправление</span>
        <strong>{previewDeparture ? formatDate(previewDeparture) : 'Даты уточняются'}</strong>
      </div>
      <div>
        <span className={styles.label}>Стоимость</span>
        <strong>от {formatPrice(train.price_from)}</strong>
      </div>
    </div>

    <div className={styles.footer}>
      <Tags tags={train.tags} ariaLabel="Особенности маршрута" />
      <button className={styles.more} type="button" onClick={() => onOpen(train)}>
        Подробнее
      </button>
    </div>
  </article>
);

export { TrainCard };
