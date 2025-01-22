import { Github, Linkedin, Globe } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white shadow-md mt-auto">
      <div className="container mx-auto py-4 px-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-lg text-gray-600 mb-4 sm:mb-0">
          © 2025 Yuan Qin. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <Link
            href="https://github.com/yuanqinong"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900"
          >
            <Github className="w-6 h-6" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://www.linkedin.com/in/ong-yuan-qin/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900"
          >
            <Linkedin className="w-6 h-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="https://yqportfolio.cc/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900"
          >
            <Globe className="w-6 h-6" />
            <span className="sr-only">Personal Website</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
