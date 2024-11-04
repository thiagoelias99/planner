import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { FaListCheck } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";

import { Link, useLocation } from 'react-router-dom';

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: FaHome
  },
  {
    title: "Tarefas",
    url: "/tasks",
    icon: FaListCheck,
  },
]

export function AppSidebar() {
  const currentPath = useLocation().pathname;

  return (
    <Sidebar collapsible='icon'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={currentPath.startsWith(item.url)}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
