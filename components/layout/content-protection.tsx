"use client";

import * as React from "react";

export function ContentProtection() {
  React.useEffect(() => {
    // 1. Prevent Right-Click Context Menu (except inside form inputs)
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
        return;
      }
      e.preventDefault();
    };

    // 2. Prevent Copy / Cut shortcuts & Save page
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA");

      // Allow typing and editing in inputs
      if (isInput) return;

      const key = e.key.toLowerCase();
      // Block Ctrl/Cmd + C (Copy), X (Cut), S (Save), U (View Source)
      if ((e.ctrlKey || e.metaKey) && ["c", "x", "s", "u"].includes(key)) {
        e.preventDefault();
      }
    };

    // 3. Prevent dragging images/assets
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    // 4. Prevent direct copy event on document
    const handleCopy = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("copy", handleCopy);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("copy", handleCopy);
    };
  }, []);

  return null;
}
