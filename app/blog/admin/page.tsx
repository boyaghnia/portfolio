"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { BlogPost } from "@/data/blog";
import { AdminAuthModal } from "../_components/admin-auth-modal";
import { AdminDashboard } from "../_components/admin-dashboard";
import { PostEditor } from "../_components/post-editor";
import { Button } from "@/components/ui/button";

export default function BlogAdminPage() {
  const [passcode, setPasscode] = React.useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = React.useState(true);

  // Posts state
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [activeView, setActiveView] = React.useState<"list" | "editor">("list");
  const [currentPost, setCurrentPost] = React.useState<BlogPost | null>(null);
  const [notification, setNotification] = React.useState<string | null>(null);

  // Check saved passcode on mount
  React.useEffect(() => {
    const saved = localStorage.getItem("blog_admin_passcode");
    if (saved) {
      // Verify saved passcode
      fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify_auth", passcode: saved }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setPasscode(saved);
          } else {
            localStorage.removeItem("blog_admin_passcode");
            setIsAuthModalOpen(true);
          }
        })
        .catch(() => {
          setIsAuthModalOpen(true);
        })
        .finally(() => {
          setIsCheckingAuth(false);
        });
    } else {
      setIsCheckingAuth(false);
      setIsAuthModalOpen(true);
    }
  }, []);

  // Fetch all posts (including drafts) when passcode is available
  const fetchAdminPosts = React.useCallback(async () => {
    if (!passcode) return;
    try {
      const res = await fetch(
        `/api/blog?includeDrafts=true&passcode=${encodeURIComponent(passcode)}`
      );
      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.posts)) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.error("Failed to load admin posts:", error);
    }
  }, [passcode]);

  React.useEffect(() => {
    if (passcode) {
      fetchAdminPosts();
    }
  }, [passcode, fetchAdminPosts]);

  // Handle successful login
  const handleAuthenticated = (code: string) => {
    setPasscode(code);
    setIsAuthModalOpen(false);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("blog_admin_passcode");
    setPasscode(null);
    setIsAuthModalOpen(true);
  };

  // Trigger new post editor
  const handleNewPost = () => {
    setCurrentPost(null);
    setActiveView("editor");
  };

  // Trigger edit post editor
  const handleEditPost = (post: BlogPost) => {
    setCurrentPost(post);
    setActiveView("editor");
  };

  // Handle post save success
  const handleSaveSuccess = (savedPost: BlogPost) => {
    setActiveView("list");
    setCurrentPost(null);
    fetchAdminPosts();
    setNotification(`Artikel "${savedPost.title}" berhasil disimpan!`);
    setTimeout(() => setNotification(null), 4000);
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <span className="text-xs text-muted-foreground font-mono">Memverifikasi sesi CMS...</span>
        </div>
      </div>
    );
  }

  if (!passcode) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
        <header className="p-6 border-b border-border/40 flex items-center justify-between">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="gap-2 rounded-none cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Blog</span>
            </Button>
          </Link>
          <span className="text-xs font-semibold text-muted-foreground">Admin Portal</span>
        </header>

        <AdminAuthModal
          isOpen={isAuthModalOpen}
          onAuthenticated={handleAuthenticated}
          onClose={() => setIsAuthModalOpen(true)}
          redirectOnSuccess={false}
        />

        <footer className="p-6 text-center text-xs text-muted-foreground border-t border-border/40">
          Portfolio & CMS © {new Date().getFullYear()} @boyaghnia
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 p-4 rounded-none bg-emerald-600 text-white shadow-xl backdrop-blur-md text-xs font-semibold animate-in fade-in slide-in-from-top-4 flex items-center gap-2 border border-emerald-400/40">
          <Sparkles className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {activeView === "editor" ? (
        <PostEditor
          initialPost={currentPost}
          passcode={passcode}
          onSaveSuccess={handleSaveSuccess}
          onCancel={() => {
            setActiveView("list");
            setCurrentPost(null);
          }}
        />
      ) : (
        <AdminDashboard
          posts={posts}
          passcode={passcode}
          onNewPost={handleNewPost}
          onEditPost={handleEditPost}
          onRefreshPosts={fetchAdminPosts}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
