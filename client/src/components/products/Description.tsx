import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { trimText } from "../../shared/utils";

type Props = {
 description: string;
};

export const Description = ({ description }: Props) => {
 const [showMore, setShowMore] = useState(false);

 const onClickExpandDescription = () => setShowMore(!showMore);

 return (
  <Grid>
   <Typography>
    {showMore ? description : trimText(description ?? "", 420)}
   </Typography>
   <Button
    variant="text"
    disableRipple
    onClick={onClickExpandDescription}
    sx={{
     padding: 0,
     marginY: 2,
     "&:hover": { backgroundColor: "transparent" },
    }}
   >
    {showMore ? "Show less" : "Show more"}
   </Button>
  </Grid>
 );
};
