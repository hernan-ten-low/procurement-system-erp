import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reports.css';

const Reports = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2025-01-31'
  });
  const [reportData, setReportData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReportData();
  }, [dateRange]);

  const fetchReportData = () => {
    setLoading(true);
    // Mock data - in real app this would be API calls
    setTimeout(() => {
      setReportData({
        overview: {
          totalOrders: 245,
          totalSpent: 3250000,
          activeSuppliers: 45,
          avgOrderValue: 13265,
          totalRFQs: 89,
          completedOrders: 198,
          pendingOrders: 47,
          monthlyGrowth: 12.5
        },
        purchasing: {
          monthlySpending: [
            { month: 'ינואר 2024', amount: 180000, orders: 15 },
            { month: 'פברואר 2024', amount: 220000, orders: 18 },
            { month: 'מרץ 2024', amount: 195000, orders: 16 },
            { month: 'אפריל 2024', amount: 275000, orders: 22 },
            { month: 'מאי 2024', amount: 310000, orders: 25 },
            { month: 'יוני 2024', amount: 280000, orders: 21 },
            { month: 'יולי 2024', amount: 325000, orders: 28 },
            { month: 'אוגוסט 2024', amount: 290000, orders: 24 },
            { month: 'ספטמבר 2024', amount: 350000, orders: 30 },
            { month: 'אוקטובר 2024', amount: 380000, orders: 32 },
            { month: 'נובמבר 2024', amount: 295000, orders: 26 },
            { month: 'דצמבר 2024', amount: 340000, orders: 28 }
          ],
          topCategories: [
            { category: 'מחשבים', amount: 850000, percentage: 26.2 },
            { category: 'ציוד משרדי', amount: 650000, percentage: 20.0 },
            { category: 'אביזרים', amount: 480000, percentage: 14.8 },
            { category: 'רשתות', amount: 420000, percentage: 12.9 },
            { category: 'תוכנה', amount: 380000, percentage: 11.7 },
            { category: 'אחר', amount: 470000, percentage: 14.4 }
          ],
          savingsAnalysis: {
            totalPotentialSavings: 125000,
            actualSavings: 89000,
            savingsRate: 2.7,
            bestNegotiations: [
              { rfqId: 'RFQ-2024-156', originalPrice: 45000, finalPrice: 39500, savings: 5500 },
              { rfqId: 'RFQ-2024-198', originalPrice: 32000, finalPrice: 28800, savings: 3200 },
              { rfqId: 'RFQ-2024-223', originalPrice: 67000, finalPrice: 61200, savings: 5800 }
            ]
          }
        },
        suppliers: {
          topPerformers: [
            { 
              name: 'טכנולוגיות מתקדמות בע"מ', 
              rating: 4.8, 
              orders: 34, 
              totalAmount: 450000,
              onTimeDelivery: 94,
              qualityScore: 96
            },
            { 
              name: 'סמארט טק פתרונות', 
              rating: 4.6, 
              orders: 28, 
              totalAmount: 380000,
              onTimeDelivery: 91,
              qualityScore: 94
            },
            { 
              name: 'רכיבים ומערכות בע"מ', 
              rating: 4.4, 
              orders: 22, 
              totalAmount: 295000,
              onTimeDelivery: 88,
              qualityScore: 92
            },
            { 
              name: 'דיגיטל סולושנס', 
              rating: 4.2, 
              orders: 19, 
              totalAmount: 215000,
              onTimeDelivery: 85,
              qualityScore: 89
            }
          ],
          performanceMetrics: {
            avgDeliveryTime: 12.5,
            onTimeDeliveryRate: 89.2,
            qualityRating: 4.5,
            responsivenesScore: 87
          },
          riskAnalysis: [
            { supplier: 'חברת ABC', risk: 'גבוה', reason: 'עיכובים חוזרים במשלוחים' },
            { supplier: 'ספק XYZ', risk: 'בינוני', reason: 'בעיות איכות מדי פעם' },
            { supplier: 'קבלן DEF', risk: 'נמוך', reason: 'ביצועים יציבים' }
          ]
        },
        financial: {
          budgetAnalysis: {
            totalBudget: 4000000,
            usedBudget: 3250000,
            remainingBudget: 750000,
            utilizationRate: 81.25
          },
          departmentSpending: [
            { department: 'IT', budget: 1200000, spent: 980000, percentage: 81.7 },
            { department: 'משאבי אנוש', budget: 800000, spent: 650000, percentage: 81.3 },
            { department: 'שיווק', budget: 600000, spent: 480000, percentage: 80.0 },
            { department: 'מכירות', budget: 500000, spent: 420000, percentage: 84.0 },
            { department: 'פיתוח', budget: 900000, spent: 720000, percentage: 80.0 }
          ],
          paymentTermsAnalysis: {
            immediate: { count: 45, amount: 450000, percentage: 13.8 },
            net30: { count: 89, amount: 1450000, percentage: 44.6 },
            net60: { count: 67, amount: 890000, percentage: 27.4 },
            net90: { count: 44, amount: 460000, percentage: 14.2 }
          }
        }
      });
      setLoading(false);
    }, 1000);
  };

  const handleDateRangeChange = (field, value) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleExportReport = (reportType) => {
    const data = reportData[reportType];
    const csvContent = generateReportCSV(reportType, data);
    downloadCSV(csvContent, `${reportType}-report-${Date.now()}.csv`);
  };

  const generateReportCSV = (reportType, data) => {
    let csvContent = '';
    
    switch (reportType) {
      case 'purchasing':
        csvContent = 'חודש,סכום,מספר הזמנות\n';
        data.monthlySpending.forEach(item => {
          csvContent += `${item.month},${item.amount},${item.orders}\n`;
        });
        break;
      case 'suppliers':
        csvContent = 'שם ספק,דירוג,הזמנות,סכום כולל,אספקה בזמן,ציון איכות\n';
        data.topPerformers.forEach(supplier => {
          csvContent += `${supplier.name},${supplier.rating},${supplier.orders},${supplier.totalAmount},${supplier.onTimeDelivery}%,${supplier.qualityScore}%\n`;
        });
        break;
      default:
        csvContent = 'דוח,ערך\n';
        Object.entries(data).forEach(([key, value]) => {
          csvContent += `${key},${value}\n`;
        });
    }
    
    return csvContent;
  };

  const downloadCSV = (content, filename) => {
    const blob = new Blob(['\ufeff' + content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderOverviewTab = () => (
    <div className="overview-tab">
      <div className="overview-stats">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon bg-primary">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <div className="stat-content">
              <h4>{reportData.overview?.totalOrders}</h4>
              <p>סך הזמנות</p>
              <div className="stat-change positive">
                <i className="fas fa-arrow-up"></i>
                +{reportData.overview?.monthlyGrowth}%
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon bg-success">
              <i className="fas fa-shekel-sign"></i>
            </div>
            <div className="stat-content">
              <h4>₪{reportData.overview?.totalSpent?.toLocaleString()}</h4>
              <p>סך הוצאות</p>
              <div className="stat-change positive">
                <i className="fas fa-arrow-up"></i>
                +8.3%
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon bg-info">
              <i className="fas fa-building"></i>
            </div>
            <div className="stat-content">
              <h4>{reportData.overview?.activeSuppliers}</h4>
              <p>ספקים פעילים</p>
              <div className="stat-change neutral">
                <i className="fas fa-minus"></i>
                +2
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon bg-warning">
              <i className="fas fa-calculator"></i>
            </div>
            <div className="stat-content">
              <h4>₪{reportData.overview?.avgOrderValue?.toLocaleString()}</h4>
              <p>ממוצע הזמנה</p>
              <div className="stat-change positive">
                <i className="fas fa-arrow-up"></i>
                +5.7%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overview-charts">
        <div className="chart-row">
          <div className="chart-card">
            <h5>התפלגות הזמנות לפי סטטוס</h5>
            <div className="donut-chart">
              <div className="donut-visual">
                <div className="donut-center">
                  <div className="donut-total">{reportData.overview?.totalOrders}</div>
                  <div className="donut-label">סך הזמנות</div>
                </div>
                <svg width="180" height="180" className="donut-svg">
                  <circle
                    cx="90"
                    cy="90"
                    r="70"
                    fill="none"
                    stroke="#e9ecef"
                    strokeWidth="20"
                  />
                  <circle
                    cx="90"
                    cy="90"
                    r="70"
                    fill="none"
                    stroke="#28a745"
                    strokeWidth="20"
                    strokeDasharray={`${(reportData.overview?.completedOrders / reportData.overview?.totalOrders) * 440} 440`}
                    strokeDashoffset="0"
                    transform="rotate(-90 90 90)"
                    className="donut-segment completed"
                  />
                  <circle
                    cx="90"
                    cy="90"
                    r="70"
                    fill="none"
                    stroke="#ffc107"
                    strokeWidth="20"
                    strokeDasharray={`${(reportData.overview?.pendingOrders / reportData.overview?.totalOrders) * 440} 440`}
                    strokeDashoffset={`-${(reportData.overview?.completedOrders / reportData.overview?.totalOrders) * 440}`}
                    transform="rotate(-90 90 90)"
                    className="donut-segment pending"
                  />
                </svg>
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-color bg-success"></div>
                  <span>הושלמו ({reportData.overview?.completedOrders})</span>
                  <span className="legend-percentage">{Math.round((reportData.overview?.completedOrders / reportData.overview?.totalOrders) * 100)}%</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color bg-warning"></div>
                  <span>בהמתנה ({reportData.overview?.pendingOrders})</span>
                  <span className="legend-percentage">{Math.round((reportData.overview?.pendingOrders / reportData.overview?.totalOrders) * 100)}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="chart-card">
            <h5>מגמת RFQ חודשית</h5>
            <div className="line-chart">
              <div className="line-chart-visual">
                <svg width="100%" height="200" className="line-svg">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="0.1"/>
                    </linearGradient>
                  </defs>
                  
                  {/* Grid lines */}
                  <g className="grid-lines">
                    {[0, 1, 2, 3, 4].map(i => (
                      <line
                        key={i}
                        x1="40"
                        y1={40 + (i * 30)}
                        x2="360"
                        y2={40 + (i * 30)}
                        stroke="#e9ecef"
                        strokeWidth="1"
                        strokeDasharray="2,2"
                      />
                    ))}
                  </g>
                  
                  {/* Area under curve */}
                  <path
                    d="M40,160 L80,140 L120,130 L160,120 L200,100 L240,90 L280,85 L320,80 L360,75 L360,180 L40,180 Z"
                    fill="url(#lineGradient)"
                  />
                  
                  {/* Line */}
                  <path
                    d="M40,160 L80,140 L120,130 L160,120 L200,100 L240,90 L280,85 L320,80 L360,75"
                    fill="none"
                    stroke="var(--primary-color)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* Data points */}
                  {[
                    {x: 40, y: 160, value: 5},
                    {x: 80, y: 140, value: 8},
                    {x: 120, y: 130, value: 11},
                    {x: 160, y: 120, value: 9},
                    {x: 200, y: 100, value: 15},
                    {x: 240, y: 90, value: 18},
                    {x: 280, y: 85, value: 12},
                    {x: 320, y: 80, value: 16},
                    {x: 360, y: 75, value: 22}
                  ].map((point, index) => (
                    <g key={index}>
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="4"
                        fill="var(--primary-color)"
                        stroke="white"
                        strokeWidth="2"
                      />
                      <text
                        x={point.x}
                        y={point.y - 10}
                        textAnchor="middle"
                        fontSize="10"
                        fill="var(--secondary-color)"
                        fontWeight="600"
                      >
                        {point.value}
                      </text>
                    </g>
                  ))}
                  
                  {/* Y-axis labels */}
                  <g className="y-labels">
                    <text x="30" y="45" textAnchor="end" fontSize="10" fill="#6c757d">30</text>
                    <text x="30" y="75" textAnchor="end" fontSize="10" fill="#6c757d">25</text>
                    <text x="30" y="105" textAnchor="end" fontSize="10" fill="#6c757d">20</text>
                    <text x="30" y="135" textAnchor="end" fontSize="10" fill="#6c757d">15</text>
                    <text x="30" y="165" textAnchor="end" fontSize="10" fill="#6c757d">10</text>
                  </g>
                  
                  {/* X-axis labels */}
                  <g className="x-labels">
                    <text x="40" y="195" textAnchor="middle" fontSize="9" fill="#6c757d">ינו</text>
                    <text x="80" y="195" textAnchor="middle" fontSize="9" fill="#6c757d">פבר</text>
                    <text x="120" y="195" textAnchor="middle" fontSize="9" fill="#6c757d">מרץ</text>
                    <text x="160" y="195" textAnchor="middle" fontSize="9" fill="#6c757d">אפר</text>
                    <text x="200" y="195" textAnchor="middle" fontSize="9" fill="#6c757d">מאי</text>
                    <text x="240" y="195" textAnchor="middle" fontSize="9" fill="#6c757d">יונ</text>
                    <text x="280" y="195" textAnchor="middle" fontSize="9" fill="#6c757d">יול</text>
                    <text x="320" y="195" textAnchor="middle" fontSize="9" fill="#6c757d">אוג</text>
                    <text x="360" y="195" textAnchor="middle" fontSize="9" fill="#6c757d">ספט</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="quick-insights">
        <div className="insights-grid">
          <div className="insight-card">
            <div className="insight-icon bg-success">
              <i className="fas fa-trophy"></i>
            </div>
            <div className="insight-content">
              <h6>ספק מצטיין</h6>
              <p>טכנולוגיות מתקדמות - 4.8/5</p>
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-icon bg-info">
              <i className="fas fa-piggy-bank"></i>
            </div>
            <div className="insight-content">
              <h6>חיסכון חודשי</h6>
              <p>₪89,000 (2.7% מההזמנות)</p>
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-icon bg-warning">
              <i className="fas fa-clock"></i>
            </div>
            <div className="insight-content">
              <h6>זמן אספקה ממוצע</h6>
              <p>12.5 ימים (-1.2 מהחודש הקודם)</p>
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-icon bg-primary">
              <i className="fas fa-percentage"></i>
            </div>
            <div className="insight-content">
              <h6>אחוז ביצוע תקציב</h6>
              <p>81.25% מהתקציב השנתי</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPurchasingTab = () => (
    <div className="purchasing-tab">
      <div className="purchasing-header">
        <h4>דוח רכש ומכרזים</h4>
        <button 
          className="btn btn-outline-primary"
          onClick={() => handleExportReport('purchasing')}
        >
          <i className="fas fa-download me-2"></i>
          ייצא דוח
        </button>
      </div>

      <div className="spending-analysis">
        <div className="analysis-card">
          <h5>הוצאות חודשיות</h5>
          <div className="spending-chart">
            <div className="chart-container">
              {reportData.purchasing?.monthlySpending?.map((item, index) => (
                <div key={index} className="bar-item">
                  <div 
                    className="bar" 
                    style={{
                      height: `${Math.max((item.amount / 400000) * 200, 20)}px`,
                      '--bar-index': index,
                      animationDelay: `${index * 0.1}s`
                    }}
                  ></div>
                  <div className="bar-label">{item.month.split(' ')[0]}</div>
                  <div className="bar-value">₪{(item.amount / 1000).toFixed(0)}K</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="categories-breakdown">
          <h5>התפלגות לפי קטגוריות</h5>
          <div className="categories-list">
            {reportData.purchasing?.topCategories?.map((category, index) => (
              <div key={index} className="category-item">
                <div className="category-info">
                  <span className="category-name">{category.category}</span>
                  <span className="category-amount">₪{category.amount.toLocaleString()}</span>
                </div>
                <div className="category-progress">
                  <div 
                    className="progress-bar"
                    style={{width: `${category.percentage}%`}}
                  ></div>
                </div>
                <div className="category-percentage">{category.percentage}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="savings-section">
        <h5>ניתוח חיסכון</h5>
        <div className="savings-stats">
          <div className="savings-overview">
            <div className="savings-metric">
              <h6>חיסכון פוטנציאלי</h6>
              <span className="amount">₪{reportData.purchasing?.savingsAnalysis?.totalPotentialSavings?.toLocaleString()}</span>
            </div>
            <div className="savings-metric">
              <h6>חיסכון בפועל</h6>
              <span className="amount success">₪{reportData.purchasing?.savingsAnalysis?.actualSavings?.toLocaleString()}</span>
            </div>
            <div className="savings-metric">
              <h6>אחוז חיסכון</h6>
              <span className="percentage">{reportData.purchasing?.savingsAnalysis?.savingsRate}%</span>
            </div>
          </div>

          <div className="best-negotiations">
            <h6>המשא ומתן הטוב ביותר</h6>
            <div className="negotiations-list">
              {reportData.purchasing?.savingsAnalysis?.bestNegotiations?.map((nego, index) => (
                <div key={index} className="negotiation-item">
                  <div className="rfq-id">{nego.rfqId}</div>
                  <div className="price-comparison">
                    <span className="original-price">₪{nego.originalPrice.toLocaleString()}</span>
                    <i className="fas fa-arrow-left mx-2"></i>
                    <span className="final-price">₪{nego.finalPrice.toLocaleString()}</span>
                  </div>
                  <div className="savings-amount">חיסכון: ₪{nego.savings.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSuppliersTab = () => (
    <div className="suppliers-tab">
      <div className="suppliers-header">
        <h4>דוח ביצועי ספקים</h4>
        <button 
          className="btn btn-outline-primary"
          onClick={() => handleExportReport('suppliers')}
        >
          <i className="fas fa-download me-2"></i>
          ייצא דוח
        </button>
      </div>

      <div className="performance-metrics">
        <div className="metrics-grid">
          <div className="metric-card">
            <h6>זמן אספקה ממוצע</h6>
            <div className="metric-value">{reportData.suppliers?.performanceMetrics?.avgDeliveryTime} ימים</div>
            <div className="metric-trend positive">
              <i className="fas fa-arrow-down"></i>
              -0.8 ימים
            </div>
          </div>

          <div className="metric-card">
            <h6>אספקה בזמן</h6>
            <div className="metric-value">{reportData.suppliers?.performanceMetrics?.onTimeDeliveryRate}%</div>
            <div className="metric-trend positive">
              <i className="fas fa-arrow-up"></i>
              +2.1%
            </div>
          </div>

          <div className="metric-card">
            <h6>דירוג איכות</h6>
            <div className="metric-value">{reportData.suppliers?.performanceMetrics?.qualityRating}/5</div>
            <div className="metric-trend positive">
              <i className="fas fa-arrow-up"></i>
              +0.2
            </div>
          </div>

          <div className="metric-card">
            <h6>רמת היענות</h6>
            <div className="metric-value">{reportData.suppliers?.performanceMetrics?.responsivenesScore}%</div>
            <div className="metric-trend neutral">
              <i className="fas fa-minus"></i>
              0%
            </div>
          </div>
        </div>
      </div>

      <div className="top-performers">
        <h5>ספקים מובילים</h5>
        <div className="performers-table">
          <table className="table">
            <thead>
              <tr>
                <th>דירוג</th>
                <th>שם ספק</th>
                <th>ציון כולל</th>
                <th>הזמנות</th>
                <th>סכום כולל</th>
                <th>אספקה בזמן</th>
                <th>ציון איכות</th>
              </tr>
            </thead>
            <tbody>
              {reportData.suppliers?.topPerformers?.map((supplier, index) => (
                <tr key={index}>
                  <td>
                    <div className="ranking">
                      {index + 1}
                      {index === 0 && <i className="fas fa-crown text-warning ms-2"></i>}
                    </div>
                  </td>
                  <td className="supplier-name">{supplier.name}</td>
                  <td>
                    <div className="rating-stars">
                      {[...Array(5)].map((_, i) => (
                        <i 
                          key={i} 
                          className={`fas fa-star ${i < Math.floor(supplier.rating) ? 'text-warning' : 'text-muted'}`}
                        ></i>
                      ))}
                      <span className="rating-value">({supplier.rating})</span>
                    </div>
                  </td>
                  <td>{supplier.orders}</td>
                  <td>₪{supplier.totalAmount.toLocaleString()}</td>
                  <td>
                    <div className="percentage-bar">
                      <div 
                        className="percentage-fill"
                        style={{width: `${supplier.onTimeDelivery}%`}}
                      ></div>
                      <span>{supplier.onTimeDelivery}%</span>
                    </div>
                  </td>
                  <td>
                    <div className="percentage-bar">
                      <div 
                        className="percentage-fill quality"
                        style={{width: `${supplier.qualityScore}%`}}
                      ></div>
                      <span>{supplier.qualityScore}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="risk-analysis">
        <h5>ניתוח סיכונים</h5>
        <div className="risk-alerts">
          {reportData.suppliers?.riskAnalysis?.map((risk, index) => (
            <div key={index} className={`risk-alert ${risk.risk === 'גבוה' ? 'high' : risk.risk === 'בינוני' ? 'medium' : 'low'}`}>
              <div className="risk-icon">
                <i className={`fas ${risk.risk === 'גבוה' ? 'fa-exclamation-triangle' : risk.risk === 'בינוני' ? 'fa-exclamation-circle' : 'fa-check-circle'}`}></i>
              </div>
              <div className="risk-content">
                <div className="risk-supplier">{risk.supplier}</div>
                <div className="risk-level">רמת סיכון: {risk.risk}</div>
                <div className="risk-reason">{risk.reason}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFinancialTab = () => (
    <div className="financial-tab">
      <div className="financial-header">
        <h4>דוח כספי</h4>
        <button 
          className="btn btn-outline-primary"
          onClick={() => handleExportReport('financial')}
        >
          <i className="fas fa-download me-2"></i>
          ייצא דוח
        </button>
      </div>

      <div className="budget-overview">
        <div className="budget-card">
          <h5>סקירת תקציב שנתי</h5>
          <div className="budget-circle">
            <div className="circle-progress">
              <div className="circle-fill" style={{
                background: `conic-gradient(var(--primary-color) 0deg ${reportData.financial?.budgetAnalysis?.utilizationRate * 3.6}deg, #e9ecef ${reportData.financial?.budgetAnalysis?.utilizationRate * 3.6}deg 360deg)`
              }}>
                <div className="circle-inner">
                  <div className="budget-percentage">
                    {reportData.financial?.budgetAnalysis?.utilizationRate}%
                  </div>
                  <div className="budget-label">מהתקציב</div>
                </div>
              </div>
            </div>
            <div className="budget-details">
              <div className="budget-item">
                <span className="label">תקציב כולל:</span>
                <span className="value">₪{reportData.financial?.budgetAnalysis?.totalBudget?.toLocaleString()}</span>
              </div>
              <div className="budget-item">
                <span className="label">נוצל:</span>
                <span className="value">₪{reportData.financial?.budgetAnalysis?.usedBudget?.toLocaleString()}</span>
              </div>
              <div className="budget-item">
                <span className="label">נותר:</span>
                <span className="value">₪{reportData.financial?.budgetAnalysis?.remainingBudget?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="department-spending">
        <h5>הוצאות לפי מחלקות</h5>
        <div className="departments-list">
          {reportData.financial?.departmentSpending?.map((dept, index) => (
            <div key={index} className="department-item">
              <div className="department-header">
                <span className="department-name">{dept.department}</span>
                <span className="department-percentage">{dept.percentage.toFixed(1)}%</span>
              </div>
              <div className="department-progress">
                <div 
                  className="progress-fill"
                  style={{width: `${dept.percentage}%`}}
                ></div>
              </div>
              <div className="department-amounts">
                <span className="spent">₪{dept.spent.toLocaleString()}</span>
                <span className="budget">/ ₪{dept.budget.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="payment-terms">
        <h5>ניתוח תנאי תשלום</h5>
        <div className="payment-grid">
          {Object.entries(reportData.financial?.paymentTermsAnalysis || {}).map(([term, data]) => (
            <div key={term} className="payment-card">
              <div className="payment-header">
                <h6>
                  {term === 'immediate' && 'תשלום מיידי'}
                  {term === 'net30' && 'שוטף + 30'}
                  {term === 'net60' && 'שוטף + 60'}
                  {term === 'net90' && 'שוטף + 90'}
                </h6>
                <span className="payment-percentage">{data.percentage}%</span>
              </div>
              <div className="payment-details">
                <div className="payment-count">{data.count} הזמנות</div>
                <div className="payment-amount">₪{data.amount.toLocaleString()}</div>
              </div>
              <div className="payment-bar">
                <div 
                  className="payment-fill"
                  style={{width: `${data.percentage}%`}}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="reports-loading">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin fa-3x text-primary"></i>
          <p className="mt-3">טוען נתוני דוחות...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reports-container">
      <div className="reports-header">
        <div className="header-content">
          <div className="page-title">
            <h2>דוחות וניתוחים</h2>
            <nav className="breadcrumb">
              <span>בית</span>
              <i className="fas fa-chevron-left"></i>
              <span className="active">דוחות</span>
            </nav>
          </div>
          <div className="header-actions">
            <div className="date-range-selector">
              <label>מתאריך:</label>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => handleDateRangeChange('startDate', e.target.value)}
              />
              <label>עד תאריך:</label>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => handleDateRangeChange('endDate', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="reports-content">
        <div className="reports-tabs">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <i className="fas fa-chart-pie me-2"></i>
                סקירה כללית
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'purchasing' ? 'active' : ''}`}
                onClick={() => setActiveTab('purchasing')}
              >
                <i className="fas fa-shopping-cart me-2"></i>
                ניתוח רכש
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'suppliers' ? 'active' : ''}`}
                onClick={() => setActiveTab('suppliers')}
              >
                <i className="fas fa-building me-2"></i>
                ביצועי ספקים
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'financial' ? 'active' : ''}`}
                onClick={() => setActiveTab('financial')}
              >
                <i className="fas fa-chart-line me-2"></i>
                דוח כספי
              </button>
            </li>
          </ul>

          <div className="tab-content">
            {activeTab === 'overview' && renderOverviewTab()}
            {activeTab === 'purchasing' && renderPurchasingTab()}
            {activeTab === 'suppliers' && renderSuppliersTab()}
            {activeTab === 'financial' && renderFinancialTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;