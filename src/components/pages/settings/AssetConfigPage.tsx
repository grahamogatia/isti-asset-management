import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import type { Settings } from "@/data/types";
import { useSettings, useUpdateSetting } from "@/hooks/useSettings";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

function AssetConfigPage() {
  const { data: settings } = useSettings();
  const { mutate } = useUpdateSetting();
  const queryClient = useQueryClient();

  console.log(settings)

  const depreciationSetting = settings?.find(
    (s) => s.settings_key === "depreciation"
  );
  const maxImagesSetting = settings?.find(
    (s) => s.settings_key === "max_images_per_item"
  );

  const [toSaveDep, setToSaveDep] = useState<Settings>();
  const [toSaveMaxImgs, setToSaveMaxImgs] = useState<Settings>();

  const onSubmit = (settings: Settings[]) => {
    settings.forEach((s) => {
      const payload = { id: s.id as number, data: s };
      console.log(payload)
      const settingsKey = s.settings_key;
      mutate(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["settings"] });
          toast.success(`Setting ${settingsKey} updated`)
        },
        onError: () => {
          toast.error(`Failed to update setting ${settingsKey}`)
        }
      })
    })
  };

  const isDirty = Boolean(toSaveDep || toSaveMaxImgs);

  const handleSaveClick = () => {
    const payload: Settings[] = [];
    if (toSaveDep) payload.push(toSaveDep);
    if (toSaveMaxImgs) payload.push(toSaveMaxImgs);
    console.log(payload)
    onSubmit(payload);
    // clear dirty state (UI)
    setToSaveDep(undefined);
    setToSaveMaxImgs(undefined);
  };

  return (
    <div className="flex w-full max-w flex-col gap-6 pb-4">
      <h1 className="font-semibold tracking-tight text-zinc-950">
        Configurations
      </h1>

      <Card>
        <CardHeader>
          <div className="w-full flex items-start justify-between gap-4">
            <div>
              <CardTitle>Asset Configuration</CardTitle>
              <CardDescription>
                Manage depreciation, image limits, and allowed file types for
                assets.
              </CardDescription>
            </div>

            {isDirty ? (
              <div>
                <Button variant="default" onClick={handleSaveClick}>
                  Save
                </Button>
              </div>
            ) : null}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex w-full max-w flex-col gap-6">
            <Item variant="outline">
              <ItemContent>
                <ItemTitle>Depreciation Value (Months)</ItemTitle>
                <ItemDescription className="text-xs">
                  Set how many months assets are depreciated for accounting and
                  reporting.
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Input
                  type="number"
                  min={1}
                  max={1000}
                  step={1}
                  className="w-24"
                  defaultValue={depreciationSetting?.value}
                  onChange={(e) =>
                    setToSaveDep({
                      id: depreciationSetting?.id,
                      settings_key: "depreciation",
                      value: e.currentTarget.value,
                    } as unknown as Settings)
                  }
                />
              </ItemActions>
            </Item>

            <Item variant="outline">
              <ItemContent>
                <ItemTitle>Max Images per Asset</ItemTitle>
                <ItemDescription className="text-xs">
                  Set the maximum number of images that can be uploaded for each
                  asset.
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Input
                  type="number"
                  min={1}
                  max={12}
                  step={1}
                  className="w-24"
                  defaultValue={maxImagesSetting?.value}
                  onChange={(e) =>
                    setToSaveMaxImgs({
                      id: maxImagesSetting?.id,
                      settings_key: "max_images_per_item",
                      value: e.currentTarget.value,
                    } as unknown as Settings)
                  }
                />
              </ItemActions>
            </Item>

            <Item variant="outline" className="opacity-50 pointer-events-none">
              <ItemContent>
                <ItemTitle>Available File Types</ItemTitle>
                <ItemDescription className="text-xs">
                  List the allowed file types for asset uploads (e.g., jpg, png,
                  pdf).
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Input
                  type="number"
                  min={1}
                  max={120}
                  step={1}
                  className="w-24"
                />
              </ItemActions>
            </Item>
          </div>
        </CardContent>
      </Card>

      <Card className="opacity-50 pointer-events-none">
        <CardHeader>
          <CardTitle>Repair Configuration</CardTitle>
          <CardDescription>
            Repair settings (to be implemented).
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="opacity-50 pointer-events-none">
        <CardHeader>
          <CardTitle>Borrow Configuration</CardTitle>
          <CardDescription>
            Borrow settings (to be implemented).
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="opacity-50 pointer-events-none">
        <CardHeader>
          <CardTitle>Issuance Configuration</CardTitle>
          <CardDescription>
            Issuance settings (to be implemented).
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

export default AssetConfigPage;
