import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import type { EmbedField } from "@/types/embed";
import { Button } from "@/components/ui/button";

export const inputClass =
  "min-w-0 rounded-md border border-border bg-background px-3 text-xs text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground";

export interface EmbedFieldsEditorProps {
  fields: EmbedField[];
  onChange: (fields: EmbedField[]) => void;
  maxFields?: number;
  createFieldId?: () => number;
  className?: string;
}

function defaultMoveItem<T>(items: T[], index: number, direction: -1 | 1): T[] {
  const target = index + direction;
  if (target < 0 || target >= items.length) return items;
  const current = items[index];
  const replacement = items[target];
  if (current === undefined || replacement === undefined) return items;
  const copy = [...items];
  copy[index] = replacement;
  copy[target] = current;
  return copy;
}

export function EmbedFieldsEditor({
  fields,
  onChange,
  maxFields = 25,
  createFieldId,
  className = "",
}: EmbedFieldsEditorProps) {
  function moveItem(index: number, direction: -1 | 1) {
    onChange(defaultMoveItem(fields, index, direction));
  }

  function removeField(id: number) {
    onChange(fields.filter((item) => item.id !== id));
  }

  function updateField(id: number, patch: Partial<EmbedField>) {
    onChange(fields.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function addField() {
    if (fields.length >= maxFields) return;
    const nextId = createFieldId
      ? createFieldId()
      : fields.length > 0
        ? Math.max(...fields.map((f) => f.id)) + 1
        : 1;
    onChange([...fields, { id: nextId, name: "New field", value: "Field value", inline: false }]);
  }

  return (
    <div className={`border-t border-border pt-4 ${className}`.trim()}>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center">
        <h3 className="text-xs font-bold">Fields</h3>
        <span className="text-[10px] text-muted-foreground">
          {fields.length} / {maxFields}
        </span>
      </div>
      <div className="mt-3 grid gap-3">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-md border border-border bg-background p-3">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
              <div className="grid min-w-0 gap-2">
                <input
                  aria-label={`Field ${index + 1} name`}
                  value={field.name}
                  onChange={(event) => updateField(field.id, { name: event.target.value })}
                  placeholder="Field name"
                  className={`${inputClass} h-9`}
                />
                <textarea
                  aria-label={`Field ${index + 1} value`}
                  value={field.value}
                  onChange={(event) => updateField(field.id, { value: event.target.value })}
                  placeholder="Field value"
                  rows={2}
                  className={`${inputClass} resize-none p-3`}
                />
              </div>
              <div className="flex shrink-0 items-center">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  aria-label="Move up"
                  title="Move up"
                  disabled={index === 0}
                  onClick={() => moveItem(index, -1)}
                  className="size-8"
                >
                  <ArrowUp />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  aria-label="Move down"
                  title="Move down"
                  disabled={index === fields.length - 1}
                  onClick={() => moveItem(index, 1)}
                  className="size-8"
                >
                  <ArrowDown />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  aria-label="Remove"
                  title="Remove"
                  onClick={() => removeField(field.id)}
                  className="size-8"
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
            <label className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground">
              <input
                type="checkbox"
                checked={field.inline}
                onChange={(event) => updateField(field.id, { inline: event.target.checked })}
              />
              Display inline
            </label>
          </div>
        ))}
      </div>
      <Button
        type="button"
        size="sm"
        variant="outline"
        disabled={fields.length >= maxFields}
        onClick={addField}
        className="mt-3"
      >
        <Plus /> Add field
      </Button>
    </div>
  );
}

export const EmbedFieldListEditor = EmbedFieldsEditor;

export type { EmbedField } from "@/types/embed";
