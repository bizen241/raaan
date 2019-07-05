import {
  Box,
  Button,
  Chip,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography
} from "@material-ui/core";
import { Add, Delete, ExpandMore, Label } from "@material-ui/icons";
import * as React from "react";
import { useStyles } from "../../ui/styles";

export const TagEditor = React.memo(() => {
  const classes = useStyles();

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        <Box display="flex" flexDirection="column">
          <Box display="flex" pb={2}>
            <Box pr={3}>
              <Label />
            </Box>
            <Typography>タグ</Typography>
          </Box>
          <Box display="flex">
            <Box pr={1}>
              <Chip label="javascript" />
            </Box>
            <Box pr={1}>
              <Chip label="react" />
            </Box>
          </Box>
        </Box>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Box display="flex" flexDirection="column" flex={1}>
          <Box pb={1}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell padding="none">
                    <Box display="flex" flexDirection="column" py={1}>
                      <TextField variant="outlined" defaultValue={""} onChange={() => ({})} />
                    </Box>
                  </TableCell>
                  <TableCell padding="checkbox">
                    <IconButton>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell padding="none">
                    <Box display="flex" flexDirection="column" py={1}>
                      <TextField variant="outlined" defaultValue={""} onChange={() => ({})} />
                    </Box>
                  </TableCell>
                  <TableCell padding="checkbox">
                    <IconButton>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
          <Box display="flex" flexDirection="column" flex={1} pb={1}>
            <Button className={classes.largeButton} variant="contained">
              <Add className={classes.leftIcon} />
              タグを追加
            </Button>
          </Box>
        </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
});
