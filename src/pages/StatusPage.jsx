import {
  CheckCircle,
  AlertCircle,
  Clock,
  Server,
  Wifi,
  Database,
} from "lucide-react";

const StatusPage = () => {
  // Mock status data
  const services = [
    {
      name: "All Tools",
      status: "operational",
      description: "All tools are functioning normally",
      uptime: "99.9%",
      lastIncident: "7 days ago",
    },
    {
      name: "PDF Tools",
      status: "operational",
      description: "PDF processing services running normally",
      uptime: "99.8%",
      lastIncident: "14 days ago",
    },
    {
      name: "Image Tools",
      status: "operational",
      description: "Image processing and conversion working",
      uptime: "99.7%",
      lastIncident: "21 days ago",
    },
    {
      name: "Developer Tools",
      status: "operational",
      description: "Code and text tools available",
      uptime: "99.9%",
      lastIncident: "30 days ago",
    },
    {
      name: "API Services",
      status: "degraded",
      description: "Some API endpoints experiencing higher latency",
      uptime: "98.5%",
      lastIncident: "2 hours ago",
    },
    {
      name: "File Processing",
      status: "operational",
      description: "File upload and processing stable",
      uptime: "99.6%",
      lastIncident: "5 days ago",
    },
  ];

  // Recent incidents
  const incidents = [
    {
      date: "2 hours ago",
      service: "API Services",
      status: "resolved",
      description: "Increased latency due to high traffic, now resolved",
    },
    {
      date: "5 days ago",
      service: "File Processing",
      status: "resolved",
      description: "Temporary slowdown during maintenance window",
    },
    {
      date: "14 days ago",
      service: "PDF Tools",
      status: "resolved",
      description: "PDF conversion service maintenance",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "operational":
        return "text-green-600 bg-green-50 border-green-200";
      case "degraded":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "partial":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "down":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="w-5 h-5" />;
      case "degraded":
        return <AlertCircle className="w-5 h-5" />;
      case "partial":
        return <Clock className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
          <Server className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Service Status
        </h1>
        <p className="text-xl text-gray-600">
          Real-time status of Smart Tools services
        </p>
      </div>

      {/* Overall Status */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 mb-12 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          All Systems Operational
        </h2>
        <p className="text-xl text-gray-600 mb-6">
          Smart Tools is running smoothly
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-gray-900">99.9%</div>
            <div className="text-gray-600">Uptime (30 days)</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-gray-900">0</div>
            <div className="text-gray-600">Active Incidents</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-gray-900">99.9%</div>
            <div className="text-gray-600">Response Rate</div>
          </div>
        </div>
      </div>

      {/* Services Status */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Services Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.name}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {service.description}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    service.status
                  )}`}
                >
                  {getStatusIcon(service.status)}
                  <span className="ml-2 capitalize">{service.status}</span>
                </span>
              </div>
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Uptime (30d):</span>
                  <span className="font-medium">{service.uptime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Last Incident:</span>
                  <span className="font-medium">{service.lastIncident}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Incidents */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Recent Incidents
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {incidents.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {incidents.map((incident, index) => (
                <div key={index} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {incident.service}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {incident.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-gray-900">
                        {incident.date}
                      </span>
                      <div className="mt-1">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                            incident.status === "resolved"
                              ? "bg-green-100 text-green-800"
                              : incident.status === "investigating"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {incident.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <p className="text-gray-600">No recent incidents to report</p>
            </div>
          )}
        </div>
      </div>

      {/* System Information */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center mb-4">
            <Wifi className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="font-semibold text-gray-900">Response Time</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Average:</span>
              <span className="font-medium">150ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">95th Percentile:</span>
              <span className="font-medium">250ms</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center mb-4">
            <Database className="w-6 h-6 text-purple-600 mr-3" />
            <h3 className="font-semibold text-gray-900">System Load</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">CPU Usage:</span>
              <span className="font-medium">45%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Memory Usage:</span>
              <span className="font-medium">68%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center mb-4">
            <Server className="w-6 h-6 text-green-600 mr-3" />
            <h3 className="font-semibold text-gray-900">Monitoring</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Last Check:</span>
              <span className="font-medium">Just now</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Next Check:</span>
              <span className="font-medium">1 minute</span>
            </div>
          </div>
        </div>
      </div>

      {/* Status Legend */}
      <div className="mt-12 bg-gray-50 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Status Legend</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <span className="text-gray-700">
              Operational - All systems normal
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
            <span className="text-gray-700">Degraded - Performance issues</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
            <span className="text-gray-700">
              Partial Outage - Limited functionality
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
            <span className="text-gray-700">Down - Service unavailable</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;
