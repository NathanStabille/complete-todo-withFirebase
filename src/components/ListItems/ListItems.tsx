import { DonutLargeOutlined, MoreVert } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { MouseEvent, useEffect, useState } from "react";
import { getItems } from "../../services/List";

export const ListItems = () => {
  const theme = useTheme();

  const [list, setList] = useState([] as any);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const getAllItems = async () => {
      setList(await getItems());
    };

    getAllItems();
  }, []);

  return (
    <Box
      flex={1}
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      {list.map((item: any) => {
        return (
          <Box
            width="50%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            border={`1px solid ${theme.palette.secondary.main}`}
            padding={1}
            m={1}
            borderRadius={10}
          >
            <Box display="flex" justifyContent="center" alignItems="center">
              <Checkbox
                checked={item.done}
                size="small"
                sx={{ color: theme.palette.text.primary, border: "none" }}
              />
              <Typography
                fontSize="1.3rem"
                textTransform="capitalize"
                sx={{ textDecoration: item.done ? "line-through" : "none" }}
              >
                {item.name}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <DonutLargeOutlined fontSize="small" />
              <IconButton
                aria-controls={open ? "basic-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                color="primary"
              >
                <MoreVert />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                variant="menu"
              >
                <MenuItem onClick={handleClose}>Edit</MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
              </Menu>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};