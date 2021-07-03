import { useRef, useState, useEffect } from "react";

/** Custom hook for managing "flash" messages.
 *
 * This adds an item in state, `active`, which can be controlled by the
 * component as desired. 
 *
 * In the component::
 *
 *   const [myMsgFlag, setMyMsgFlag] = useTimedMessage();
 *
 *   function somethingDidntWork() {
 *     setMsgFlag(true);
 *   }
 *
 *   return (
 *     {myMsgFlag ? <p>Oh No!</p> : null}
 *   )
 *
 */

function useTimedMessage(timeInMsec = 3000) {
  const [active, setActive] = useState(false);

  const messageShownRef = useRef(false);

  useEffect(
      function showSavedMessage() {
        console.debug(
            "useTimedMessage useEffect showSavedMessage", "active=", active);

        if (active && !messageShownRef.current) {
          messageShownRef.current = true;
          setTimeout(function removeMessage() {
            setActive(false);
            messageShownRef.current = false;
          }, timeInMsec);
        }
      },
      [active, timeInMsec],
  );

  return [active, setActive];
}

export default useTimedMessage;
