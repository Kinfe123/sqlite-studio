import "react-data-grid/lib/styles.css";

import {
  Workflow,
  TextSearch,
  DatabaseZap,
  Table as TableIcon,
} from "lucide-react";
import DataGrid from "react-data-grid";
import { CodeBlock } from "react-code-blocks";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { fetchTable, fetchTables } from "@/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/tables")({
  component: Tables,
  loader: () => fetchTables(),
});

function Tables() {
  const data = Route.useLoaderData();

  return (
    <Tabs defaultValue="0">
      <TabsList>
        {data.tables.map((n, i) => (
          <TabsTrigger key={i} value={i.toString()}>
            {n.name} ({n.count})
          </TabsTrigger>
        ))}
      </TabsList>
      {data.tables.map(({ name }, i) => (
        <TabsContent key={i} value={i.toString()} className="py-4">
          <Table name={name} />
        </TabsContent>
      ))}
    </Tabs>
  );
}

type Props = {
  name: string;
};
function Table({ name }: Props) {
  const { data } = useQuery({
    queryKey: ["tables", name],
    queryFn: () => fetchTable(name),
  });

  if (!data) return;

  const columns = data.columns.map((col) => ({ key: col, name: col }));
  const rows = data.rows.map((row) =>
    row.reduce((acc, curr, i) => {
      acc[data.columns[i]] = curr;
      return acc;
    }, {}),
  );

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <h2 className="px-2 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {data.name}
      </h2>

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Row Count</CardTitle>
            <TableIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.row_count}</div>
            <p className="text-xs text-muted-foreground">
              The number of rows in the table.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Indexes</CardTitle>
            <DatabaseZap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.indexes.length}</div>
            <p className="text-xs text-muted-foreground">
              The number of indexes in the table.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Columns</CardTitle>
            <TextSearch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.columns.length}</div>
            <p className="text-xs text-muted-foreground">
              The number of columns in the table.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Table Size</CardTitle>
            <Workflow className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.table_size}</div>
            <p className="text-xs text-muted-foreground">
              The size of the table on disk.
            </p>
          </CardContent>
        </Card>
      </div>
      <Card className="font-mono text-sm">
        <CodeBlock text={data.sql} language="sql" showLineNumbers={false} />
      </Card>
      <DataGrid columns={columns} rows={rows} className="rdg-light" />
    </div>
  );
}
