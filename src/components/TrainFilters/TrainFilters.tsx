import type React from 'react';
import { useForm } from 'react-hook-form';

import type { TTrainFilters } from '../../types/train';
import { formatMonth } from '../../utils/trainData';
import styles from './TrainFilters.module.scss';

type TProps = {
  filters: TTrainFilters;
  months: string[];
  regions: string[];
  resultCount: number;
  onChange: (filters: TTrainFilters) => void;
};

const TrainFilters: React.FC<TProps> = ({ filters, months, regions, resultCount, onChange }) => {
  const { getValues, register, reset } = useForm<TTrainFilters>({ defaultValues: filters });

  const handleChange = (): void => {
    onChange(getValues());
  };

  const handleReset = (): void => {
    const emptyFilters: TTrainFilters = { search: '', region: '', month: '' };
    reset(emptyFilters);
    onChange(emptyFilters);
  };

  return (
    <section className={styles.panel} aria-labelledby="filters-title">
      <div className={styles.headingRow}>
        <h2 className={styles.title} id="filters-title">
          Поиск по каталогу
        </h2>
        <p className={styles.count} aria-live="polite">
          Найдено: <strong>{resultCount}</strong>
        </p>
      </div>

      <form className={styles.form} onChange={handleChange} onSubmit={(event) => event.preventDefault()}>
        <label className={`${styles.field} ${styles.searchField}`}>
          <span>Название поезда</span>
          <input type="search" placeholder="Например, Карелию" {...register('search')} />
        </label>

        <label className={styles.field}>
          <span>Регион</span>
          <select {...register('region')}>
            <option value="">Все регионы</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span>Месяц отправления</span>
          <select {...register('month')}>
            <option value="">Все месяцы</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {formatMonth(month)}
              </option>
            ))}
          </select>
        </label>

        <button className={styles.reset} type="button" onClick={handleReset}>
          Сбросить
        </button>
      </form>
    </section>
  );
};

export { TrainFilters };
