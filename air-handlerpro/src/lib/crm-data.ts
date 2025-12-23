// ============================================================================
// CRM DATA & CALCULATIONS - Simple One-File Solution
// ============================================================================

// DUMMY DATA - Replace with your real data source later
const DUMMY_DATA = {
  companies: [
    { id: "1", name: "Acme Corp", status: "active" },
    { id: "2", name: "Vertex Solutions", status: "active" },
  ],

  contacts: [
    { id: "1", name: "John Smith", type: "customer", status: "active" },
    { id: "2", name: "Sarah Chen", type: "prospect", status: "active" },
  ],

  serviceSites: [
    { id: "1", name: "Site 1" },
    { id: "2", name: "Site 2" },
    { id: "3", name: "Site 3" },
    { id: "4", name: "Site 4" },
    { id: "5", name: "Site 5" },
    { id: "6", name: "Site 6" },
  ],

  deals: [
    {
      id: "1",
      name: "Deal #1",
      amount: 75000,
      stage: "Qualified",
      status: "open",
    },
    {
      id: "2",
      name: "Deal #2",
      amount: 148500,
      stage: "Negotiation",
      status: "open",
    },
    { id: "3", name: "Deal #3", amount: 92000, stage: "Lead", status: "open" },
    {
      id: "4",
      name: "Deal #4",
      amount: 210000,
      stage: "Proposal",
      status: "open",
    },
    {
      id: "5",
      name: "Deal #5",
      amount: 50000,
      stage: "Closed Won",
      status: "closed_won",
    },
    {
      id: "6",
      name: "Deal #6",
      amount: 29500,
      stage: "Closed Won",
      status: "closed_won",
    },
    {
      id: "7",
      name: "Deal #7",
      amount: 15000,
      stage: "Closed Won",
      status: "closed_won",
    },
    {
      id: "8",
      name: "Test Estimate",
      amount: 4680,
      stage: "Proposal",
      status: "open",
    },
    {
      id: "9",
      name: "Lost Deal",
      amount: 125000,
      stage: "Closed Lost",
      status: "closed_lost",
    },
  ],

  activities: [
    { id: "1", type: "task", due_date: "2025-01-15", completed: false },
    { id: "2", type: "task", due_date: "2025-01-10", completed: false },
    { id: "3", type: "call", created_at: "2024-12-01" },
    { id: "4", type: "email", created_at: "2024-12-10" },
    { id: "5", type: "meeting", created_at: "2024-12-15" },
    { id: "6", type: "note", created_at: "2024-12-12" },
  ],
};

// FORMULAS - Calculate all stats
export function calculateCRMStats() {
  const { companies, contacts, serviceSites, deals, activities } = DUMMY_DATA;

  // Top stats
  const totalCompanies = companies.filter((c) => c.status === "active").length;
  const totalServiceSites = serviceSites.length;
  const activeCustomers = contacts.filter(
    (c) => c.type === "customer" && c.status === "active"
  ).length;
  const prospects = contacts.filter(
    (c) => c.type === "prospect" && c.status === "active"
  ).length;

  // Pipeline calculations
  const openDeals = deals.filter((d) => d.status === "open");
  const wonDeals = deals.filter((d) => d.status === "closed_won");
  const totalPipeline = openDeals.reduce((sum, d) => sum + d.amount, 0);
  const wonDealsValue = wonDeals.reduce((sum, d) => sum + d.amount, 0);
  const conversionRate =
    deals.length > 0 ? (wonDeals.length / deals.length) * 100 : 0;
  const avgDealSize = wonDeals.length > 0 ? wonDealsValue / wonDeals.length : 0;

  // Activity calculations
  const now = new Date();
  const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const tasks = activities.filter((a) => a.type === "task");
  const overdueTasks = tasks.filter(
    (a) => !a.completed && a.due_date && new Date(a.due_date) < now
  ).length;
  const upcomingTasks = tasks.filter((a) => {
    if (!a.due_date || a.completed) return false;
    const dueDate = new Date(a.due_date);
    return dueDate >= now && dueDate <= sevenDaysFromNow;
  }).length;

  const callsThisMonth = activities.filter(
    (a) =>
      a.type === "call" &&
      a.created_at &&
      new Date(a.created_at) >= startOfMonth
  ).length;

  const emailsThisMonth = activities.filter(
    (a) =>
      a.type === "email" &&
      a.created_at &&
      new Date(a.created_at) >= startOfMonth
  ).length;

  // Format currency
  const formatCurrency = (amount: number) =>
    `$${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

  // Top deals
  const topDeals = [...deals]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 4)
    .map((d) => ({
      name: d.name,
      stage: d.stage,
      amount: d.amount,
      progress:
        d.stage === "Closed Won"
          ? 100
          : d.stage === "Negotiation"
          ? 75
          : d.stage === "Proposal"
          ? 50
          : 30,
    }));

  // Pipeline by stage
  const pipelineByStage = [
    {
      label: "Proposal",
      value: deals.filter((d) => d.stage === "Proposal").length,
    },
    {
      label: "Negotiation",
      value: deals.filter((d) => d.stage === "Negotiation").length,
    },
    {
      label: "Closed Won",
      value: deals.filter((d) => d.stage === "Closed Won").length,
    },
    {
      label: "Closed Lost",
      value: deals.filter((d) => d.stage === "Closed Lost").length,
    },
  ];

  // Activities by type
  const activitiesByType = [
    {
      label: "Note",
      value: activities.filter((a) => a.type === "note").length,
      color: "#3B82F6",
    },
    {
      label: "Meeting",
      value: activities.filter((a) => a.type === "meeting").length,
      color: "#10B981",
    },
    {
      label: "Meeting",
      value: activities.filter((a) => a.type === "task").length,
      color: "#00000",
    },
  ].filter((a) => a.value > 0);

  return {
    // Top stats
    totalCompanies,
    totalServiceSites,
    activeCustomers,
    prospects,

    // Pipeline
    totalPipeline: formatCurrency(totalPipeline),
    openDealsCount: openDeals.length,
    wonDealsValue: formatCurrency(wonDealsValue),
    wonDealsCount: wonDeals.length,
    conversionRate: `${conversionRate.toFixed(1)}%`,
    avgDealSize: formatCurrency(avgDealSize),

    // Activities
    overdueTasks,
    upcomingTasks,
    callsThisMonth,
    emailsThisMonth,

    // Charts
    topDeals,
    pipelineByStage,
    activitiesByType,
  };
}
