// libs
import LogRocket from "logrocket";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

export const startLogrocketSession = () => {
  LogRocket.init("eupvwg/upstart-education");

  const user = Cookies.get("_upstart-auth-user");
  const domain = Cookies.get("_upstart-auth-domain");
  const identity = `${user}@${domain}`;

  // don't waste sessions on our own views of the page
  if (
    domain?.indexOf("upstart.services") < 0 &&
    domain?.indexOf("gmail.com") < 0 &&
    user?.indexOf("fruk") < 0 &&
    user?.indexOf("faruk") < 0 &&
    user?.indexOf("kraba") < 0
  ) {
    LogRocket.startNewSession();
    LogRocket.identify(identity, {
      sessionId: Date.now().toString().slice(0, -6),
      user,
      domain,
      env: process.env.UPSTART_ENV || "dev",
    });
  }
};
