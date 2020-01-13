import { Typography } from "@material-ui/core";
import { CloudDownload } from "@material-ui/icons";
import React from "react";
import { Exercise } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { Button, Card, DialogContent } from "../../ui";

export const ExportExerciseDialog = createDialog<{
  exercise: Exercise;
}>(
  React.memo(({ exercise, onClose }) => {
    const { title, tags, questions } = exercise;

    const onExport = () => {
      const source: Partial<Exercise> = {
        title,
        tags,
        questions
      };
      const blob = new Blob([JSON.stringify(source, null, 2)], { type: "application/json" });

      const link = document.createElement("a");
      link.download = `${title || "無題"}.json`;
      link.href = URL.createObjectURL(blob);
      link.click();

      onClose();
    };

    return (
      <DialogContent title="問題集のエクスポート" onClose={onClose}>
        <Card>
          <Typography>問題集をファイルに保存します。</Typography>
        </Card>
        <Button icon={<CloudDownload />} label="問題集をエクスポート" onClick={onExport} />
      </DialogContent>
    );
  })
);
