export function getCookie(key: string) {
    const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
}

export const getStatusColor = (value: string) => {
    var stringValue = value.toLowerCase();
    if (stringValue === "pending") {
        return "rgb(254, 206, 82)"
    }
    else if (stringValue === "succeeded") {
        return "green"
    }
    else if (stringValue === "failed") {
        return "red"
    }
    else {
        return null
    }
}