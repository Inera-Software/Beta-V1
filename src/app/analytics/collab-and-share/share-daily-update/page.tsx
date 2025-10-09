
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ChevronLeft, BellRing, Video, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const latestUpdates: { id: string; title: string; summary: string }[] = [];

export default function ShareDailyUpdatePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [phoneNumbers, setPhoneNumbers] = useState("");
  const [emailIds, setEmailIds] = useState("");
  const [activeAlertId, setActiveAlertId] = useState<string | null>(null);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [selectedAlerts, setSelectedAlerts] = useState<string[]>([]);

  const handleAlertClick = (alertId: string) => {
    if (isMultiSelectMode) {
      setSelectedAlerts(prev => 
        prev.includes(alertId) 
        ? prev.filter(id => id !== alertId)
        : [...prev, alertId]
      );
    } else {
      setActiveAlertId(prevId => prevId === alertId ? null : alertId);
    }
  }

  const toggleMultiSelectMode = () => {
    setIsMultiSelectMode(!isMultiSelectMode);
    setActiveAlertId(null); // Reset single selection when toggling mode
    setSelectedAlerts([]); // Clear selections when toggling mode
  }

  const handleSubmit = (e: React.FormEvent, currentUpdateId?: string) => {
    e.preventDefault();
    
    // In multi-select mode, selectedAlerts is used. In single-select, activeAlertId is used.
    const sendingAlerts = isMultiSelectMode ? selectedAlerts : (currentUpdateId ? [currentUpdateId] : []);
    
    if (sendingAlerts.length === 0) {
        toast({
            variant: "destructive",
            title: "No alert selected",
            description: "Please select at least one alert to share.",
        });
        return;
    }
    if (!phoneNumbers.trim() && !emailIds.trim()) {
        toast({
            variant: "destructive",
            title: "No recipients",
            description: "Please enter at least one phone number or email.",
        });
        return;
    }
    
    let description;
    if (sendingAlerts.length > 1) {
        description = `Your ${sendingAlerts.length} selected updates have been sent.`;
    } else {
        const title = latestUpdates.find(u => u.id === sendingAlerts[0])?.title;
        description = `Your update on "${title}" has been sent.`;
    }

    toast({
        title: "Notification Sent",
        description: description,
    })

    // Reset fields after sending
    setPhoneNumbers("");
    setEmailIds("");
    if (isMultiSelectMode) {
      setSelectedAlerts([]);
    } else {
      setActiveAlertId(null);
    }
  }

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="mb-8 flex justify-between items-center">
          <Button onClick={() => router.back()} variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
           <Button onClick={toggleMultiSelectMode} variant={isMultiSelectMode ? "primary" : "secondary"} disabled={latestUpdates.length === 0}>
                {isMultiSelectMode ? "Cancel" : "Select Multiple"}
          </Button>
        </div>

        <div className="text-center mb-8 space-y-4">
            {latestUpdates.map(update => {
                const isSelected = isMultiSelectMode ? selectedAlerts.includes(update.id) : activeAlertId === update.id;
                return (
                 <div key={update.id} className="space-y-4">
                    <div 
                        className="cursor-pointer relative"
                        onClick={() => handleAlertClick(update.id)}
                    >
                        <div className={cn(
                            "text-xl font-bold tracking-tight inline-flex items-center gap-4 border-2 rounded-lg px-6 py-3 bg-card/60 backdrop-blur-sm shadow-lg transition-all w-full",
                            isSelected ? "border-primary text-primary" : "border-input text-foreground"
                            )}>
                            <BellRing className={cn("h-6 w-6", !isMultiSelectMode && isSelected && "animate-pulse")} />
                            <span className="font-normal text-muted-foreground">ALERT:</span> {update.title}
                        </div>
                        {isMultiSelectMode && isSelected && (
                            <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1">
                                <CheckCircle2 className="h-5 w-5" />
                            </div>
                        )}
                    </div>
                    
                    {!isMultiSelectMode && (
                        <form onSubmit={(e) => handleSubmit(e, update.id)}>
                            <Card className={cn(
                                "bg-card/60 backdrop-blur-sm transition-all duration-500 ease-in-out overflow-hidden",
                                activeAlertId === update.id ? "max-h-[1000px] opacity-100 p-6" : "max-h-0 opacity-0 !p-0 !m-0 border-0"
                                )}
                            >
                                {activeAlertId === update.id && (
                                    <>
                                        <CardContent className="space-y-6 p-0 animate-in fade-in-50 duration-500">
                                            <div className="space-y-4">
                                                <Label htmlFor={`summary-${update.id}`} className="text-xl font-semibold">MAIN SUMMARY BASED UPDATE</Label>
                                                <Card className="bg-background/50">
                                                    <CardHeader>
                                                        <CardTitle>{update.title}</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <p className="text-muted-foreground">{update.summary}</p>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                            <div className="space-y-2">
                                                <h2 className="text-xl font-semibold border-b pb-2">ANALYTICS</h2>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor={`phone-single-${update.id}`}>ADD PHONE NUMBERS</Label>
                                                    <Input 
                                                        id={`phone-single-${update.id}`} 
                                                        type="text"
                                                        value={phoneNumbers}
                                                        onChange={e => setPhoneNumbers(e.target.value)}
                                                        placeholder="e.g., +919876543210" 
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor={`email-single-${update.id}`}>ADD EMAIL ID</Label>
                                                    <Input 
                                                        id={`email-single-${update.id}`}
                                                        type="email"
                                                        value={emailIds}
                                                        onChange={e => setEmailIds(e.target.value)}
                                                        placeholder="e.g., user1@example.com" 
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="justify-center pt-8 p-0">
                                            <div className="flex gap-4 w-full max-w-sm">
                                                <Button type="submit" className="flex-1">
                                                    SEND NOTIFICATION
                                                </Button>
                                                <Button type="button" variant="secondary" className="flex-1">
                                                    <Video className="mr-2 h-5 w-5" />
                                                    Generate Video
                                                </Button>
                                            </div>
                                        </CardFooter>
                                    </>
                                )}
                            </Card>
                        </form>
                    )}
                </div>
                )
            })}
             {latestUpdates.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-lg text-muted-foreground">No daily updates available at the moment.</p>
                </div>
            )}
        </div>
        
        {isMultiSelectMode && (
            <div className="animate-in fade-in duration-300">
                <form onSubmit={handleSubmit}>
                    <Card className="bg-card/60 backdrop-blur-sm p-6">
                        <CardContent className="space-y-6 p-0">
                             <h2 className="text-xl font-semibold border-b pb-2 text-center">SEND {selectedAlerts.length} SELECTED ALERTS</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="phone-multi">ADD PHONE NUMBERS</Label>
                                    <Input 
                                        id="phone-multi" 
                                        type="text"
                                        value={phoneNumbers}
                                        onChange={e => setPhoneNumbers(e.target.value)}
                                        placeholder="e.g., +919876543210, ..." 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email-multi">ADD EMAIL ID</Label>
                                    <Input 
                                        id="email-multi" 
                                        type="email"
                                        value={emailIds}
                                        onChange={e => setEmailIds(e.target.value)}
                                        placeholder="e.g., user1@example.com, ..." 
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="justify-center pt-8 p-0">
                            <Button type="submit" className="w-full max-w-sm">
                                SEND NOTIFICATION
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        )}
      </div>
    </div>
  );
}
