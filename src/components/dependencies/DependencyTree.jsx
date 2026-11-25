
import mockDependencies from "../../data/mockDependencies";
import DependencyItem from "./DependencyItem";

function DependencyTree() {
    const totalDependencies = mockDependencies.length;

    function countPackages(dependencies) {
        return dependencies.reduce((total, dependency) => {
            return total + 1 + countPackages(dependency.children || []);
        }, 0);
    }

    const totalPackages = countPackages(mockDependencies);

    const transitiveCount = totalPackages - totalDependencies;

    return (
        <section className="dependency-tree">
            <div className="dependency-header">
                <div>
                    <h2>Dependency Tree</h2>
                    <p>Explore your project's packages and their relationships.</p>
                </div>
            </div>

            <div className="dependency-summary">
                <div className="summary-card">
                    <span>Total Packages</span>
                    <strong>{totalPackages}</strong>
                </div>

                <div className="summary-card">
                    <span>Direct Dependencies</span>
                    <strong>{totalDependencies}</strong>
                </div>

                <div className="summary-card">
                    <span>Transitive Dependencies</span>
                    <strong>{transitiveCount}</strong>
                </div>
            </div>

            <div className="dependency-list">
                {mockDependencies.map((dependency) => (
                    <DependencyItem
                        key={dependency.id}
                        dependency={dependency}
                    />
                ))}
            </div>
        </section>
    );
}

export default DependencyTree;
