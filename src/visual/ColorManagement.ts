export function getColorForChild(color : Colors) {
    return (color + 1) % 2;
}

export function getColorValue(color: Colors) {
    switch (color) {
        case Colors.Beige:
            return "beige";
        case Colors.White:
            return "white";
        case Colors.LightGrey:
            return "lightgrey";
        case Colors.LightBlue:
            return "lightblue";
        case Colors.LightGreen:
            return "lightgreen";
        case Colors.Black:
            return "black";
        case Colors.Grey:
            return "grey";
        case Colors.DarkGrey:
            return "#3A3A3A";
        case Colors.LightBlueCool:
            return "#D9F2FF";
        case Colors.LightBlueGreen:
            return "#C1FFE8";
        case Colors.LightLightBlue:
            return "#EDFCFB";
        case Colors.LightLightOrange:
            return "#FFF8EF";
        case Colors.LightLightGreen:
            return "#F4FFF0";
        case Colors.LightLightGrey:
            return "#EAEAEA";
        case Colors.LightLightLightLightGrey:
            return "#f5f5f5";
        case Colors.LightLightLightGrey:
            return "#efefef";
    }
}

export enum Colors {
    LightLightLightGrey,
    White,
    LightLightGrey,
    LightLightLightLightGrey,
    LightGrey,
    Beige,
    LightLightOrange,
    LightBlueCool,
    LightLightBlue,
    LightLightGreen,
    LightBlueGreen,
    LightBlue,
    LightGreen,
    Black,
    Grey,
    DarkGrey,
}