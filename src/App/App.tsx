import { useEffect, useRef, useState } from 'react';
import type React from 'react';

import rawTrainData from '../../trains.json';
import { TrainCard } from '../components/TrainCard';
import { TrainDetails } from '../components/TrainDetails';
import { TrainFilters } from '../components/TrainFilters';
import type { TTrain, TTrainFilters } from '../types/train';
import {
  filterTrains,
  getMonths,
  getPreviewDeparture,
  getRegions,
  parseTrainData,
} from '../utils';

import styles from './App.module.scss';

type TProps = Record<string, never>;

const trainData = parseTrainData(rawTrainData);
const initialFilters: TTrainFilters = { search: '', region: '', month: '' };

export const App: React.FC<TProps> = () => {
  const [filters, setFilters] = useState<TTrainFilters>(initialFilters);
  const [selectedTrain, setSelectedTrain] = useState<TTrain | null>(null);
  const openingElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (selectedTrain === null && openingElementRef.current) {
      openingElementRef.current.focus();
      openingElementRef.current = null;
    }
  }, [selectedTrain]);

  if (!trainData) {
    return (
      <main className={styles.errorPage}>
        <section className={styles.error} role="alert">
          <span aria-hidden="true">!</span>
          <h1>Не удалось загрузить каталог</h1>
          <p>Проверьте структуру файла trains.json и обновите страницу.</p>
        </section>
      </main>
    );
  }

  const filteredTrains = filterTrains(trainData.trains, filters);
  const regions = getRegions(trainData.trains);
  const months = getMonths(trainData.trains);

  const handleOpen = (train: TTrain): void => {
    if (document.activeElement instanceof HTMLElement) {
      openingElementRef.current = document.activeElement;
    }
    setSelectedTrain(train);
  };

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.brandRow}>
            <p className={styles.brand}>Путешествия по России</p>
            <p className={styles.brandMeta}>Туристские поезда ФПК</p>
          </div>
          <div className={styles.heroText}>
            <h1>Витрина туристских поездов</h1>
            <p className={styles.lead}>
              Выберите путешествие, где дорога становится частью впечатлений.
            </p>
          </div>
        </div>
        <div className={styles.heroMedia}>
          <img
            src="/train-hero.jpg"
            alt="Пассажирский поезд в пути"
            width="1920"
            height="821"
            fetchPriority="high"
          />
        </div>
      </header>

      <main className={styles.main}>
        <TrainFilters
          filters={filters}
          months={months}
          regions={regions}
          resultCount={filteredTrains.length}
          onChange={setFilters}
        />

        <section className={styles.catalog} aria-labelledby="catalog-title">
          <div className={styles.catalogHeading}>
            <h2 id="catalog-title">Найдите свой поезд</h2>
            <p>Пять маршрутов для коротких поездок и больших путешествий.</p>
          </div>

          {filteredTrains.length > 0 ? (
            <div className={styles.grid}>
              {filteredTrains.map((train) => (
                <TrainCard
                  key={train.id}
                  train={train}
                  previewDeparture={getPreviewDeparture(train, filters.month)}
                  onOpen={handleOpen}
                />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <h3>Подходящих поездов не найдено</h3>
              <p>Попробуйте изменить запрос или сбросить выбранные фильтры.</p>
              <button type="button" onClick={() => setFilters(initialFilters)}>
                Сбросить фильтры
              </button>
            </div>
          )}
        </section>
      </main>

      <footer className={styles.footer}>
        <p>Путешествуйте по России с комфортом</p>
        <span>Данные о предложениях актуальны на момент публикации</span>
      </footer>

      {selectedTrain && (
        <TrainDetails train={selectedTrain} onClose={() => setSelectedTrain(null)} />
      )}
    </div>
  );
};
