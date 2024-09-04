import { IndexPage } from '@/pages/IndexPage/IndexPage';
import { InitDataPage } from '@/pages/InitDataPage/InitDataPage';
import { LaunchParamsPage } from '@/pages/LaunchParamsPage/LaunchParamsPage.jsx';
import { ThemeParamsPage } from '@/pages/ThemeParamsPage/ThemeParamsPage.jsx';
import { TONConnectPage } from '@/pages/TONConnectPage/TONConnectPage';
import Home from '@/pages/Home';
import Boost from '@/pages/Boost';
import Info from '@/pages/Info';
import Leaderboard from '@/pages/LeaderBoard';

/**
 * @typedef {object} Route
 * @property {string} path
 * @property {import('react').ComponentType} Component
 * @property {string} [title]
 * @property {import('react').JSX.Element} [icon]
 */

/**
 * @type {Route[]}
 */
export const routes = [
  { path: '/', Component: Home },
  { path: '/boost', Component: Boost },
  { path: '/info', Component: Info },
  { path: '/leaderboard', Component: Leaderboard },
];
