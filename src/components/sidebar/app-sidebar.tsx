import { AppSidebarHeader } from '@/components/sidebar/app-sidebar-header';
import { NavigationGroup } from '@/components/sidebar/navigation-group';
import { NavigationItem } from '@/components/sidebar/navigation-item';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { navigationConfig, type NavigationEntry } from '@/config/navigation';

export function AppSidebar() {
  return (
    <Sidebar>
      <AppSidebarHeader />
      <SidebarContent>
        {navigationConfig.map((entry: NavigationEntry, index) => {
          switch (entry.kind) {
            case 'item':
              return <NavigationItem key={entry.path} item={entry} />;
            case 'group':
              return (
                <NavigationGroup key={`${entry.name}-${index}`} group={entry} />
              );
            default:
              return null;
          }
        })}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
