import React from "react";
import WebsiteMonitor from "./website-monitor.jsx";
import UptimeChecker from "./uptime-checker.jsx";
import SSLChecker from "./ssl-checker.jsx";
import DomainAgeChecker from "./domain-age-checker.jsx";
import IPLookupTool from "./ip-lookup-tool.jsx";
import BrokenLinkChecker from "./broken-link-checker.jsx";

const PlaceholderComponent = ({ name }) => (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">{name}</h1>
    <p className="text-gray-600 text-lg mb-8">This tool is under development</p>
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-12">
      <div className="text-3xl font-bold text-gray-400">Coming Soon</div>
    </div>
  </div>
);

export const webmasterTools = [
  {
    id: "website-monitor",
    name: "Website Monitor",
    component: WebsiteMonitor,
    description: "Monitor website status and receive alerts for downtime",
    icon: "Monitor",
    tags: ["webmaster", "monitoring", "uptime"],
    color: "blue",
    popular: true,
  },
  {
    id: "uptime-checker",
    name: "Uptime Checker",
    component: UptimeChecker,
    description:
      "Check website uptime and response time from multiple locations",
    icon: "Activity",
    tags: ["webmaster", "performance", "reliability"],
    color: "blue",
    popular: true,
  },
  {
    id: "ssl-checker",
    name: "SSL Checker",
    component: SSLChecker,
    description: "Verify SSL certificate validity and security details",
    icon: "Shield",
    tags: ["webmaster", "security", "ssl", "https"],
    color: "blue",
  },
  {
    id: "domain-age-checker",
    name: "Domain Age Checker",
    component: DomainAgeChecker,
    description: "Check domain registration date and age information",
    icon: "Calendar",
    tags: ["webmaster", "domain", "whois", "analysis"],
    color: "blue",
  },
  {
    id: "ip-lookup-tool",
    name: "IP Lookup Tool",
    component: IPLookupTool,
    description: "Get detailed information about any IP address",
    icon: "Globe",
    tags: ["webmaster", "network", "ip", "geolocation"],
    color: "blue",
  },
  {
    id: "broken-link-checker",
    name: "Broken Link Checker",
    component: BrokenLinkChecker,
    description: "Find and fix broken links on your website",
    icon: "Unlink",
    tags: ["webmaster", "links", "seo", "maintenance"],
    color: "blue",
  },
];

export {
  WebsiteMonitor,
  UptimeChecker,
  SSLChecker,
  DomainAgeChecker,
  IPLookupTool,
  BrokenLinkChecker,
};
