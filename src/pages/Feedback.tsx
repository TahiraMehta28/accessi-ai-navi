import { useState } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Star, 
  MessageSquare, 
  Send,
  CheckCircle,
  ThumbsUp,
  ThumbsDown,
  Meh
} from "lucide-react";

const Feedback = () => {
  const [location, setLocation] = useState("");
  const [transportType, setTransportType] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [experienceType, setExperienceType] = useState("");
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!location || !transportType || !rating || !experienceType) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to submit feedback.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from("feedback")
        .insert({
          user_id: user.id,
          location,
          transport_type: transportType,
          rating,
          experience_type: experienceType,
          comments: comments.trim() || null,
        });

      if (error) {
        throw error;
      }

      setSubmitted(true);
      toast({
        title: "Feedback submitted",
        description: "Thank you for helping improve accessibility!",
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getRatingIcon = (ratingValue: number) => {
    if (ratingValue <= 2) return <ThumbsDown className="h-5 w-5" />;
    if (ratingValue <= 3) return <Meh className="h-5 w-5" />;
    return <ThumbsUp className="h-5 w-5" />;
  };

  const getRatingColor = (ratingValue: number) => {
    if (ratingValue <= 2) return "text-destructive";
    if (ratingValue <= 3) return "text-muted-foreground";
    return "text-success";
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-soft">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <Card>
              <CardContent className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
                <p className="text-muted-foreground mb-6">
                  Your feedback has been submitted successfully. It helps us improve accessibility for everyone.
                </p>
                <div className="flex gap-3">
                  <Button 
                    onClick={() => setSubmitted(false)} 
                    variant="outline" 
                    className="flex-1"
                  >
                    Submit Another
                  </Button>
                  <Button 
                    onClick={() => window.location.href = "/dashboard"} 
                    className="flex-1"
                  >
                    Back to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Rate Your Experience</h1>
            <p className="text-lg text-muted-foreground">
              Help us improve accessibility by sharing your transport experience
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Share Your Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Central Station, Main St Bus Stop"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>

                {/* Transport Type */}
                <div className="space-y-2">
                  <Label>Transport Type *</Label>
                  <Select value={transportType} onValueChange={setTransportType} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select transport type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bus">Bus</SelectItem>
                      <SelectItem value="metro">Metro/Rail</SelectItem>
                      <SelectItem value="taxi">Taxi/Rideshare</SelectItem>
                      <SelectItem value="tram">Tram</SelectItem>
                      <SelectItem value="ferry">Ferry</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Rating */}
                <div className="space-y-3">
                  <Label>Overall Rating *</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`p-1 rounded transition-colors ${
                            rating && star <= rating
                              ? "text-yellow-500"
                              : "text-muted-foreground hover:text-yellow-400"
                          }`}
                        >
                          <Star className="h-6 w-6 fill-current" />
                        </button>
                      ))}
                    </div>
                    {rating && (
                      <div className={`flex items-center gap-2 ${getRatingColor(rating)}`}>
                        {getRatingIcon(rating)}
                        <span className="text-sm font-medium">
                          {rating === 1 && "Poor"}
                          {rating === 2 && "Fair"}
                          {rating === 3 && "Good"}
                          {rating === 4 && "Very Good"}
                          {rating === 5 && "Excellent"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Experience Type */}
                <div className="space-y-3">
                  <Label>What was your experience about? *</Label>
                  <RadioGroup value={experienceType} onValueChange={setExperienceType}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="accessibility_features" id="accessibility" />
                      <Label htmlFor="accessibility">Accessibility Features</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="staff_assistance" id="staff" />
                      <Label htmlFor="staff">Staff Assistance</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="vehicle_condition" id="vehicle" />
                      <Label htmlFor="vehicle">Vehicle/Station Condition</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="booking_process" id="booking" />
                      <Label htmlFor="booking">Booking/Scheduling Process</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="general_service" id="general" />
                      <Label htmlFor="general">General Service Quality</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Comments */}
                <div className="space-y-2">
                  <Label htmlFor="comments">Additional Comments</Label>
                  <Textarea
                    id="comments"
                    placeholder="Tell us more about your experience... (optional)"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full flex items-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Your feedback is anonymous and helps improve accessibility for all users.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;