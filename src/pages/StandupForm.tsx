
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import NavBar from "@/components/NavBar";
import BlurredBackground from "@/components/BlurredBackground";
import FormField from "@/components/FormField";
import ScreenshotUpload from "@/components/ScreenshotUpload";
import { Loader2 } from "lucide-react";

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  project: z.string().min(1, "Please select a project"),
  completedYesterday: z.string().min(5, "Please provide details about yesterday's work"),
  workingOnToday: z.string().min(5, "Please provide details about today's planned work"),
  blockers: z.string().optional(),
  additionalNotes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const projects = [
  { id: "project-a", name: "Project Alpha" },
  { id: "project-b", name: "Project Beta" },
  { id: "project-c", name: "Project Gamma" },
  { id: "project-d", name: "Project Delta" },
];

const StandupForm = () => {
  const navigate = useNavigate();
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [screenshotError, setScreenshotError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      project: "",
      completedYesterday: "",
      workingOnToday: "",
      blockers: "",
      additionalNotes: "",
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Validate screenshot
    if (!screenshot) {
      setScreenshotError("Please upload a screenshot of your work");
      setIsSubmitting(false);
      return;
    }
    
    // Clear any previous screenshot errors
    setScreenshotError(null);

    try {
      // In a real application, this would upload to Supabase
      // and send an email to the team lead
      console.log("Form data:", data);
      console.log("Screenshot:", screenshot);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Success!",
        description: "Your standup update has been submitted.",
      });
      
      // Navigate to success page
      navigate("/success");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "There was a problem submitting your update. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleScreenshotChange = (file: File | null) => {
    setScreenshot(file);
    if (file) {
      setScreenshotError(null);
    }
  };

  return (
    <BlurredBackground>
      <NavBar />
      
      <main className="container mx-auto px-4 pt-28 pb-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Daily Standup Update</h1>
            <p className="text-muted-foreground">
              Share your progress, plans, and blockers with your team
            </p>
          </div>

          <div className="glass-card p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  id="name"
                  label="Your Name"
                  error={errors.name?.message}
                  required
                >
                  <Input
                    id="name"
                    placeholder="John Doe"
                    {...register("name")}
                    className={errors.name ? "border-destructive" : ""}
                  />
                </FormField>
                
                <FormField
                  id="email"
                  label="Your Email"
                  error={errors.email?.message}
                  required
                >
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register("email")}
                    className={errors.email ? "border-destructive" : ""}
                  />
                </FormField>
              </div>
              
              <FormField
                id="project"
                label="Project"
                error={errors.project?.message}
                required
              >
                <Select
                  onValueChange={(value) => setValue("project", value)}
                  defaultValue={watch("project")}
                >
                  <SelectTrigger className={errors.project ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
              
              <FormField
                id="completedYesterday"
                label="What did you complete yesterday?"
                error={errors.completedYesterday?.message}
                required
              >
                <Textarea
                  id="completedYesterday"
                  placeholder="Describe what you accomplished yesterday..."
                  {...register("completedYesterday")}
                  className={errors.completedYesterday ? "border-destructive" : ""}
                  rows={3}
                />
              </FormField>
              
              <FormField
                id="workingOnToday"
                label="What are you working on today?"
                error={errors.workingOnToday?.message}
                required
              >
                <Textarea
                  id="workingOnToday"
                  placeholder="Describe what you plan to work on today..."
                  {...register("workingOnToday")}
                  className={errors.workingOnToday ? "border-destructive" : ""}
                  rows={3}
                />
              </FormField>
              
              <FormField
                id="blockers"
                label="Any blockers or challenges?"
                error={errors.blockers?.message}
              >
                <Textarea
                  id="blockers"
                  placeholder="Describe any blockers or challenges you're facing (if any)..."
                  {...register("blockers")}
                  className={errors.blockers ? "border-destructive" : ""}
                  rows={2}
                />
              </FormField>
              
              <ScreenshotUpload
                id="screenshot"
                label="Screenshot of Your Work"
                description="Upload a screenshot showing your progress"
                value={screenshot}
                onChange={handleScreenshotChange}
                error={screenshotError || undefined}
                required
              />
              
              <FormField
                id="additionalNotes"
                label="Additional Notes"
                error={errors.additionalNotes?.message}
              >
                <Textarea
                  id="additionalNotes"
                  placeholder="Any additional information you'd like to share..."
                  {...register("additionalNotes")}
                  className={errors.additionalNotes ? "border-destructive" : ""}
                  rows={2}
                />
              </FormField>
              
              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full md:w-auto rounded-xl"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Standup Update"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </BlurredBackground>
  );
};

export default StandupForm;
