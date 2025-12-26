import { Link, useLocation, useParams } from "react-router-dom";

export const Breadcrumbs = () => {
  const location = useLocation();
  const { subjectId, projectId, resultId } = useParams();

  const crumbs = [
    { label: "Предметы", to: "/admin_subjects" },
  ];

  if (subjectId) {
    crumbs.push({
      label: `Предмет ${subjectId}`,
      to: `/subjects/${subjectId}`,
    });
  }

  if (projectId) {
    crumbs.push({
      label: `Проект ${projectId}`,
      to: `/subjects/${subjectId}/projects/${projectId}`,
    });
  }

  if (resultId) {
    crumbs.push({
      label: `Результат ${resultId}`,
      to: location.pathname,
    });
  }

  return (
    <nav style={{ marginBottom: "16px", fontSize: "14px" }}>
      {crumbs.map((c, i) => (
        <span key={i}>
          {i > 0 && " / "}
          <Link to={c.to}>{c.label}</Link>
        </span>
      ))}
    </nav>
  );
};