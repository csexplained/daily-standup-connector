
import { useState } from "react";
import { format } from "date-fns";
import BlurredBackground from "@/components/BlurredBackground";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Calendar, Search, Eye, Download, AlertTriangle } from "lucide-react";

// Mock data for demonstration
const mockSubmissions = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    project: "Project Alpha",
    date: new Date(2023, 10, 1, 9, 30),
    completedYesterday: "Finished the user authentication flow and fixed 3 critical bugs in the checkout process.",
    workingOnToday: "Starting work on the new dashboard analytics features and code review for PR #123.",
    blockers: "Waiting on API documentation from the backend team.",
    screenshot: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Taylor Smith",
    email: "taylor@example.com",
    project: "Project Beta",
    date: new Date(2023, 10, 1, 10, 15),
    completedYesterday: "Implemented responsive design for the landing page and created new component library items.",
    workingOnToday: "Working on A/B test implementation for the new onboarding flow.",
    blockers: "",
    screenshot: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Jamie Williams",
    email: "jamie@example.com",
    project: "Project Gamma",
    date: new Date(2023, 10, 1, 8, 45),
    completedYesterday: "Created unit tests for payment processing module and fixed integration test failures.",
    workingOnToday: "Debugging performance issues on the product search page.",
    blockers: "Need access to the production logs to identify the bottleneck.",
    screenshot: "/placeholder.svg",
  },
  {
    id: "4",
    name: "Morgan Lee",
    email: "morgan@example.com",
    project: "Project Delta",
    date: new Date(2023, 10, 2, 9, 0),
    completedYesterday: "Designed new email templates and implemented the newsletter subscription feature.",
    workingOnToday: "Creating social media sharing functionality and fixing accessibility issues.",
    blockers: "",
    screenshot: "/placeholder.svg",
  },
  {
    id: "5",
    name: "Casey Brown",
    email: "casey@example.com",
    project: "Project Alpha",
    date: new Date(2023, 10, 2, 10, 30),
    completedYesterday: "Optimized database queries and reduced API response time by 40%.",
    workingOnToday: "Implementing caching layer and working on CDN integration.",
    blockers: "Need approval for the AWS infrastructure changes.",
    screenshot: "/placeholder.svg",
  },
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<typeof mockSubmissions[0] | null>(null);

  // Filter submissions based on search term
  const filteredSubmissions = mockSubmissions.filter(submission => 
    submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewSubmission = (submission: typeof mockSubmissions[0]) => {
    setSelectedSubmission(submission);
  };

  const closeDialog = () => {
    setSelectedSubmission(null);
  };

  return (
    <BlurredBackground>
      <NavBar />
      
      <main className="container mx-auto px-4 pt-28 pb-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Daily Standup Submissions</h1>
          <p className="text-muted-foreground">
            View and manage your team's daily standup updates
          </p>
        </div>

        <div className="glass-card p-6 md:p-8 mb-8">
          {/* Search and filter controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or project..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Filter by Date
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </div>
          
          {/* Submissions table */}
          {filteredSubmissions.length === 0 ? (
            <div className="text-center py-12">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No submissions found</h3>
              <p className="text-muted-foreground">
                No standup submissions match your search criteria.
              </p>
            </div>
          ) : (
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableCaption>A list of your team's recent standup submissions.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Date Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium">{submission.name}</TableCell>
                      <TableCell>{submission.project}</TableCell>
                      <TableCell>{format(submission.date, "MMM dd, yyyy - h:mm a")}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 gap-1"
                          onClick={() => handleViewSubmission(submission)}
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
        
        {/* Admin message */}
        <div className="glass-card p-6 text-center">
          <p className="text-muted-foreground">
            This is a demo of the dashboard. In a real implementation, this would connect to Supabase to display actual submission data.
          </p>
        </div>
      </main>
      
      {/* Submission detail dialog */}
      <Dialog open={!!selectedSubmission} onOpenChange={closeDialog}>
        <DialogContent className="max-w-3xl">
          {selectedSubmission && (
            <>
              <DialogHeader>
                <DialogTitle>Standup Update Details</DialogTitle>
                <DialogDescription>
                  Submitted by {selectedSubmission.name} on {format(selectedSubmission.date, "MMMM dd, yyyy 'at' h:mm a")}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Project</h3>
                  <p className="text-foreground mb-4">{selectedSubmission.project}</p>
                  
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Completed Yesterday</h3>
                  <p className="text-foreground mb-4">{selectedSubmission.completedYesterday}</p>
                  
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Working on Today</h3>
                  <p className="text-foreground mb-4">{selectedSubmission.workingOnToday}</p>
                  
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Blockers</h3>
                  <p className="text-foreground mb-4">
                    {selectedSubmission.blockers || "No blockers reported"}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Screenshot</h3>
                  <div className="rounded-lg overflow-hidden border mb-4">
                    <img 
                      src={selectedSubmission.screenshot} 
                      alt="Work screenshot" 
                      className="w-full h-auto"
                    />
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Contact Information</h3>
                    <p className="text-foreground">{selectedSubmission.name}</p>
                    <p className="text-foreground">{selectedSubmission.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-2">
                <Button variant="outline" onClick={closeDialog}>Close</Button>
                <Button>Send Feedback</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </BlurredBackground>
  );
};

export default Dashboard;
