"use client";

import * as React from "react";
import Script from "next/script";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          action?: string;
          cData?: string;
          callback?: (token: string) => void;
          "error-callback"?: (error?: string) => void;
          "expired-callback"?: () => void;
          theme?: "auto" | "light" | "dark";
          size?: "normal" | "compact" | "flexible";
          [key: string]: any;
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
      getResponse: (widgetId?: string) => string;
    };
  }
}

export interface TurnstileWidgetHandle {
  reset: () => void;
  getWidgetId: () => string | null;
}

interface TurnstileWidgetProps {
  siteKey?: string;
  action?: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: (error?: string) => void;
  className?: string;
  theme?: "auto" | "light" | "dark";
}

export const TurnstileWidget = React.memo(
  React.forwardRef<TurnstileWidgetHandle, TurnstileWidgetProps>(
    function TurnstileWidget(
      {
        siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
          "0x4AAAAAAFL5JK78Qk3e5uaK",
        action = "guestbook",
        onVerify,
        onExpire,
        onError,
        className,
        theme = "auto",
      },
      ref
    ) {
      const containerRef = React.useRef<HTMLDivElement>(null);
      const widgetIdRef = React.useRef<string | null>(null);

      // Keep callbacks in refs to avoid recreating the widget when parent re-renders
      const onVerifyRef = React.useRef(onVerify);
      const onExpireRef = React.useRef(onExpire);
      const onErrorRef = React.useRef(onError);

      React.useEffect(() => {
        onVerifyRef.current = onVerify;
        onExpireRef.current = onExpire;
        onErrorRef.current = onError;
      }, [onVerify, onExpire, onError]);

      // Expose reset and getWidgetId to parent component
      React.useImperativeHandle(ref, () => ({
        reset: () => {
          if (widgetIdRef.current && window.turnstile) {
            window.turnstile.reset(widgetIdRef.current);
          }
        },
        getWidgetId: () => widgetIdRef.current,
      }));

      const renderWidget = React.useCallback(() => {
        if (
          !containerRef.current ||
          !window.turnstile ||
          widgetIdRef.current !== null ||
          !siteKey
        ) {
          return;
        }

        try {
          const id = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            action,
            theme,
            callback: (token: string) => {
              onVerifyRef.current?.(token);
            },
            "expired-callback": () => {
              onExpireRef.current?.();
            },
            "error-callback": (err?: string) => {
              onErrorRef.current?.(err);
            },
          });
          widgetIdRef.current = id;
        } catch (err) {
          console.error("Failed to render Turnstile widget:", err);
        }
      }, [siteKey, action, theme]);

      // Handle case where script is already loaded (e.g., client navigation)
      React.useEffect(() => {
        if (typeof window !== "undefined" && window.turnstile) {
          renderWidget();
        }

        return () => {
          if (widgetIdRef.current && window.turnstile) {
            try {
              window.turnstile.remove(widgetIdRef.current);
            } catch {
              // ignore cleanup error
            }
            widgetIdRef.current = null;
          }
        };
      }, [renderWidget]);

      return (
        <div className={className}>
          <Script
            id="cloudflare-turnstile-script"
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            strategy="afterInteractive"
            onLoad={() => {
              renderWidget();
            }}
          />
          <div
            ref={containerRef}
            className="min-h-[65px] flex items-center justify-start"
            data-testid="turnstile-container"
          />
        </div>
      );
    }
  )
);
