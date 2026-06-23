console.log("Project 4 Integration Engine: Activated (async/await Edition).");

// --- 1. CONFIGURATION GATEWAY ---
const INVENTORY_API_ENDPOINT = "http://localhost:5000/api/products";

// --- 2. SINGLE PAGE APPLICATION (SPA) DOM CORE ROUTING ---
const homeView = document.getElementById("home-view");
const inventoryView = document.getElementById("inventory-view");
const genericView = document.getElementById("generic-view");

const inventoryList = document.getElementById("inventory-list");
const genericTitle = document.getElementById("generic-title");
const genericMessage = document.getElementById("generic-message");

/**
 * Clean Interface Swapping Controller
 * Ensures screen real-estate is cleared before rendering target views
 */
function switchView(viewToShow) {
    homeView.style.display = "none";
    inventoryView.style.display = "none";
    genericView.style.display = "none";
    
    viewToShow.style.display = "block";
}

// --- 3. PROJECT 4 MANDATORY: ASYNCHRONOUS DATA CORE WORKER ---
/**
 * Executes a resilient, guarded network transaction to fetch live assets 
 * utilizing modern asynchronous syntax, defensive status validation, and error traps.
 */
async function fetchAndRenderProductsSecurely() {
    // A: Swap user vision to inventory section and mount network loading flag
    switchView(inventoryView);
    inventoryList.innerHTML = "<p>🔄 Accessing network sockets... Fetching data stream from MongoDB Vault...</p>";
    console.log("Formulating async network request stream to MongoDB cluster...");

    // B: Open Defensive Error Boundary Shield (Project 4 Rule)
    try {
        // C: Initialize the Asynchronous Network Request (Project 4 Rule)
        const response = await fetch(INVENTORY_API_ENDPOINT);

        // D: Explicit Server Status Guarding (Project 4 Anti-Pattern Prevention)
        if (!response.ok) {
            throw new Error(`Data stream transport interruption. Server returned Status Code: ${response.status}`);
        }

        // E: Translate Raw Network String Blocks into Javascript JSON Arrays
        const databaseRecords = await response.json();
        console.log("Payload extracted successfully from database:", databaseRecords);

        // F: Clear local loading indicator placeholder text
        inventoryList.innerHTML = ""; 

        // G: Dynamic DOM UI Insertion Loop (Project 4 Core Requirement)
        databaseRecords.forEach(item => {
            const card = document.createElement("div");
            card.className = "category-card";
            card.innerHTML = `
                <h4>${item.name}</h4>
                <p style="color: var(--mocha-mousse); font-weight: 700; margin: 8px 0;">${item.price}</p>
                <p>${item.specs}</p>
            `;
            inventoryList.appendChild(card);
        });

    } catch (err) {
        // H: Graceful Exception Interception (Prevents blank white screens or UI lockups)
        console.error("Integration Engine Fault Logged: ", err);
        inventoryList.innerHTML = `
            <div style="grid-column: 1 / -1; padding: 20px; background: rgba(255,0,0,0.1); border-left: 4px solid #ff4d4d;">
                <p>⚠️ <strong>Integration Failure:</strong> Failed to extract data logs securely.</p>
                <p style="font-size: 0.85rem; margin-top: 5px; color: #ffb3b3;">Reason: ${err.message}</p>
                <p style="font-size: 0.85rem; margin-top: 5px;">Action Required: Ensure 'node server.js' is currently executing in your terminal window.</p>
            </div>
        `;
    }
}

// --- 4. HARDWIRED INTERACTIVITY REGISTER MAP ---

// Bind Explore Catalog Button to the async worker
const exploreButton = document.getElementById("explore");
if (exploreButton) {
    exploreButton.addEventListener("click", async () => {
        await fetchAndRenderProductsSecurely();
    });
}

// Static fallback text map for generic system navigation options
const hubPageTitles = {
    "control-panel": "Control Panel",
    "performance-logs": "Performance Logs",
    "system-settings": "System Settings"
};

const hubActionMessages = {
    "control-panel": "🔒 Access Denied: Entering secure Admin Control Dashboard requires multi-factor clearance authorization.",
    "live-inventory": "📊 Synchronization Active: Cross-referencing active warehouse SKU balances with local hardware arrays.",
    "performance-logs": "📈 Diagnostics Hub: System checks complete. Latency stable at 12ms. Core network interfaces running nominal.",
    "system-settings": "⚙️ Configuration Restricted: Local profile modifier options are locked. Contact your administrator."
};

// Loop through navigation array hooks to map out Single Page Application transitions
Object.keys(hubActionMessages).forEach(buttonElementId => {
    const clickableLink = document.getElementById(buttonElementId);
    if (clickableLink) {
        clickableLink.addEventListener("click", async (event) => {
            event.preventDefault(); // Defends against browser snapping jumping bugs
            
            if (buttonElementId === "live-inventory") {
                // Route directly into our modern integration pipeline
                await fetchAndRenderProductsSecurely();
            } else {
                // Pipe standard text alerts layout cards onto the generic dashboard frame
                switchView(genericView);
                genericTitle.innerText = hubPageTitles[buttonElementId] || "Dashboard";
                genericMessage.innerText = hubActionMessages[buttonElementId];
            }
        });
    }
});