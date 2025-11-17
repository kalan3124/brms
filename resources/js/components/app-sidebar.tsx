import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { IconCarGarage, IconDashboard, IconHelp, IconInnerShadowTop, IconMap, IconRun, IconScooter, IconSearch, IconSettings } from '@tabler/icons-react';
import * as React from 'react';
import { NavMenus } from './ui/nav-menu';

const data = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg',
    },
    navMain: [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: IconDashboard,
        },
    ],
    manageBikes: [
        {
            name: 'Bikes',
            url: '/bikes/index',
            icon: IconScooter,
        },
        {
            name: 'Ongoing Bikes',
            url: '#',
            icon: IconRun,
        },
        {
            name: 'Track Bikes',
            url: '#',
            icon: IconMap,
        },
    ],
    manageRepaire: [
        {
            name: 'Repires',
            url: '#',
            icon: IconCarGarage,
        },
    ],
    navSecondary: [
        {
            title: 'Settings',
            url: '#',
            icon: IconSettings,
        },
        {
            title: 'Get Help',
            url: '#',
            icon: IconHelp,
        },
        {
            title: 'Search',
            url: '#',
            icon: IconSearch,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
                            <a href="#">
                                <IconInnerShadowTop className="!size-5" />
                                <span className="text-base font-semibold">BRMS</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavMenus name={'Manage Bikes'} items={data.manageBikes} />
                <NavMenus name={'Manage Repires'} items={data.manageRepaire} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    );
}
