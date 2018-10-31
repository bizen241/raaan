export const installApp = async () => {
  try {
    let isFirstInstall = navigator.serviceWorker.controller == null;

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (isFirstInstall) {
        isFirstInstall = false;
      } else {
        console.log("update found");
      }
    });

    const registration = await navigator.serviceWorker.register("/sw.js");
    await navigator.serviceWorker.ready;

    const isLocalhost = location.hostname === "localhost";

    setInterval(() => {
      registration.update().catch(() => {
        console.log("failed to update a ServiceWorker");
      });
    }, isLocalhost ? 5 * 1000 : 15 * 60 * 1000);
  } catch (e) {
    console.log("failed to register a ServiceWorker", e);
  }
};
