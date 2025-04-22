"use client"

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { submitterImpactSummary } from "@/lib/data/mock-submitter"
import { Trash2, Users, TreePine, DollarSign } from "lucide-react"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export function ImpactMetricsSummary() {
  const { 
    totalProjects, 
    verifiedProjects, 
    pendingProjects, 
    rejectedProjects,
    totalFunding,
    targetFunding,
    impactMetrics,
    monthlyProgress
  } = submitterImpactSummary

  const projectStatusData = [
    { name: 'Verified', value: verifiedProjects },
    { name: 'Pending', value: pendingProjects },
    { name: 'Rejected', value: rejectedProjects }
  ]

  const impactData = [
    { 
      name: 'Waste Collected', 
      value: impactMetrics.wasteCollected,
      icon: <Trash2 className="h-4 w-4 text-muted-foreground" />,
      unit: 'kg'
    },
    { 
      name: 'People Impacted', 
      value: impactMetrics.peopleImpacted,
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      unit: 'people'
    },
    { 
      name: 'Trees Planted', 
      value: impactMetrics.treesPlanted,
      icon: <TreePine className="h-4 w-4 text-muted-foreground" />,
      unit: 'trees'
    }
  ]

  const fundingProgress = (totalFunding / targetFunding) * 100

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {impactData.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {item.value.toLocaleString()} {item.unit}
              </div>
              <p className="text-xs text-muted-foreground">
                Across {totalProjects} projects
              </p>
            </CardContent>
          </Card>
        ))}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Funding</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalFunding.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {fundingProgress.toFixed(1)}% of target funding
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="monthly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="monthly">Monthly Progress</TabsTrigger>
          <TabsTrigger value="projects">Project Status</TabsTrigger>
        </TabsList>
        <TabsContent value="monthly">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Impact Progress</CardTitle>
              <CardDescription>
                Track your impact progress over the past 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyProgress}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="funding" name="Funding ($)" fill="#8884d8" />
                    <Bar yAxisId="right" dataKey="impact" name="People Impacted" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Project Status Distribution</CardTitle>
              <CardDescription>
                Overview of your project verification status
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="h-[300px] w-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={projectStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {projectStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} projects`, 'Count']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
