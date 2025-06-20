import { type Route } from 'next';
import { type ReactNode } from 'react';

export interface NavigationItem {
  kind: 'item';
  name: string;
  icon?: ReactNode;
  path: Route;
  isActive?: (pathname: string) => boolean;
  isAvailable?: () => boolean;
}

export interface NavigationGroup {
  kind: 'group';
  name: string;
  icon?: ReactNode;
  items: NavigationItem[];
}

export type NavigationEntry = NavigationItem | NavigationGroup;

export const navigationConfig: NavigationEntry[] = [];
