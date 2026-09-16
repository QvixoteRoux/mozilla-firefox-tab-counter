// Updates the toolbar badge with "tabsInCurrentWindow/totalTabs"
// Fires whenever tabs are created, removed, moved between windows,
// or the focused window changes.

async function updateBadge() {
  try {
    const allTabs = await browser.tabs.query({});
    const total = allTabs.length;

    // Find the currently focused normal window; fall back to the
    // window of the active tab if focus info isn't available yet.
    let currentWindow;
    try {
      currentWindow = await browser.windows.getLastFocused({ windowTypes: ["normal"] });
    } catch (e) {
      const [activeTab] = await browser.tabs.query({ active: true, currentWindow: true });
      currentWindow = activeTab ? { id: activeTab.windowId } : null;
    }

    const inWindow = currentWindow
      ? allTabs.filter(t => t.windowId === currentWindow.id).length
      : total;

    const badgeText = `${inWindow}/${total}`;
    await browser.browserAction.setBadgeText({ text: badgeText });
    await browser.browserAction.setBadgeBackgroundColor({ color: "#4a6da7" });
    await browser.browserAction.setTitle({
      title: `${inWindow} tabs in this window, ${total} total`
    });
  } catch (err) {
    console.error("Tab Counter error:", err);
  }
}

// Recompute on every relevant event.
browser.tabs.onCreated.addListener(updateBadge);
browser.tabs.onRemoved.addListener(updateBadge);
browser.tabs.onAttached.addListener(updateBadge);
browser.tabs.onDetached.addListener(updateBadge);
browser.tabs.onUpdated.addListener(updateBadge);
browser.windows.onFocusChanged.addListener(updateBadge);
browser.windows.onCreated.addListener(updateBadge);
browser.windows.onRemoved.addListener(updateBadge);

// Initial paint.
updateBadge();
