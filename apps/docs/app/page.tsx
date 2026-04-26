import Link from "next/link";

const title = "SQL Studio";
const description = "Single binary, single command SQL database explorer. SQL studio supports SQLite , libSQL , PostgreSQL , MySQL , DuckDB , ClickHouse , Microsoft SQL Server , Parquet and CSV .";

export default function HomePage() {
  return (
    <main style={{ padding: 32 }}>
      <h1>{title}</h1>
      <p>{description}</p>
      <Link href="/docs">Open docs</Link>
    </main>
  );
}
