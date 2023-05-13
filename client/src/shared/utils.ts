import { useState } from "react";

export const setFirsLetterUpperCase = (word: string) => {
 return word.charAt(0).toUpperCase() + word.slice(1);
};

export const formatCamelCaseWord = (word: string) => {
 const splitWord = word
  .split(/(?=[A-Z])/g)
  .map((word) => word.toLowerCase())
  .join(" ");

 return setFirsLetterUpperCase(splitWord);
};

export const trimText = (text: string, length: number) =>
 text.substring(0, length);

export const useHandleModal = () => {
 const [open, setOpen] = useState(false);

 const handleClose = () => setOpen(false);
 const handleOpen = () => setOpen(true);

 return { open, handleClose, handleOpen };
};

export const useHandleBtnId = () => {
 const [selectedBtnId, setSelectedBtnId] = useState("");

 const handleSelectedBtnId = (id: string) => setSelectedBtnId(id);

 return { selectedBtnId, handleSelectedBtnId };
};
