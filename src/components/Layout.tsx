import { Truck, Bell, Menu } from "lucide-react";
import { Button } from "./ui/Button";
import { SimulationController } from "./SimulationController";
import { ThemeToggle } from "./ThemeToggle";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="border-b h-16 flex items-center px-6 gap-4">
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <Truck className="h-6 w-6" />
          <span>FleetMind</span>
        </div>
        <div className="ml-8">
           <SimulationController />
        </div>
        <nav className="flex-1">
          {/* Navigation items can go here */}
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>
      <main className="flex-1 flex overflow-hidden">
        {children}
      </main>
    </div>
  );
}
