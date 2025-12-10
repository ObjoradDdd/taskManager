import { useState } from "react";
import { Result } from "../types";
import "../styles/common.css";

interface GanttChartProps {
  results: Result[];
  onResultClick?: (result: Result) => void;
}

export const GanttChart = ({ results, onResultClick }: GanttChartProps) => {
  const [hoveredResultId, setHoveredResultId] = useState<string | null>(null);

  // Получаем минимальную и максимальную дату для расчета шкалы времени
  const getDates = () => {
    const dates = results
      .map(r => new Date(r.dueDate || new Date()))
      .filter(d => !isNaN(d.getTime()));
    
    if (dates.length === 0) {
      const today = new Date();
      return { 
        min: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7),
        max: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30)
      };
    }
    
    const min = new Date(Math.min(...dates.map(d => d.getTime())));
    const max = new Date(Math.max(...dates.map(d => d.getTime())));
    
    // Расширяем диапазон на неделю в каждую сторону
    min.setDate(min.getDate() - 7);
    max.setDate(max.getDate() + 7);
    
    return { min, max };
  };

  const { min: minDate, max: maxDate } = getDates();
  
  // Вычисляем общее количество дней
  const totalDays = Math.max(
    (maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24),
    1
  );

  // Функция для расчета позиции и ширины полоски на диаграмме
  const calculatePosition = (dueDate: string | undefined) => {
    if (!dueDate) return { left: 0, width: 0 };
    
    const taskDate = new Date(dueDate);
    if (isNaN(taskDate.getTime())) return { left: 0, width: 0 };
    
    const daysFromStart = (taskDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24);
    const left = (daysFromStart / totalDays) * 100;
    const width = Math.max(8, (7 / totalDays) * 100); // минимальная ширина 8%
    
    return { left: Math.max(0, left), width: Math.min(100 - Math.max(0, left), width) };
  };

  // Функция для форматирования даты
  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString("ru-RU", { month: "short", day: "numeric" });
  };

  // Функция для расчета прогресса выполнения (упрощенная)
  const getProgressPercent = (result: Result) => {
    // Если дедлайн прошел
    if (result.dueDate && new Date(result.dueDate) < new Date()) {
      return 100;
    }
    return 50; // по умолчанию 50% прогресса
  };

  return (
    <div style={{ overflowX: "auto", padding: "20px 0" }}>
      <div style={{ minWidth: "900px" }}>
        {/* Заголовок диаграммы */}
        <div style={{ display: "flex", marginBottom: "20px", alignItems: "center" }}>
          <div style={{ width: "250px", fontWeight: "bold", paddingRight: "10px", fontSize: "14px" }}>
            Результат
          </div>
          <div style={{ flex: 1, fontWeight: "bold", paddingLeft: "10px", fontSize: "14px" }}>
            {formatDate(minDate)} — {formatDate(maxDate)}
          </div>
        </div>

        {/* Полосы диаграммы */}
        {results.length > 0 ? (
          results.map((result) => {
            const position = calculatePosition(result.dueDate);
            const isHovered = hoveredResultId === result.id;
            
            return (
              <div
                key={result.id}
                style={{
                  display: "flex",
                  marginBottom: "16px",
                  alignItems: "center",
                  cursor: onResultClick ? "pointer" : "default",
                  opacity: hoveredResultId === null || isHovered ? 1 : 0.6,
                  transition: "opacity 0.2s"
                }}
                onMouseEnter={() => setHoveredResultId(result.id)}
                onMouseLeave={() => setHoveredResultId(null)}
                onClick={() => onResultClick?.(result)}
              >
                {/* Название результата */}
                <div
                  style={{
                    width: "250px",
                    paddingRight: "10px",
                    fontSize: "13px",
                    fontWeight: "500",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: isHovered ? "#007bff" : "#333"
                  }}
                  title={result.title}
                >
                  📌 {result.title}
                </div>

                {/* Шкала времени и полоска */}
                <div
                  style={{
                    flex: 1,
                    paddingLeft: "10px",
                    height: "45px",
                    position: "relative",
                    backgroundColor: isHovered ? "#e7f3ff" : "#f8f9fa",
                    borderRadius: "4px",
                    border: isHovered ? "2px solid #007bff" : "1px solid #dee2e6",
                    overflow: "hidden",
                    transition: "all 0.2s"
                  }}
                >
                  {/* Основная полоска */}
                  {position.width > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "2px",
                        left: `${position.left}%`,
                        width: `${position.width}%`,
                        height: "calc(100% - 4px)",
                        background: `linear-gradient(90deg, #007bff, #0056b3)`,
                        opacity: 0.85,
                        borderRadius: "3px",
                        transition: "all 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        color: "white",
                        fontWeight: "bold",
                        minWidth: "60px",
                        boxShadow: isHovered ? "0 2px 8px rgba(0,0,0,0.15)" : "none"
                      }}
                      title={`Дедлайн: ${formatDate(result.dueDate || new Date())}`}
                    >
                      {position.width > 18 && formatDate(result.dueDate || new Date())}
                    </div>
                  )}

                  {/* Сегодняшняя дата линия (если видна) */}
                  {minDate <= new Date() && new Date() <= maxDate && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: `${((new Date().getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24) / totalDays) * 100}%`,
                        width: "2px",
                        height: "100%",
                        backgroundColor: "#dc3545",
                        zIndex: 10,
                        opacity: 0.7
                      }}
                      title="Сегодня"
                    />
                  )}
                </div>

                {/* Статус иконка */}
                <div
                  style={{
                    marginLeft: "15px",
                    minWidth: "50px",
                    textAlign: "center",
                    fontSize: "16px"
                  }}
                >
                  {result.dueDate && new Date(result.dueDate) < new Date() ? "⚠️" : "✓"}
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ textAlign: "center", color: "#6c757d", padding: "40px 20px", fontSize: "15px" }}>
            📭 Нет результатов для отображения<br/>
            <span style={{ fontSize: "12px" }}>Создайте результат для просмотра диаграммы Ганта</span>
          </div>
        )}

        {/* Легенда */}
        {results.length > 0 && (
          <div style={{ marginTop: "30px", paddingTop: "15px", borderTop: "1px solid #dee2e6", fontSize: "12px", color: "#6c757d" }}>
            <div style={{ marginBottom: "8px" }}>
              <span style={{ display: "inline-block", marginRight: "20px" }}>
                <span style={{ color: "#dc3545" }}>🔴</span> Сегодня
              </span>
              <span style={{ display: "inline-block", marginRight: "20px" }}>
                <span style={{ color: "#007bff" }}>█</span> Дедлайн результата
              </span>
              <span>
                <span style={{ fontSize: "16px" }}>⚠️</span> Просроченный дедлайн
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
