
function ValidationMessage({ message, type = "error" }) {
    if (!message) return null;

    const icons = {
        error: "✕",
        warning: "⚠",
        loading: "⏳",
        success: "✓",
    };

    return (
        <div
            className={`validation-message ${type}`}
            role={type === "error" ? "alert" : "status"}
            aria-live="polite"
        >
            <span>{icons[type]}</span>
            <span>{message}</span>
        </div>
    );
}

export default ValidationMessage;
