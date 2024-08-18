'use client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComplaint } from '../actions/complaint';
import { useRef, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

export default function Page() {
  const complaintRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [similarComplaints, setSimilarComplaints] = useState<any[]>([]); // Adjusted to any[] to accommodate complex objects

  const { mutate: handleCreateComplaint, isPending, isError, error } = useMutation({
    mutationFn: async () => {
      if (!complaintRef || !complaintRef.current || !complaintRef.current.value) {
        throw new Error('Complaint cannot be empty');
      }
      const complaintText = complaintRef.current.value;

      // Fetch similar complaints
      const response = await fetch(
        'https://backend-white-glitter-696.fly.dev/api/v1/questions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question: complaintText }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch similar complaints');
      }

      const { result } = await response.json();
      setSimilarComplaints(result.matches);

      // Submit complaint
      await createComplaint(complaintText);
      complaintRef.current.value = ''; // Clear input after submission
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['complaints'] });
      toast({
        title: 'Complaint submitted successfully',
        variant: 'default',
      });
    },
  });

  return (
    <section className="w-full max-w-3xl mx-auto h-full pt-36 flex flex-col gap-4 relative pb-8">
      <Card className="w-full max-w-2xl mx-auto bg-gray-50 border-none shadow-md h-auto">
        <CardHeader>
          <CardTitle>Submit a Complaint</CardTitle>
          <CardDescription>Please fill out the form below to submit your complaint.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="complaint" className="mb-1">
                Complaint Details
              </Label>
              <Textarea ref={complaintRef} placeholder="Describe your complaint" className="border-none h-48" />
              {isError && <p className="text-red-500 text-sm">{error?.message}</p>}
            </div>
            <Button type="submit" disabled={isPending} onClick={() => handleCreateComplaint()}>
              {isPending ? 'Submitting...' : 'Submit Complaint'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {similarComplaints.length > 0 && (
        <>
          <h3 className="w-full max-w-2xl mx-auto text-lg font-semibold pt-4">Similar Complaints:</h3>
          {similarComplaints.map((complaint, index) => (
            <Card key={index} className="w-full max-w-2xl mx-auto bg-gray-50 border-none shadow-md h-auto">
              <CardHeader>
                <CardTitle>{extractIssue(complaint.metadata.text)}</CardTitle>
                <CardDescription>{extractSubIssue(complaint.metadata.text)}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{extractComplaintWhatHappened(complaint.metadata.text)}</p>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </section>
  );
}

function extractData(jsonString: string, key: string) {
  try {
    const obj = JSON.parse(jsonString);
    return obj[key] || `No ${key} found`;
  } catch (error) {
    console.error(`Error parsing JSON for key ${key}:`, error);
    return 'Invalid data';
  }
}

const extractIssue = (jsonString: string) => extractData(jsonString, 'issue');
const extractSubIssue = (jsonString: string) => extractData(jsonString, 'sub_issue');
const extractComplaintWhatHappened = (jsonString: string) => extractData(jsonString, 'complaint_what_happened');
