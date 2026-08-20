import { useEffect, useRef } from 'react';
import type React from 'react';

import type { TTrain } from '../../types/train';
import { formatDate, formatPrice, pluralizeDays } from '../../utils';
import { Tags } from '../Tags';

import styles from './TrainDetails.module.scss';

type TProps = {
  train: TTrain;
  onClose: () => void;
};

const normalizeDashCharacters = (value: string): string => value.replace(/[—–]/g, '-');

export const TrainDetails: React.FC<TProps> = ({ train, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) {
        return;
      }

      const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements.item(0);
      const lastElement = focusableElements.item(focusableElements.length - 1);

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.backdrop} onMouseDown={handleBackdropClick}>
      <div
        className={styles.dialog}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="train-details-title"
      >
        <header className={styles.header}>
          <div>
            <span className={styles.region}>{train.region}</span>
            <h2 id="train-details-title">{train.name}</h2>
          </div>
          <button
            className={styles.close}
            ref={closeButtonRef}
            type="button"
            aria-label="Закрыть подробности"
            onClick={onClose}
          >
            Закрыть
          </button>
        </header>

        <div className={styles.content}>
          <section className={styles.routeSection} aria-labelledby="route-title">
            <p className={styles.kicker} id="route-title">
              Маршрут путешествия
            </p>
            <ol className={styles.route} aria-labelledby="route-title">
              {train.route.map((city, index) => (
                <li key={`${city}-${index}`}>{city}</li>
              ))}
            </ol>
          </section>

          <div className={styles.summary}>
            <div>
              <span>Продолжительность</span>
              <strong>{pluralizeDays(train.duration_days)}</strong>
            </div>
            <div>
              <span>Стоимость</span>
              <strong>от {formatPrice(train.price_from)}</strong>
            </div>
          </div>

          <p className={styles.description}>{normalizeDashCharacters(train.description)}</p>

          <div className={styles.columns}>
            <section aria-labelledby="departures-title">
              <h3 id="departures-title">Даты отправления</h3>
              <ul className={styles.departures}>
                {[...train.departures].sort().map((date) => (
                  <li key={date}>{formatDate(date)}</li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="excursions-title">
              <h3 id="excursions-title">В программе</h3>
              <ul className={styles.excursions}>
                {train.excursions.map((excursion) => (
                  <li key={excursion}>{normalizeDashCharacters(excursion)}</li>
                ))}
              </ul>
            </section>
          </div>

          <section className={styles.tagsSection} aria-labelledby="tags-title">
            <h3 id="tags-title">Особенности</h3>
            <Tags tags={train.tags} />
          </section>

          <a
            className={styles.buy}
            href={train.buy_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Купить билет
          </a>
        </div>
      </div>
    </div>
  );
};
