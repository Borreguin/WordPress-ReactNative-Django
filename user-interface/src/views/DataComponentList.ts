import { ItemStackProps } from "../components/common/ItemStack/ItemStack";
import { CustomColors } from "../styles/colors";
import { SectionProps } from "../components/SideBar/Section/Section";

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

export const sectionListData1 = [
  {
    onPress: (it, ix) => console.log("Test1", it, ix),
    itemName: "Section 1 - Test me 1",
    iconName: "home",
    selected: false,
    badgeMsg: "normal",
    badgeVariant: "solid",
    badgeColorScheme: "info",
    background: CustomColors.blackTransparent,
    textColor: CustomColors.white,
  },
  {
    onPress: (it, ix) => console.log("Test2", it, ix),
    itemName: "Section 1 - Test me 2",
    iconName: "user",
    selected: false,
    badgeMsg: "",
    badgeVariant: "outline",
    badgeColorScheme: "danger",
    background: CustomColors.blackTransparent,
    textColor: CustomColors.white,
  },
  {
    onPress: (it, ix) => console.log("itemStack", it, ix),
    itemName: "Section 1 - Test me 3",
    iconName: "book",
    selected: false,
    badgeMsg: "4",
    badgeVariant: "subtle",
    badgeColorScheme: "danger",
    background: CustomColors.blackTransparent,
    textColor: CustomColors.white,
  },
] as Array<ItemStackProps>;

export const sectionListData2 = [
  {
    onPress: (it, ix) => console.log("Section 2 -Test1", it, ix),
    itemName: "Section 2 - Test1",
    iconName: "star",
    selected: false,
    badgeMsg: "normal",
    badgeVariant: "solid",
    badgeColorScheme: "info",
    background: CustomColors.blackTransparent,
    textColor: CustomColors.white,
  },
  {
    onPress: (it, ix) => console.log("Test2", it, ix),
    itemName: "Section 2 - Test me 2",
    iconName: "user",
    selected: false,
    badgeMsg: "",
    badgeVariant: "outline",
    badgeColorScheme: "danger",
    background: CustomColors.blackTransparent,
    textColor: CustomColors.white,
  },
  {
    onPress: (it, ix) => console.log("itemStack", it, ix),
    itemName: "Section 2 - Test me 3",
    iconName: "book",
    selected: false,
    badgeMsg: "4",
    badgeVariant: "subtle",
    badgeColorScheme: "danger",
    background: CustomColors.blackTransparent,
    textColor: CustomColors.white,
  },
] as Array<ItemStackProps>;

export const sideBarData = [
  { items: sectionListData1 } as SectionProps,
  { items: sectionListData2 } as SectionProps,
] as Array<SectionProps>;
