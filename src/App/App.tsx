import type React from 'react';

import { TrainsPage } from '../pages/TrainsPage';

type TProps = Record<string, never>;

export const App: React.FC<TProps> = () => <TrainsPage />;
