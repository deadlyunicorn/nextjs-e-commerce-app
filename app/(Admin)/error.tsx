"use client"

import ErrorPage from "../(Shared)/components/ErrorPage";


export default function Error ({reset}:{reset:()=>void}) {
    return <ErrorPage reset={reset}/>;
}
