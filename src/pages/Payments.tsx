import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Shield, CreditCard, Lock, CheckCircle, AlertCircle, Calendar, FileText, IndianRupee } from "lucide-react";

const Payments = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const consultationDetails = {
    lawyer: "Adv. Priya Sharma",
    specialty: "Family Law",
    type: "Video Consultation",
    duration: "60 minutes",
    date: "Jan 20, 2024",
    time: "3:00 PM - 4:00 PM",
    fee: 3000,
    platformFee: 150,
    gst: 567,
    total: 3717
  };

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: CreditCard, popular: true },
    { id: "upi", name: "UPI", icon: IndianRupee, popular: true },
    { id: "wallet", name: "Digital Wallet", icon: Shield, popular: false },
    { id: "netbanking", name: "Net Banking", icon: Shield, popular: false }
  ];

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Handle success/failure
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8 max-w-4xl">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">Secure Payment</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Complete your consultation booking with our secure payment gateway. Your data is encrypted and protected.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="space-y-6">
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Payment Details
                </CardTitle>
                <CardDescription>
                  Choose your preferred payment method and complete the transaction
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Methods */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Payment Method</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {paymentMethods.map((method) => {
                      const IconComponent = method.icon;
                      return (
                        <div
                          key={method.id}
                          className={`relative p-4 rounded-lg border cursor-pointer transition-all ${
                            paymentMethod === method.id
                              ? "border-primary bg-primary/5"
                              : "border-input hover:border-primary/50"
                          }`}
                          onClick={() => setPaymentMethod(method.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <IconComponent className="w-5 h-5" />
                            <div className="flex-1">
                              <div className="text-sm font-medium">{method.name}</div>
                            </div>
                          </div>
                          {method.popular && (
                            <Badge className="absolute -top-2 -right-2 text-xs">Popular</Badge>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Card Details */}
                {paymentMethod === "card" && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input id="cardName" placeholder="John Doe" />
                    </div>
                  </div>
                )}

                {/* UPI Details */}
                {paymentMethod === "upi" && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="space-y-2">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input id="upiId" placeholder="yourname@paytm" />
                    </div>
                  </div>
                )}

                {/* Security Features */}
                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Shield className="w-4 h-4 mr-2" />
                    256-bit SSL encryption
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Lock className="w-4 h-4 mr-2" />
                    PCI DSS compliant
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Refund protection
                  </div>
                </div>

                <Button 
                  onClick={handlePayment} 
                  disabled={isProcessing}
                  className="w-full"
                  size="lg"
                >
                  {isProcessing ? (
                    <>Processing Payment...</>
                  ) : (
                    <>Pay ₹{consultationDetails.total}</>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Consultation Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lawyer</span>
                    <span className="font-medium">{consultationDetails.lawyer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Specialty</span>
                    <Badge variant="secondary">{consultationDetails.specialty}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span>{consultationDetails.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span>{consultationDetails.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Schedule</span>
                    <div className="text-right">
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {consultationDetails.date}
                      </div>
                      <div className="text-sm text-muted-foreground">{consultationDetails.time}</div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Consultation Fee</span>
                    <span>₹{consultationDetails.fee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee</span>
                    <span>₹{consultationDetails.platformFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span>₹{consultationDetails.gst}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Amount</span>
                  <span className="text-primary">₹{consultationDetails.total}</span>
                </div>
              </CardContent>
            </Card>

            {/* Refund Policy */}
            <Card className="animate-fade-in" style={{ animationDelay: "200ms" }}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Refund Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• Full refund if cancelled 24 hours before consultation</p>
                <p>• 50% refund if cancelled 2 hours before consultation</p>
                <p>• No refund for no-shows or last-minute cancellations</p>
                <p>• Technical issues will be resolved with full refund</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Shield className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Secure Payments</h3>
              <p className="text-sm text-muted-foreground">Bank-grade security for all transactions</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Guaranteed Service</h3>
              <p className="text-sm text-muted-foreground">Quality consultation or money back</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Lock className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Data Protection</h3>
              <p className="text-sm text-muted-foreground">Your information is encrypted and safe</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payments;