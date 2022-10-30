import { ItemStackProps } from "../components/common/ItemStack/ItemStack";
import { CustomColors } from "../styles/colors";

export const itemStackData = {
  onPress: () => console.log("itemStack"),
  itemName: "Test",
  iconName: "home",
  selected: false,
  badgeMsg: "4",
  badgeVariant: "subtle",
  badgeColorScheme: "danger",
  background: CustomColors.blackTransparent,
  textColor: CustomColors.white,
} as ItemStackProps;

export const itemStackListData = [
  {
    onPress: (it, ix) => console.log("Test1", it, ix),
    itemName: "Test me 1",
    iconName: "home",
    selected: true,
    badgeMsg: "normal",
    badgeVariant: "solid",
    badgeColorScheme: "info",
    background: CustomColors.blackTransparent,
    textColor: CustomColors.white,
  },
  {
    onPress: (it, ix) => console.log("Test2", it, ix),
    itemName: "Test me 2",
    iconName: "user",
    selected: true,
    badgeMsg: "",
    badgeVariant: "outline",
    badgeColorScheme: "danger",
    background: CustomColors.blackTransparent,
    textColor: CustomColors.white,
  },
  {
    onPress: (it) => console.log("itemStack", it),
    itemName: "Test me 3",
    iconName: "book",
    selected: true,
    badgeMsg: "4",
    badgeVariant: "subtle",
    badgeColorScheme: "danger",
    background: CustomColors.blackTransparent,
    textColor: CustomColors.white,
  },
] as Array<ItemStackProps>;
