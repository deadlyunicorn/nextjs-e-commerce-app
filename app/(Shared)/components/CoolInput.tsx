import { ReactNode } from "react";

export const CoolInput = ({ children }: { children: ReactNode }) => (
    <div
        className="
    max-w-[100%]
    text-inherit px-1 rounded-md
    hover:bg-slate-50 bg-slate-100 
    dark:hover:bg-slate-950 dark:bg-slate-900">
        {children}
    </div>
)