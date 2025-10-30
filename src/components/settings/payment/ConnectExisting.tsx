import { useState } from "react";
import { ArrowLeft, ExternalLink, AlertTriangle, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
interface ConnectExistingProps {
  onBack: () => void;
  onConnect: (email: string) => void;
}
const ConnectExisting = ({
  onBack,
  onConnect
}: ConnectExistingProps) => {
  const [activeTab, setActiveTab] = useState<"recommended" | "advanced">("recommended");
  const [publishableKey, setPublishableKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const [accessId, setAccessId] = useState("");
  const [errors, setErrors] = useState<{
    publishable?: string;
    secret?: string;
    accessId?: string;
  }>({});
  const handleOAuthConnect = () => {
    // In a real app, this would redirect to Stripe OAuth
    setTimeout(() => {
      onConnect("existing@example.com");
    }, 1500);
  };
  const handleAccessIdConnect = () => {
    if (!accessId.trim()) {
      setErrors(prev => ({ ...prev, accessId: "Account ID is required" }));
      return;
    }
    
    // Simulate validation
    setTimeout(() => {
      onConnect(`accessid-${accessId}@example.com`);
    }, 1000);
  };

  const handleAdvancedConnect = () => {
    const newErrors: {
      publishable?: string;
      secret?: string;
    } = {};
    if (!publishableKey) {
      newErrors.publishable = "Publishable key is required";
    }
    if (!secretKey) {
      newErrors.secret = "Secret key is required";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate validation
    setTimeout(() => {
      onConnect("advanced@example.com");
    }, 1000);
  };
  return <div>
      {/* Segmented Control */}
      

      {/* Recommended Tab */}
      {activeTab === "recommended" && <div className="max-w-2xl rounded-xl border border-border bg-card p-8">


          <Button onClick={handleOAuthConnect} className="w-full gap-2" size="lg">
            Connect with Stripe
            <ExternalLink className="h-4 w-4" />
          </Button>


          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <div className="space-y-3">
            <Input 
              value={accessId}
              onChange={(e) => {
                setAccessId(e.target.value);
                setErrors(prev => ({ ...prev, accessId: undefined }));
              }}
              placeholder="Please enter your Account ID"
              className={errors.accessId ? "border-destructive" : ""}
            />
            {errors.accessId && (
              <p className="text-sm text-destructive">{errors.accessId}</p>
            )}
            <Button onClick={handleAccessIdConnect} className="w-full" size="lg" disabled={!accessId.trim()}>
              Connect With Account ID
            </Button>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            By connecting, you agree to Stripe's Terms of Service and Privacy Policy
          </p>
        </div>}

      {/* Advanced Tab */}
      {activeTab === "advanced" && <div className="max-w-2xl">
          <div className="mb-6 flex gap-3 rounded-lg border border-warning/50 bg-warning/10 p-4">
            <AlertTriangle className="h-5 w-5 shrink-0 text-warning" />
            <div className="text-sm">
              <p className="font-medium text-warning-foreground">
                Warning: This method is for advanced users
              </p>
              <p className="mt-1 text-warning-foreground/80">
                Make sure to keep your API keys secure. Never share your secret key
                or commit it to version control.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-8">
            <h3 className="mb-6 text-lg font-semibold">
              Connect with API Keys
            </h3>

            <div className="space-y-4">
              <div>
                <Label htmlFor="publishable">Publishable Key</Label>
                <Input id="publishable" value={publishableKey} onChange={e => {
              setPublishableKey(e.target.value);
              setErrors(prev => ({
                ...prev,
                publishable: undefined
              }));
            }} placeholder="pk_test_..." className={errors.publishable ? "border-destructive" : ""} />
                {errors.publishable && <p className="mt-1 text-sm text-destructive">
                    {errors.publishable}
                  </p>}
              </div>

              <div>
                <Label htmlFor="secret">Secret Key</Label>
                <div className="relative">
                  <Input id="secret" type={showSecret ? "text" : "password"} value={secretKey} onChange={e => {
                setSecretKey(e.target.value);
                setErrors(prev => ({
                  ...prev,
                  secret: undefined
                }));
              }} placeholder="sk_test_..." className={`pr-10 ${errors.secret ? "border-destructive" : ""}`} />
                  <button type="button" onClick={() => setShowSecret(!showSecret)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.secret && <p className="mt-1 text-sm text-destructive">{errors.secret}</p>}
              </div>

              <Button onClick={handleAdvancedConnect} className="w-full" size="lg">
                Save & Connect
              </Button>
            </div>
          </div>
        </div>}
    </div>;
};
export default ConnectExisting;