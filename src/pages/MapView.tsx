import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin, 
  Navigation, 
  Bus, 
  Train, 
  Car, 
  Accessibility,
  Search,
  Filter,
  Info
} from "lucide-react";

const MapView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTransport, setSelectedTransport] = useState<string | null>(null);
  const { toast } = useToast();

  const transportTypes = [
    { id: "bus", icon: Bus, label: "Buses", color: "bg-blue-500" },
    { id: "metro", icon: Train, label: "Metro/Rail", color: "bg-green-500" },
    { id: "taxi", icon: Car, label: "Accessible Taxis", color: "bg-purple-500" },
  ];

  const nearbyStations = [
    {
      id: 1,
      name: "Central Station",
      type: "metro",
      distance: "0.2 km",
      accessibility: ["Wheelchair Access", "Audio Announcements", "Tactile Guide"],
      status: "Available"
    },
    {
      id: 2,
      name: "Main St Bus Stop",
      type: "bus",
      distance: "0.4 km",
      accessibility: ["Low Floor Bus", "Priority Seating", "Visual Display"],
      status: "Available"
    },
    {
      id: 3,
      name: "University Metro",
      type: "metro",
      distance: "0.8 km",
      accessibility: ["Elevator Access", "Wide Gates", "Audio Announcements"],
      status: "Maintenance"
    },
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search required",
        description: "Please enter a destination to search for routes.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Searching...",
      description: `Looking for accessible routes to ${searchQuery}`,
    });
  };

  const getTransportIcon = (type: string) => {
    const transport = transportTypes.find(t => t.id === type);
    return transport ? transport.icon : MapPin;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-success text-success-foreground";
      case "Maintenance":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Find Accessible Transport
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter destination (e.g., City Center, Hospital, University)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>

            {/* Transport Type Filters */}
            <div className="flex flex-wrap gap-2">
              {transportTypes.map((transport) => {
                const Icon = transport.icon;
                const isSelected = selectedTransport === transport.id;
                return (
                  <Button
                    key={transport.id}
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTransport(isSelected ? null : transport.id)}
                    className="flex items-center gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {transport.label}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="h-5 w-5" />
                  Interactive Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
                  <div className="relative text-center z-10">
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Interactive Map View</h3>
                    <p className="text-muted-foreground mb-4">
                      Map integration will show accessible transport options,<br />
                      real-time updates, and route planning
                    </p>
                    <Badge variant="secondary">Coming Soon</Badge>
                  </div>
                  
                  {/* Mock map markers */}
                  <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-primary rounded-full shadow-lg"></div>
                  <div className="absolute top-2/3 left-1/2 w-3 h-3 bg-success rounded-full shadow-lg"></div>
                  <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-purple-500 rounded-full shadow-lg"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nearby Stations */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Accessibility className="h-5 w-5" />
                  Nearby Accessible Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {nearbyStations.map((station) => {
                    const Icon = getTransportIcon(station.type);
                    return (
                      <div key={station.id} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-primary" />
                            <h4 className="font-medium">{station.name}</h4>
                          </div>
                          <Badge className={getStatusColor(station.status)} variant="secondary">
                            {station.status}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">
                          {station.distance} away
                        </p>
                        
                        <div className="flex flex-wrap gap-1">
                          {station.accessibility.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Legend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {transportTypes.map((transport) => {
                    const Icon = transport.icon;
                    return (
                      <div key={transport.id} className="flex items-center gap-2">
                        <div className={`p-1 rounded ${transport.color}`}>
                          <Icon className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-sm">{transport.label}</span>
                      </div>
                    );
                  })}
                  <div className="pt-2 border-t">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <span className="text-sm">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-destructive rounded-full"></div>
                      <span className="text-sm">Maintenance</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;