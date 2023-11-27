import * as React from "react";
import * as reactToast from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const ToastProvider = reactToast.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof reactToast.Viewport>,
  React.ComponentPropsWithoutRef<typeof reactToast.Viewport>
>(({ className, ...props }, ref) => (
  <reactToast.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = reactToast.Viewport.displayName;

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
        success:
          "destructive group border-success-foreground bg-success text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Toast = React.forwardRef<
  React.ElementRef<typeof reactToast.Root>,
  React.ComponentPropsWithoutRef<typeof reactToast.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <reactToast.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  );
});
Toast.displayName = reactToast.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof reactToast.Action>,
  React.ComponentPropsWithoutRef<typeof reactToast.Action>
>(({ className, ...props }, ref) => (
  <reactToast.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      className,
      // {
      //   variant: {
      //     destructive:
      //       "group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      //     success:
      //       "group-[.success]:border-muted/40 group-[.success]:hover:border-success/30 group-[.success]:hover:bg-success group-[.success]:hover:text-success-foreground group-[.success]:focus:ring-success",
      //   },
      // },
    )}
    {...props}
  />
));
ToastAction.displayName = reactToast.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof reactToast.Close>,
  React.ComponentPropsWithoutRef<typeof reactToast.Close>
>(({ className, ...props }, ref) => (
  <reactToast.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className,
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </reactToast.Close>
));
ToastClose.displayName = reactToast.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof reactToast.Title>,
  React.ComponentPropsWithoutRef<typeof reactToast.Title>
>(({ className, ...props }, ref) => (
  <reactToast.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
));
ToastTitle.displayName = reactToast.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof reactToast.Description>,
  React.ComponentPropsWithoutRef<typeof reactToast.Description>
>(({ className, ...props }, ref) => (
  <reactToast.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
));
ToastDescription.displayName = reactToast.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
