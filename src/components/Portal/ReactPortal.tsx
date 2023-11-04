import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface IReactPortal {
  children: any;
  wrapperId: string;
}

export const ReactPortal: React.FC<IReactPortal> = ({
  children,
  wrapperId,
}) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null
  );

  const createWrapperAndAppendToBody = (wrapperId: string) => {
    const wrapperElement = document.createElement("div");
    wrapperElement.setAttribute("id", wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
  };

  useEffect(() => {
    let element = document.getElementById(wrapperId);
    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);
  }, [wrapperId]);

  // wrapperElement state will be null on the very first render.
  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
};
