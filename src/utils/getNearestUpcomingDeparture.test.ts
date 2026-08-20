import { getNearestUpcomingDeparture } from './getNearestUpcomingDeparture';

const departures = ['2026-09-10', '2026-10-12'];

describe('getNearestUpcomingDeparture', () => {
  it('находит ближайшую не прошедшую дату', () => {
    expect(getNearestUpcomingDeparture(departures, new Date(2026, 8, 15))).toBe('2026-10-12');
  });

  it('возвращает null при отсутствии будущих дат', () => {
    expect(getNearestUpcomingDeparture(departures, new Date(2027, 0, 1))).toBeNull();
  });
});
