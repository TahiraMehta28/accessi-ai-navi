import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/header";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  MessageCircle, 
  MapPin, 
  Clock, 
  Shield, 
  Users, 
  Accessibility,
  Bus,
  Train,
  Car,
  Smartphone,
  ArrowRight
} from "lucide-react";
import heroImage from "@/assets/hero-transport.jpg";

const Index = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "AI-Powered Chat",
      description: "Ask our Qraptor AI assistant about accessible transport options in natural language."
    },
    {
      icon: MapPin,
      title: "Real-Time Location",
      description: "Automatically finds accessible buses, metros, and rides near your current location."
    },
    {
      icon: Clock,
      title: "Instant Results",
      description: "Get route suggestions, schedules, and booking options in seconds."
    },
    {
      icon: Shield,
      title: "Verified Information",
      description: "All accessibility data is verified and regularly updated from official sources."
    }
  ];

  const transportTypes = [
    {
      icon: Bus,
      title: "Accessible Buses",
      description: "Find buses with wheelchair ramps, priority seating, and audio announcements.",
      color: "bg-blue-500"
    },
    {
      icon: Train,
      title: "Metro & Rail",
      description: "Discover stations with elevator access, platform assistance, and accessible carriages.",
      color: "bg-green-500"
    },
    {
      icon: Car,
      title: "Ride Services",
      description: "Book wheelchair-accessible taxis and ride-sharing vehicles instantly.",
      color: "bg-purple-500"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Ask Your Question",
      description: "Tell our AI where you want to go or what transport you need"
    },
    {
      step: "2",
      title: "Get Smart Suggestions",
      description: "Receive personalized accessible transport options with real-time data"
    },
    {
      step: "3",
      title: "Travel Confidently",
      description: "Navigate with detailed accessibility information and live updates"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                <span className="text-gradient">AI-Powered</span>
                <br />
                Accessible Transport
                <br />
                <span className="text-primary">Made Simple</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                Find wheelchair-accessible buses, metros, and rides instantly with our AI assistant. 
                No more guessing – get verified accessibility information in seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="group">
                  <Link to="/auth">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-glow">
                <img 
                  src={heroImage} 
                  alt="Accessible transportation illustration" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-primary/20"></div>
              </div>
              <div className="absolute -top-4 -right-4 p-3 bg-white rounded-full shadow-lg dark:bg-card">
                <Accessibility className="h-8 w-8 text-primary" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Transport Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Find Accessible <span className="text-gradient">Transport Options</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI assistant helps you discover and book wheelchair-accessible transportation across all modes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {transportTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full bg-card/80 backdrop-blur-md hover:shadow-glow transition-all duration-300 group">
                    <CardHeader className="text-center">
                      <div className={`p-4 rounded-full ${type.color} w-fit mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">{type.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-muted-foreground">{type.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient">Smart Features</span> for Better Mobility
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of accessible transportation with AI-powered assistance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full text-center bg-card/80 backdrop-blur-md">
                    <CardHeader>
                      <div className="p-3 rounded-lg bg-gradient-primary w-fit mx-auto mb-4">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How <span className="text-gradient">AccessiNavi</span> Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Getting accessible transport information has never been easier. Just three simple steps.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-primary text-white flex items-center justify-center text-2xl font-bold mx-auto">
                    {step.step}
                  </div>
                  {index < howItWorks.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-primary/30"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Smartphone className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience Accessible Transportation?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust AccessiNavi for their daily mobility needs. 
              Start your journey with our AI assistant today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="group">
                <Link to="/auth">
                  Start Your Journey Today
                  <MessageCircle className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;