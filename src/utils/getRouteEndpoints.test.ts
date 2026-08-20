import { getRouteEndpoints } from './getRouteEndpoints';

describe('getRouteEndpoints', () => {
  it('соединяет начальную и конечную точки маршрута', () => {
    expect(getRouteEndpoints(['Москва', 'Тула', 'Архангельск'])).toBe('Москва → Архангельск');
  });
});
