import {styled} from "@material-ui/core/styles";

export const DetailContainer = styled('div')({
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center"
});

export const DetailValue = styled('span')({
    maxWidth: "55%",
    minWidth: "55%",
    margin: 5
});

export const DetailKey = styled('span')({
    minWidth: "35%",
    maxWidth: "35%",
    margin: 5
});
