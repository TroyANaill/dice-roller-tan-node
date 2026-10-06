
const API_BASE_URL = "dice-roller-tan-node-h2d7a7b7dthgdnbg.centralus-01.azurewebsites.net";

const result = document.getElementById("result");

async function wakeServer() {
    result.textContent = "Calling /wake...";

    try {
        const response = await fetch(`${API_BASE_URL}/wake`);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        result.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        result.textContent = `Request failed: ${error.message}`;
        console.error(error);
    }
}

async function testRoll() {
    result.textContent = "Calling /roll...";

    try {
        const response = await fetch(`${API_BASE_URL}/roll`);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        result.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        result.textContent = `Request failed: ${error.message}`;
        console.error(error);
    }
}

async function testCorsFailure() {
    result.textContent = "Calling /cors-failure...";

    try {
        const response = await fetch(`${API_BASE_URL}/cors-failure`);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        result.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        result.textContent =
            "CORS failure demonstrated. Check the browser Console for the CORS error.";
        console.error("Expected CORS failure:", error);
    }
}