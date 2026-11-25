
import { useState } from "react";
import ValidationMessage from "./ValidationMessage";

function ProjectForm() {
    const [repositoryUrl, setRepositoryUrl] = useState("");
    const [projectFile, setProjectFile] = useState(null);
    const [feedback, setFeedback] = useState({
        type: "",
        message: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        setFeedback({ type: "", message: "" });

        // Check whether the user provided something
        if (!repositoryUrl.trim() && !projectFile) {
            setFeedback({
                type: "error",
                message: "Please enter a repository URL or upload a project file.",
            });
            return;
        }

        // Validate repository URL
        if (repositoryUrl.trim()) {
            try {
                const url = new URL(repositoryUrl.trim());

                if (
                    url.protocol !== "https:" ||
                    url.hostname.split(".").length < 2 ||
                    url.pathname.split("/").filter(Boolean).length < 2
                ) {
                    throw new Error("Invalid repository URL");
                }
            } catch {
                setFeedback({
                    type: "error",
                    message: "Please enter a valid HTTPS repository URL.",
                });
                return;
            }
        }

        // Validate uploaded file
        if (projectFile) {
            const allowedExtensions = [".zip", ".json"];
            const fileName = projectFile.name.toLowerCase();

            const isAllowed = allowedExtensions.some((extension) =>
                fileName.endsWith(extension)
            );

            if (!isAllowed) {
                setFeedback({
                    type: "error",
                    message: "Only ZIP and JSON files are allowed.",
                });
                return;
            }

            if (projectFile.size > 20 * 1024 * 1024) {
                setFeedback({
                    type: "error",
                    message: "File is too large. Maximum allowed size is 20 MB.",
                });
                return;
            }

            if (projectFile.size > 10 * 1024 * 1024) {
                setFeedback({
                    type: "warning",
                    message: "Your file is large. Processing may take longer.",
                });
                return;
            }
        }

        // Display loading feedback
        setFeedback({
            type: "loading",
            message: "Preparing your project for analysis...",
        });

        // Simulate processing until backend integration
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setFeedback({
            type: "success",
            message: "Project validated successfully! Ready for backend processing.",
        });
    };

    return (
        <div className="project-form">
            <h2>Analyze Your Project</h2>

            <p>
                Enter your GitHub repository URL or upload your project file
                to inspect its dependencies.
            </p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="repositoryUrl">
                    Repository URL
                </label>

                <input
                    id="repositoryUrl"
                    type="url"
                    placeholder="https://github.com/username/repository"
                    value={repositoryUrl}
                    disabled={feedback.type === "loading"}
                    onChange={(e) => {
                        setRepositoryUrl(e.target.value);
                        setProjectFile(null);
                        setFeedback({ type: "", message: "" });
                    }}
                />

                <div className="form-divider">
                    <span>OR</span>
                </div>

                <label htmlFor="projectFile">
                    Upload Project
                </label>

                <input
                    id="projectFile"
                    type="file"
                    accept=".zip,.json"
                    disabled={feedback.type === "loading"}
                    onChange={(e) => {
                        setProjectFile(e.target.files[0] || null);
                        setRepositoryUrl("");
                        setFeedback({ type: "", message: "" });
                    }}
                />

                {projectFile && (
                    <p className="selected-file">
                        Selected file: {projectFile.name}
                    </p>
                )}

                <ValidationMessage
                    message={feedback.message}
                    type={feedback.type}
                />

                <button
                    type="submit"
                    disabled={feedback.type === "loading"}
                >
                    {feedback.type === "loading"
                        ? "Processing..."
                        : "Analyze Project"}
                </button>
            </form>
        </div>
    );
}

export default ProjectForm;
