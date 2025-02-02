function generateUniqueId() {
    return btoa(
        crypto
            .getRandomValues(new Uint8Array(6))
            .reduce((acc, byte) => acc + String.fromCharCode(byte), "")
    )
        .replace(/[^a-zA-Z]/g, "")
        .slice(0, 8);
}

console.log(generateUniqueId()); // Example: "QWxzNtYp"

export default generateUniqueId;
