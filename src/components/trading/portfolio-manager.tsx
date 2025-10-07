'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wallet, Plus, Settings } from 'lucide-react';

export function PortfolioManager() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>Portfolio Manager</span>
        </CardTitle>
        <CardDescription>Create and manage your investment portfolios</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Portfolios */}
        <div className="space-y-4">
          <h4 className="font-semibold">Your Portfolios</h4>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center space-x-3">
                <Wallet className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold">Main Portfolio</div>
                  <div className="text-sm text-muted-foreground">$125,000 • 12 positions</div>
                </div>
              </div>
              <Button variant="outline" size="sm">View</Button>
            </div>
          </div>
        </div>

        {/* Create New Portfolio */}
        <div className="space-y-4">
          <h4 className="font-semibold">Create New Portfolio</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="portfolio-name">Portfolio Name</Label>
              <Input id="portfolio-name" placeholder="e.g., Growth Portfolio" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="initial-balance">Initial Balance</Label>
              <Input id="initial-balance" type="number" placeholder="100000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD</SelectItem>
                  <SelectItem value="eur">EUR</SelectItem>
                  <SelectItem value="gbp">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="strategy">Strategy</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select strategy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="growth">Growth</SelectItem>
                  <SelectItem value="value">Value</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="balanced">Balanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Create Portfolio
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2">
          <Button variant="outline" className="flex-1">
            Import Portfolio
          </Button>
          <Button variant="outline" className="flex-1">
            Export Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

