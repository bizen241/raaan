export const installApp = async (serviceWorker: ServiceWorkerContainer) => {
  try {
    let isFirstInstall = serviceWorker.controller == null;

    serviceWorker.addEventListener("controllerchange", () => {
      if (isFirstInstall) {
        isFirstInstall = false;
      } else {
        console.log("update found");
      }
    });

    const registration = await serviceWorker.register("/sw.js");
    await serviceWorker.ready;

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
