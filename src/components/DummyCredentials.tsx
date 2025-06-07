"use client";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DummyCredentials() {
  const { toast } = useToast();

  const email = "testquipweb@gmail.com";
  const password = "testquip@1234";

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({ title: `${label} copied` });
    });
  };

  return (
    <div className="w-full max-w-md mx-auto text-xs text-gray-600">
      <p className="text-[12px] font-medium mb-2">Dummy Credentials:</p>

      <div className="flex items-center justify-between gap-3 bg-gray-100 p-2 rounded">
        
        <div className="flex items-center gap-1">
          📧 <span className="text-[11px]">{email}</span>
          <Button
            size="icon"
            variant="ghost"
            className="h-5 w-5"
            onClick={() => copyToClipboard(email, "Email")}
          >
            <Copy size={12} />
          </Button>
        </div>

       
        <div className="flex items-center gap-1">
          🔒 <span className="text-[11px]">{password}</span>
          <Button
            size="icon"
            variant="ghost"
            className="h-5 w-5"
            onClick={() => copyToClipboard(password, "Password")}
          >
            <Copy size={12} />
          </Button>
        </div>
      </div>
    </div>
  );
}
