export const getChartConfig = (theme = "light") => {
  const isDark = theme === "dark";
  const textColor = isDark ? "#ffffff" : "#333333";
  const textColorSecondary = isDark ? "#a0aab0" : "#6c757d";
  const surfaceBorder = isDark ? "rgba(255,255,255,0.1)" : "#e9ecef";
  const lineColor = isDark ? "#3b82f6" : "#2563eb";

  return {
    options: {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              size: 12
            }
          },
          grid: {
            display: false,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary,
            font: {
              size: 12
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      },
      elements: {
        line: {
          tension: 0.4,
          borderColor: lineColor,
          borderWidth: 2,
        },
        point: {
          radius: 4,
          hitRadius: 10,
          hoverRadius: 6,
          backgroundColor: lineColor
        }
      }
    }
  };
};
