import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Inquiry } from "@/types/inquiry";

interface InquiriesTabProps {
  inquiries: Inquiry[];
  setInquiries: React.Dispatch<React.SetStateAction<Inquiry[]>>;
}

export function InquiriesTab({ inquiries, setInquiries }: InquiriesTabProps) {
  const [replyingTo, setReplyingTo] = useState<Inquiry | null>(null);
  const [replyMessage, setReplyMessage] = useState("");

  const handleReplyToInquiry = (inquiry: Inquiry) => {
    setReplyingTo(inquiry);
    setReplyMessage(
      `Hi ${inquiry.name},\n\nThank you for your interest in our services. Regarding your inquiry about ${inquiry.projectType}...\n\nBest regards,\nThe DevProjects Team`
    );
  };

  const handleSendReply = async () => {
    if (!replyingTo) return;

    try {
      // In a real app, you would send an email here
      console.log(`Sending reply to ${replyingTo.email}:\n${replyMessage}`);

      // Update inquiry status to 'contacted' if it was 'new'
      if (replyingTo.status === "new") {
        await handleUpdateInquiryStatus(replyingTo.id, "contacted");
      }

      setReplyingTo(null);
      setReplyMessage("");
    } catch (error) {
      console.error("Failed to send reply:", error);
    }
  };

  const handleUpdateInquiryStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        const updatedInquiry = await response.json();
        setInquiries(
          inquiries.map((i) =>
            i.id === updatedInquiry.id ? updatedInquiry : i
          )
        );
      }
    } catch (error) {
      console.error("Failed to update inquiry status:", error);
    }
  };

  return (
    <>
      <Card className="dashboard-card bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Customer Inquiries</CardTitle>
          <CardDescription className="text-white/70">
            Manage customer inquiries and project requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <Card key={inquiry.id} className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-white font-semibold">
                          {inquiry.name}
                        </h3>
                        <Badge
                          className={
                            inquiry.status === "new"
                              ? "bg-green-600/20 text-green-300"
                              : inquiry.status === "contacted"
                              ? "bg-blue-600/20 text-blue-300"
                              : "bg-gray-600/20 text-gray-300"
                          }
                        >
                          {inquiry.status}
                        </Badge>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-white/70 mb-4">
                        <div>
                          <p>
                            <strong>Email:</strong> {inquiry.email}
                          </p>
                          <p>
                            <strong>Company:</strong> {inquiry.company}
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Project:</strong> {inquiry.projectType}
                          </p>
                          <p>
                            <strong>Budget:</strong> {inquiry.budget}
                          </p>
                        </div>
                      </div>
                      <p className="text-white/80 mb-4">{inquiry.message}</p>
                      <div className="flex justify-between items-center text-white/50 text-xs">
                        <span>
                          Received:{" "}
                          {new Date(inquiry.createdAt).toLocaleDateString()}
                        </span>
                        <span>
                          Updated:{" "}
                          {new Date(inquiry.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        onClick={() => handleReplyToInquiry(inquiry)}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        Reply
                      </Button>
                      <Select
                        value={inquiry.status}
                        onValueChange={(value) =>
                          handleUpdateInquiryStatus(inquiry.id, value)
                        }
                      >
                        <SelectTrigger className="w-32 h-8 bg-white/5 border-white/10 text-white text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="in-progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="quoted">Quoted</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reply Dialog */}
      {replyingTo && (
        <Dialog
          open={!!replyingTo}
          onOpenChange={(open) => !open && setReplyingTo(null)}
        >
          <DialogContent className="bg-slate-900 border-white/10 text-white">
            <DialogHeader>
              <DialogTitle>Reply to {replyingTo.name}</DialogTitle>
              <DialogDescription className="text-white/70">
                Compose your response to this inquiry
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-md">
                <p className="text-sm text-white/70 mb-1">
                  <strong>From:</strong> {replyingTo.name}
                </p>
                <p className="text-sm text-white/70 mb-1">
                  <strong>Email:</strong> {replyingTo.email}
                </p>
                <p className="text-sm text-white/70 mb-1">
                  <strong>Subject:</strong> {replyingTo.projectType} Inquiry
                </p>
                <p className="text-sm text-white/70 mb-3">
                  <strong>Message:</strong>
                </p>
                <p className="text-sm text-white/90 bg-white/10 p-3 rounded">
                  {replyingTo.message}
                </p>
              </div>

              <div className="space-y-2">
                <Textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  className="bg-white/5 border-white/10 min-h-[200px]"
                  placeholder="Type your reply here..."
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setReplyingTo(null)}
                  className="border-white/30 text-gray-600 hover:text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSendReply}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Send Reply
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
