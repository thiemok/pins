'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavigationItem as NavigationItemType } from '@/config/navigation';

interface NavigationItemProps {
  item: NavigationItemType;
}

export function NavigationItem({ item }: NavigationItemProps) {
  const pathname = usePathname();

  // Check if item is available using useMemo
  const isAvailable = useMemo(() => {
    return item.isAvailable ? item.isAvailable() : true;
  }, [item]);

  // Determine if the item is active using useMemo
  const isActive = useMemo(() => {
    return item.isActive ? item.isActive(pathname) : pathname === item.path;
  }, [item, pathname]);

  if (!isAvailable) {
    return null;
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive} tooltip={item.name}>
        <Link href={item.path}>
          {item.icon && item.icon}
          <span>{item.name}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
