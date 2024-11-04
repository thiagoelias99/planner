import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { FaListCheck } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";

import { useLocation, useNavigate } from 'react-router-dom';

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
  const { setOpenMobile } = useSidebar();
  const navigate = useNavigate()

  function handleMenuClick(url: string) {
    setOpenMobile(false);
    navigate(url);
  }

  return (
    <Sidebar collapsible='icon'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={currentPath.startsWith(item.url)}
                    onClick={() => handleMenuClick(item.url)}
                    className='py-5'
                  >
                    <div className='flex justify-start items-center gap-4'>
                      <item.icon />
                      <span>{item.title}</span>
                    </div>
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
