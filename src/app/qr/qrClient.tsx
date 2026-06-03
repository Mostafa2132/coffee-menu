"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { QRCodeSVG } from "qrcode.react";

export function QrClient() {
  const [table, setTable] = useState("1");

  const url = useMemo(() => {
    const origin =
      typeof window !== "undefined" ? window.location.origin : "";
    const base = `${origin}/menu`;
    const t = table.trim();
    return t ? `${base}?table=${encodeURIComponent(t)}` : base;
  }, [table]);

  return (
    <div className="gap-4 grid md:grid-cols-2 mt-6">
      <Card className="p-6">
        <div className="font-semibold text-sm">Table QR</div>
        <div className="mt-2 text-[color:var(--color-muted)] text-sm">
          This QR points to the menu with a table query param.
        </div>

        <div className="mt-5">
          <div className="font-medium text-sm">Table number</div>
          <Input
            className="mt-2"
            value={table}
            onChange={(e) => setTable(e.target.value)}
            placeholder="e.g. 12"
          />
        </div>

        <div className="mt-4 text-[color:var(--color-muted)] text-xs break-all">
          {url}
        </div>
      </Card>

      <Card className="place-items-center grid p-6">
        <div className="bg-white shadow-sm p-4 border border-[color:var(--color-card-border)] rounded-3xl">
          <QRCodeSVG value={url} size={220} />
        </div>
        <Button
          className="mt-5"
          variant="soft"
          onClick={() => {
            window.open(url, "_blank");
          }}
        >
          Open menu link
        </Button>
      </Card>
    </div>
  );
}

