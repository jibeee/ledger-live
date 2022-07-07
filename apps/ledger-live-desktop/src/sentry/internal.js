// @flow
import * as Sentry from "@sentry/node";
import "@sentry/tracing";
import { listen } from "@ledgerhq/logs";
import { init, setShouldSendCallback } from "./install";
export { Sentry };

const available = init(Sentry, {
  integrations: [new Sentry.Integrations.Http({ tracing: true })],
});

if (available) {
  let span;
  listen(l => {
    if (!l) return;
    if (l.type === "apdu") {
      if (l.message?.startsWith("=>")) {
        const t = Sentry.getCurrentHub()
          .getScope()
          .getSpan();
        span = t?.startChild({ op: "apdu", description: l.message.slice(0, 11) });
      } else if (l.message?.startsWith("<=")) {
        span?.finish();
      }
    }
  });
}

export default (shouldSendCallback: () => boolean, userId: string) => {
  if (!available) return;
  setShouldSendCallback(shouldSendCallback);
  Sentry.setUser({ id: userId, ip_address: null });
};

export const captureException = (e: Error) => {
  Sentry.captureException(e);
};

export const captureBreadcrumb = (o: *) => {
  Sentry.addBreadcrumb(o);
};

export const setTags = (tags: *) => {
  Sentry.setTags(tags);
};
