import { useEffect } from 'react'
import packageJson from "../../package.json";

const useCache = () => {
    // Here you have to change the version in package.json to remove cache from users browser each time you deploy the website
  useEffect(() => {
    const checkAndUpdateCache = () => {
      let version = localStorage.getItem("vsophia");
      if (version !== packageJson.version) {
        if ("caches" in window) {
          caches.keys().then((names) => {
            // Delete all the cache files
            names.forEach((name) => {
              caches.delete(name);
            });
          });

          // Makes sure the page reloads. Changes are only visible after refresh.
          window.location.reload(true);
        }
        localStorage.clear();
        localStorage.setItem("vsophia", packageJson.version);
      }
    };

    checkAndUpdateCache();
  }, []);
  return (
    <></>
  )
}

export default useCache