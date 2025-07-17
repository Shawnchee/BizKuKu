'use client'

import { useState } from 'react'
import { Calendar, Download, Filter } from 'lucide-react'
import { Card } from '@/components/ui'
import { Button } from '@/components/ui'
import KPICard from '@/components/ui/KPICard'
import DataTable from '@/components/ui/DataTable'
import LineChart from '@/components/charts/LineChart'
import BarChart from '@/components/charts/BarChart'
import PieChart from '@/components/charts/PieChart'
import { 
  kpiData, 
  revenueData, 
  userGrowthData, 
  categoryData 
} from '@/lib/data'
import { formatCurrency, formatNumber } from '@/lib/utils'

// Sample table data
const tableData = [
  { id: 1, customer: 'Acme Corp', revenue: '$45,000', status: 'Active', lastOrder: '2024-01-15' },
  { id: 2, customer: 'TechStart Inc', revenue: '$32,500', status: 'Active', lastOrder: '2024-01-14' },
  { id: 3, customer: 'Growth Co', revenue: '$28,750', status: 'Pending', lastOrder: '2024-01-13' },
  { id: 4, customer: 'InnovateLab', revenue: '$52,300', status: 'Active', lastOrder: '2024-01-12' },
  { id: 5, customer: 'Future Systems', revenue: '$19,800', status: 'Inactive', lastOrder: '2024-01-10' },
]

const tableColumns = [
  { key: 'customer', label: 'Customer', sortable: true },
  { key: 'revenue', label: 'Revenue', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'lastOrder', label: 'Last Order', sortable: true },
]

export default function DashboardPage() {
  const [dateRange] = useState('Last 30 days')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="mt-2 text-gray-600">
                Monitor your business performance and key metrics
              </p>
            </div>
            <div className="mt-4 flex space-x-3 sm:mt-0">
              <Button variant="outline" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{dateRange}</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
              <Button className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Access to Financial Analytics */}
        <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-900">Financial Analytics</h3>
              <p className="text-sm text-blue-700">
                Get detailed insights into your business financial health and performance
              </p>
            </div>
            <a
              href="/dashboard/financial"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              View Financial Analytics
            </a>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi) => (
            <KPICard key={kpi.id} kpi={kpi} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <LineChart 
              data={revenueData} 
              dataKey="value" 
              title="Revenue Trend" 
              color="#3b82f6"
            />
          </Card>
          <Card className="p-6">
            <BarChart 
              data={userGrowthData} 
              dataKey="value" 
              title="User Growth" 
              color="#10b981"
            />
          </Card>
        </div>

        {/* Additional Charts */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="p-6">
            <PieChart 
              data={categoryData} 
              title="Traffic Sources" 
            />
          </Card>
          <Card className="p-6 lg:col-span-2">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Performance Metrics</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">98.5%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">2.3s</div>
                <div className="text-sm text-gray-600">Avg Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">156</div>
                <div className="text-sm text-gray-600">API Calls/min</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">99.2%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Data Table */}
        <div className="mb-8">
          <DataTable 
            data={tableData} 
            columns={tableColumns} 
            title="Recent Customers" 
          />
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {formatNumber(45231)}
            </div>
            <div className="text-sm text-gray-600">Total Users</div>
            <div className="text-xs text-green-600 mt-1">+12.5% from last month</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {formatCurrency(2400000)}
            </div>
            <div className="text-sm text-gray-600">Monthly Revenue</div>
            <div className="text-xs text-green-600 mt-1">+8.2% from last month</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">3.24%</div>
            <div className="text-sm text-gray-600">Conversion Rate</div>
            <div className="text-xs text-red-600 mt-1">-2.1% from last month</div>
          </Card>
        </div>
      </div>
    </div>
  )
}
