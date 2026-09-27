"use client";

import * as React from "react";

export function ContentProtection() {
  React.useEffect(() => {
    // 1. Cek Environment: Di mode dev ("development"), proteksi otomatis dinonaktifkan
    // sehingga developer bebas klik kanan, blok teks, copy, dan inspect element.
    // (Bisa diaktifkan sementara di dev untuk testing dengan menambahkan ?protect=1 di URL).
    const isDev = process.env.NODE_ENV === "development";
    const forceTest =
      typeof window !== "undefined" &&
      (window.location.search.includes("protect=1") ||
        window.sessionStorage.getItem("force_content_protection") === "true");

    if (isDev && !forceTest) {
      document.body.classList.remove("protected-content");
      return;
    }

    // 2. Terapkan kelas CSS proteksi pada body di environment production
    document.body.classList.add("protected-content");

    // 3. Blokir Menu Klik Kanan (Context Menu) kecuali pada input form
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      e.preventDefault();
      return false;
    };

    // 4. Blokir Berbagai Shortcut Keyboard Pencurian Konten & DevTools:
    // - F12 (DevTools)
    // - Ctrl/Cmd + Shift + I / J / C / K (Inspect Element & Console)
    // - Ctrl/Cmd + C (Copy)
    // - Ctrl/Cmd + X (Cut)
    // - Ctrl/Cmd + A (Select All)
    // - Ctrl/Cmd + S (Save Webpage)
    // - Ctrl/Cmd + U (View Page Source)
    // - Ctrl/Cmd + P (Print to PDF / Save as PDF)
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      // Biarkan aktivitas pengetikan normal di input form
      if (isInput) return;

      const key = e.key.toLowerCase();
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      // Blokir F12
      if (e.key === "F12") {
        e.preventDefault();
        return false;
      }

      // Blokir Inspect Element & Console (Ctrl/Cmd + Shift + I / J / C / K)
      if (isCtrlOrCmd && e.shiftKey && ["i", "j", "c", "k"].includes(key)) {
        e.preventDefault();
        return false;
      }

      // Blokir Copy, Cut, Select All, Save, View Source, Print
      if (isCtrlOrCmd && ["c", "x", "a", "s", "u", "p"].includes(key)) {
        e.preventDefault();
        return false;
      }
    };

    // 5. Blokir Drag & Drop gambar, media, dan link
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // 6. Blokir Event Copy Langsung pada Dokumen
    const handleCopy = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        target.tagName !== "INPUT" &&
        target.tagName !== "TEXTAREA" &&
        !target.isContentEditable
      ) {
        e.preventDefault();
        if (e.clipboardData) {
          e.clipboardData.clearData();
        }
        return false;
      }
    };

    // 7. Bersihkan Seleksi Teks Otomatis jika Terpicu
    const handleSelectionChange = () => {
      const activeElement = document.activeElement;
      if (
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          (activeElement as HTMLElement).isContentEditable)
      ) {
        return;
      }
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        selection.removeAllRanges();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu, { capture: true });
    document.addEventListener("keydown", handleKeyDown, { capture: true });
    document.addEventListener("dragstart", handleDragStart, { capture: true });
    document.addEventListener("copy", handleCopy, { capture: true });
    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.body.classList.remove("protected-content");
      document.removeEventListener("contextmenu", handleContextMenu, { capture: true });
      document.removeEventListener("keydown", handleKeyDown, { capture: true });
      document.removeEventListener("dragstart", handleDragStart, { capture: true });
      document.removeEventListener("copy", handleCopy, { capture: true });
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  return null;
}
