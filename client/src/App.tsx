import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import GlobalChatModal from "./components/GlobalChatModal";
import ParticlesBackground from "./components/ParticlesBackground";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ParticlesBackground />
      <Router />
      <GlobalChatModal />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
