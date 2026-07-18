import Link from "next/link";
import { BarChart3, CreditCard, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { paths } from "@/config/paths";
import { GetStartedButton } from "@/domain/features/auth";

export const HeroBanner = () => {
    return (
        <section className="grow relative overflow-hidden border-b bg-gradient-to-b from-background to-muted/30">
            <div className="container mx-auto px-4 py-4 mt-[10%] sm:py-28">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div className="space-y-8">
                        <div className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm font-medium">
                            💰 Take control of your money
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl">
                                Track every dollar
                                <br />
                                <span className="text-primary">Reach your financial goals</span>
                            </h1>
                            <p className="max-w-xl text-lg text-muted-foreground">
                                Monitor your spending, create budgets, scan receipts, and understand exactly where your
                                money goes—all in one place
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <GetStartedButton />
                            <Button variant="outline" size="lg">
                                <Link href={paths.demo.path}>View Demo</Link>
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-6 pt-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Receipt className="h-4 w-4 text-primary" />
                                Receipt scanning
                            </div>
                            <div className="flex items-center gap-2">
                                <CreditCard className="h-4 w-4 text-primary" />
                                Multiple accounts
                            </div>
                            <div className="flex items-center gap-2">
                                <BarChart3 className="h-4 w-4 text-primary" />
                                Smart analytics
                            </div>
                        </div>
                    </div>
                    <Card className="w-[448px] max-w-full lg:justify-self-center relative max-w-md space-y-6 rounded-3xl p-8 shadow-2xl overflow-visible">
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">This Month</p>
                            <h2 className="text-4xl font-bold">$2,438.50</h2>
                            <p className="text-sm text-green-600">+12% remaining in your budget</p>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="mb-2 flex justify-between text-sm">
                                    <span>Food</span>
                                    <span>$420 / $600</span>
                                </div>

                                <div className="h-2 rounded-full bg-muted">
                                    <div className="h-2 w-[70%] rounded-full bg-primary" />
                                </div>
                            </div>
                            <div>
                                <div className="mb-2 flex justify-between text-sm">
                                    <span>Transport</span>
                                    <span>$85 / $150</span>
                                </div>

                                <div className="h-2 rounded-full bg-muted">
                                    <div className="h-2 w-[57%] rounded-full bg-primary" />
                                </div>
                            </div>
                            <div>
                                <div className="mb-2 flex justify-between text-sm">
                                    <span>Entertainment</span>
                                    <span>$110 / $200</span>
                                </div>

                                <div className="h-2 rounded-full bg-muted">
                                    <div className="h-2 w-[55%] rounded-full bg-primary" />
                                </div>
                            </div>
                        </div>
                        <div className="rounded-xl bg-muted p-4">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Remaining Budget</span>
                                <span className="font-semibold text-green-600">$915.50</span>
                            </div>
                        </div>
                        <div className="absolute right-[calc(100%-15px)] top-10 w-max rounded-xl border bg-background p-4 shadow-lg hidden lg:block">
                            <p className="text-xs text-muted-foreground">Saved this month</p>
                            <p className="text-xl font-bold text-green-600">+$385</p>
                        </div>
                        <div className="absolute left-[calc(100%-15px)] bottom-8 w-max rounded-xl border bg-background p-4 shadow-lg hidden lg:block">
                            <p className="text-xs text-muted-foreground">Transactions</p>
                            <p className="text-xl font-bold">124</p>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
};
