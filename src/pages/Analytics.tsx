
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockPortfolioAnalytics, mockCaseStudyAnalytics } from '@/data/mockData';
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Analytics = () => {
  // Format portfolio data for charts
  const portfolioViewData = mockPortfolioAnalytics.visitsOverTime.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    views: item.value
  }));

  // Format case study data for charts
  const caseStudyData = mockCaseStudyAnalytics.map(cs => ({
    id: cs.id,
    title: cs.caseStudyId === 'cs1' ? 'Mobile Banking Redesign' : 'Wellness App Design',
    views: cs.views,
    visitors: cs.uniqueVisitors,
    avgTime: cs.averageTimeOnPage,
    clicks: cs.clicks,
    viewsOverTime: cs.viewsOverTime.map(item => ({
      date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      views: item.value
    })),
    clicksOverTime: cs.clicksOverTime.map(item => ({
      date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      clicks: item.value
    }))
  }));

  const compareData = mockCaseStudyAnalytics.map(cs => ({
    name: cs.caseStudyId === 'cs1' ? 'Banking App' : 'Wellness App',
    views: cs.views,
    visitors: cs.uniqueVisitors,
    engagement: Math.round(cs.averageTimeOnPage / mockPortfolioAnalytics.averageTimeOnSite * 100)
  }));

  return (
    <DashboardLayout title="Analytics">
      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
          <TabsTrigger value="compare">Compare</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockPortfolioAnalytics.totalVisits}</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockPortfolioAnalytics.uniqueVisitors}</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg. Time on Site</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.floor(mockPortfolioAnalytics.averageTimeOnSite / 60)}m {mockPortfolioAnalytics.averageTimeOnSite % 60}s
                </div>
                <p className="text-xs text-muted-foreground">Per session</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Portfolio Views Over Time</CardTitle>
              <CardDescription>Daily traffic for the past 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={portfolioViewData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Pages</CardTitle>
              <CardDescription>Most viewed content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockPortfolioAnalytics.popularPages.map((page, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">{page.title}</p>
                        <p className="text-sm text-muted-foreground">{page.path}</p>
                      </div>
                      <div className="text-sm text-right">
                        <p>{page.views} views</p>
                        <p className="text-xs text-muted-foreground">{page.uniqueVisitors} unique</p>
                      </div>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(page.views / mockPortfolioAnalytics.totalVisits) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="case-studies" className="space-y-6">
          {caseStudyData.map((cs, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle>{cs.title}</CardTitle>
                <CardDescription>
                  {cs.views} views • {cs.visitors} unique visitors • {Math.floor(cs.avgTime / 60)}m {cs.avgTime % 60}s avg. time
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Views Over Time</h4>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={cs.viewsOverTime}>
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Link Clicks</h4>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={cs.clicksOverTime}>
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="clicks" stroke="#10b981" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Conversion Rate</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Clicks to Views Ratio</span>
                    <span className="text-sm font-medium">{((cs.clicks / cs.views) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${(cs.clicks / cs.views) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="compare" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Case Study Comparison</CardTitle>
              <CardDescription>Compare performance across case studies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={compareData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="views" fill="#3b82f6" name="Total Views" />
                    <Bar dataKey="visitors" fill="#10b981" name="Unique Visitors" />
                    <Bar dataKey="engagement" fill="#f59e0b" name="Engagement Score (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Engagement Metrics</CardTitle>
              <CardDescription>How visitors interact with each case study</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {caseStudyData.map((cs, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{cs.title}</p>
                      <div className="text-sm">
                        <span className="font-medium">{((cs.clicks / cs.views) * 100).toFixed(1)}%</span> click-through rate
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Average Time</p>
                        <div className="flex items-center">
                          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden mr-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${(cs.avgTime / 300) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium">{Math.floor(cs.avgTime / 60)}m {cs.avgTime % 60}s</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Visitor Retention</p>
                        <div className="flex items-center">
                          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden mr-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${(cs.visitors / cs.views) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium">{((cs.visitors / cs.views) * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Analytics;
