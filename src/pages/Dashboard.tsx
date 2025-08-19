import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { User, Session } from "@supabase/supabase-js";
import { Header } from "@/components/header";
import { 
  MapPin, 
  History, 
  MessageCircle, 
  Settings, 
  Map,
  Route,
  Clock,
  Star
} from "lucide-react";

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  accessibility_needs: string[];
  preferred_transport: string[];
}

interface SavedRoute {
  id: string;
  route_name: string;
  start_location: string;
  end_location: string;
  accessibility_features: string[];
  created_at: string;
}

interface FrequentDestination {
  id: string;
  destination_name: string;
  address: string;
  visit_count: number;
  last_visited: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [savedRoutes, setSavedRoutes] = useState<SavedRoute[]>([]);
  const [frequentDestinations, setFrequentDestinations] = useState<FrequentDestination[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate("/auth");
      } else {
        fetchUserData(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchUserData = async (userId: string) => {
    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (profileData) {
        setProfile(profileData);
      }

      // Fetch saved routes
      const { data: routesData } = await supabase
        .from("saved_routes")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(3);

      if (routesData) {
        setSavedRoutes(routesData);
      }

      // Fetch frequent destinations
      const { data: destinationsData } = await supabase
        .from("frequent_destinations")
        .select("*")
        .eq("user_id", userId)
        .order("visit_count", { ascending: false })
        .limit(3);

      if (destinationsData) {
        setFrequentDestinations(destinationsData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-soft flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {profile?.full_name?.charAt(0) || user?.email?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">
                Welcome back, {profile?.full_name || "User"}!
              </h1>
              <p className="text-muted-foreground">
                Ready to find your next accessible journey?
              </p>
            </div>
          </div>
          <Button onClick={() => navigate("/chat")} className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Start AI Chat
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-300" onClick={() => navigate("/chat")}>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <CardTitle className="ml-2">AI Assistant</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Ask Qraptor AI about accessible transport options
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-all duration-300" onClick={() => navigate("/map")}>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Map className="h-5 w-5 text-primary" />
              <CardTitle className="ml-2">Map View</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Explore accessible routes and stations nearby
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-all duration-300" onClick={() => navigate("/feedback")}>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Star className="h-5 w-5 text-primary" />
              <CardTitle className="ml-2">Rate Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Share feedback about accessibility features
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Saved Routes */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Route className="h-5 w-5" />
                Saved Routes
              </CardTitle>
            </CardHeader>
            <CardContent>
              {savedRoutes.length > 0 ? (
                <div className="space-y-3">
                  {savedRoutes.map((route) => (
                    <div key={route.id} className="p-3 border rounded-lg">
                      <h4 className="font-medium">{route.route_name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {route.start_location} → {route.end_location}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {route.accessibility_features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    View All Routes
                  </Button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Route className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No saved routes yet</p>
                  <Button onClick={() => navigate("/chat")} size="sm" className="mt-2">
                    Find Your First Route
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Frequent Destinations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Frequent Destinations
              </CardTitle>
            </CardHeader>
            <CardContent>
              {frequentDestinations.length > 0 ? (
                <div className="space-y-3">
                  {frequentDestinations.map((destination) => (
                    <div key={destination.id} className="p-3 border rounded-lg">
                      <h4 className="font-medium">{destination.destination_name}</h4>
                      <p className="text-sm text-muted-foreground">{destination.address}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{destination.visit_count} visits</Badge>
                        <span className="text-xs text-muted-foreground">
                          Last: {new Date(destination.last_visited).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    View All Destinations
                  </Button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No frequent destinations yet</p>
                  <Button onClick={() => navigate("/chat")} size="sm" className="mt-2">
                    Start Exploring
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <History className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No recent activity</p>
              <p className="text-sm text-muted-foreground mt-1">
                Start using AccessiNavi to see your activity here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;