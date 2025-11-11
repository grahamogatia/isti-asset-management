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
import { useState } from "react";

function AssetConfigPage() {
  const { data: settings } = useSettings();
  const { mutate } = useUpdateSetting();

  const depreciationSetting = settings?.find(
    (s) => s.key === "depreciation"
  )?.value;
  const maxImagesSetting = settings?.find(
    (s) => s.key === "max_images_per_item"
  )?.value;

  const [toSaveDep, setToSaveDep] = useState<Settings>();
  const [toSaveMaxImgs, setToSaveMaxImgs] = useState<Settings>();

  const onSubmit = (settings: Settings[]) => {
    return;
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

            {toSaveDep || toSaveMaxImgs ? (
              <div>
                {/* <Button variant="default" type="submit" onSubmit={onSubmit}>Save</Button> */}
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
                  defaultValue={depreciationSetting}
                  onChange={(e) =>
                    setToSaveDep({
                      key: "depreciation",
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
                  defaultValue={maxImagesSetting}
                  onChange={(e) =>
                    setToSaveMaxImgs({
                      key: "depreciation",
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
