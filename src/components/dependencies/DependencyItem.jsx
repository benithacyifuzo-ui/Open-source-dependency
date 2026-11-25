
import { useState } from "react";

function DependencyItem({ dependency, level = 0 }) {
    const [isExpanded, setIsExpanded] = useState(true);

    const hasChildren = dependency.children?.length > 0;

    return (
        <div
            className="dependency-item"
            style={{ marginLeft: `${level * 24}px` }}
        >
            <div className="dependency-row">
                <div className="dependency-info">
                    {hasChildren && (
                        <button
                            className="expand-button"
                            onClick={() => setIsExpanded(!isExpanded)}
                            aria-label={
                                isExpanded ? "Collapse dependencies" : "Expand dependencies"
                            }
                        >
                            {isExpanded ? "▼" : "▶"}
                        </button>
                    )}

                    {!hasChildren && <span className="expand-placeholder" />}

                    <span className="package-icon">📦</span>

                    <strong>{dependency.name}</strong>

                    <span className="package-version">
                        v{dependency.version}
                    </span>
                </div>

                <div className="dependency-tags">
                    <span className="dependency-type">{dependency.type}</span>

                    <span
                        className={`dependency-status ${dependency.status.toLowerCase()}`}
                    >
                        {dependency.status}
                    </span>
                </div>
            </div>

            {hasChildren && isExpanded && (
                <div className="dependency-children">
                    {dependency.children.map((child) => (
                        <DependencyItem
                            key={child.id}
                            dependency={child}
                            level={level + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default DependencyItem;
