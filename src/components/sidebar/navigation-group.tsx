'use client';

import { useMemo } from 'react';

import { NavigationItem } from '@/components/sidebar/navigation-item';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar';
import {
  type NavigationGroup as NavigationGroupType,
  type NavigationItem as NavigationItemType,
} from '@/config/navigation';

interface NavigationGroupProps {
  group: NavigationGroupType;
}

export function NavigationGroup({ group }: NavigationGroupProps) {
  // Check if any item in the group is available
  const hasAvailableItems = useMemo(() => {
    return group.items.some((item) => {
      return item.isAvailable ? item.isAvailable() : true;
    });
  }, [group.items]);

  // Don't render the group if no items are available
  if (!hasAvailableItems) {
    return null;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        {group.icon && group.icon}
        <span>{group.name}</span>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {group.items.map((item: NavigationItemType) => (
            <NavigationItem key={item.path} item={item} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
