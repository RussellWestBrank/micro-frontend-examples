import {
  NOT_MOUNTED,
  MOUNTED,
  SKIP_BECAUSE_BROKEN,
} from "../applications/app.helpers.js";
import { handleAppError, transformErr } from "../applications/app-errors.js";
import { reasonableTime } from "../applications/timeouts.js";
import CustomEvent from "custom-event";
import { toUnmountPromise } from "./unmount.js";

let beforeFirstMountFired = false;
let firstMountFired = false;

export function toMountPromise(appOrParcel, hardFail) {
  console.log(
    "[lifecycles/mount.js - toMountPromise]: toMountPromise 函数开始执行...",
    appOrParcel.name,
    appOrParcel.status
  );

  return Promise.resolve().then(() => {
    console.log(
      "[lifecycles/mount.js - toMountPromise]: toMountPromise Promise.resolve 开始执行...",
      appOrParcel.name,
      appOrParcel.status
    );

    if (appOrParcel.status !== NOT_MOUNTED) {
      return appOrParcel;
    }

    if (!beforeFirstMountFired) {
      window.dispatchEvent(new CustomEvent("single-spa:before-first-mount"));
      beforeFirstMountFired = true;
    }

    console.log(
      "[lifecycles/mount.js - toMountPromise]: 准备执行子应用的 mount 周期函数...",
      appOrParcel.name,
      appOrParcel.status
    );

    return reasonableTime(appOrParcel, "mount")
      .then(() => {
        appOrParcel.status = MOUNTED;

        if (!firstMountFired) {
          window.dispatchEvent(new CustomEvent("single-spa:first-mount"));
          firstMountFired = true;
        }
        console.log(
          "[lifecycles/mount.js - toMountPromise]: 子应用的 mount 周期函数执行成功",
          appOrParcel.name,
          appOrParcel.status
        );

        return appOrParcel;
      })
      .catch((err) => {
        // If we fail to mount the appOrParcel, we should attempt to unmount it before putting in SKIP_BECAUSE_BROKEN
        // We temporarily put the appOrParcel into MOUNTED status so that toUnmountPromise actually attempts to unmount it
        // instead of just doing a no-op.
        appOrParcel.status = MOUNTED;
        return toUnmountPromise(appOrParcel, true).then(
          setSkipBecauseBroken,
          setSkipBecauseBroken
        );

        function setSkipBecauseBroken() {
          if (!hardFail) {
            handleAppError(err, appOrParcel, SKIP_BECAUSE_BROKEN);
            return appOrParcel;
          } else {
            throw transformErr(err, appOrParcel, SKIP_BECAUSE_BROKEN);
          }
        }
      });
  });
}
