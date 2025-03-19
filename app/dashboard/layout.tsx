import React from 'react'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/appSidebar';




const Dashboardlayout = ({
    children,
}: {
  children: React.ReactNode;
}
) => {
  return (
    <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="bg-base-200">
                
            <main className='px-4 max-w-4xl mx-auto overflow-hidden min-h-screen'>
                    {children}
                
            </main>
            </SidebarInset>
        </SidebarProvider>
  )
}

export default Dashboardlayout