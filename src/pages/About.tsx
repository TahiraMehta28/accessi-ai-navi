import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Accessibility, Heart, Users, Zap, MapPin, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const features = [
    {
      icon: Accessibility,
      title: "Accessibility First",
      description: "Every feature designed with wheelchair users and mobility-challenged individuals in mind."
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get real-time information about accessible transport options in seconds."
    },
    {
      icon: MapPin,
      title: "Location Aware",
      description: "Automatically detects your location and finds nearby accessible transportation."
    },
    {
      icon: Shield,
      title: "Reliable Data",
      description: "Verified accessibility information from official transport authorities."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Real user reviews and updates ensure accurate accessibility information."
    },
    {
      icon: Heart,
      title: "Made with Care",
      description: "Built by people who understand the importance of accessible transportation."
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "500+", label: "Cities Covered" },
    { number: "95%", label: "Accuracy Rate" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Making Transportation</span>
            <br />
            Accessible for Everyone
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            AccessiNavi is an AI-powered platform that helps wheelchair users and mobility-challenged 
            individuals find accessible public transport and ride options quickly and reliably.
          </p>
          <Button asChild size="lg" className="mr-4">
            <Link to="/chat">Try Our AI Assistant</Link>
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="text-center bg-card/80 backdrop-blur-md">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-gradient mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose AccessiNavi?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="h-full bg-card/80 backdrop-blur-md hover:shadow-glow transition-all duration-300">
                    <CardHeader>
                      <div className="p-3 rounded-lg bg-gradient-primary w-fit mb-4">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-16"
        >
          <Card className="max-w-4xl mx-auto bg-gradient-primary text-white">
            <CardContent className="py-12 px-8">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl leading-relaxed mb-6">
                We believe that everyone deserves equal access to transportation. Our AI-powered platform 
                breaks down barriers by providing real-time, accurate information about accessible public 
                transport and ride options.
              </p>
              <p className="text-lg opacity-90">
                By leveraging cutting-edge AI technology and community-driven data, we're creating a world 
                where mobility challenges don't limit life opportunities.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of users who trust AccessiNavi for their daily transportation needs.
          </p>
          <Button asChild size="lg">
            <Link to="/chat">Start Your Journey</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default About;